import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Local fallback generator when API is unavailable
function generateFallbackQuestions(
  bookTitle: string,
  bookAuthor: string,
  chapter: number,
  studentName: string
) {
  return [
    {
      type: "checkpoint",
      title: `Checkpoint — Capítulo ${chapter}`,
      description: `Sobre o capítulo ${chapter} de "${bookTitle}": Qual é o evento mais significativo que acontece neste capítulo?`,
      options: [
        "a) Uma revelação importante sobre um personagem",
        "b) Um conflito entre personagens principais",
        "c) Uma mudança de cenário significativa",
        "d) Uma decisão crucial do protagonista",
      ],
      correctAnswer: "d",
      xpReward: 30,
      hint: "Pense no momento que mais impactou a história neste capítulo.",
    },
    {
      type: "reflection",
      title: "Reflexão Pessoal",
      description: `${studentName}, se você estivesse no lugar do protagonista de "${bookTitle}" no capítulo ${chapter}, o que você faria diferente? Por quê?`,
      xpReward: 60,
      prompt: "Escreva pelo menos 3 frases explicando seu raciocínio.",
    },
    {
      type: "challenge",
      title: "Desafio Criativo",
      description: `Crie um diálogo alternativo entre dois personagens do capítulo ${chapter} de "${bookTitle}". Imagine como a conversa seria se eles fossem honestos sobre seus sentimentos.`,
      xpReward: 80,
      deliverable: "Um diálogo de pelo menos 6 falas entre os personagens.",
    },
    {
      type: "discussion",
      title: "Roda de Conversa",
      description: `No capítulo ${chapter}, o autor ${bookAuthor || "do livro"} faz escolhas narrativas importantes. Discuta com um colega: vocês concordam com as decisões do protagonista?`,
      xpReward: 50,
      discussionGuide:
        "Pontos para debater: motivações do personagem, consequências das ações, o que vocês fariam.",
    },
  ];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      bookTitle,
      bookAuthor,
      chapter,
      totalChapters,
      studentName,
      studentLevel,
      previousResponses,
    } = body;

    if (!bookTitle || !chapter) {
      return NextResponse.json(
        { error: "bookTitle and chapter are required" },
        { status: 400 }
      );
    }

    // Try Gemini API first
    if (genAI) {
      try {
        // Try multiple model names for compatibility
        const modelNames = [
          "gemini-1.5-flash",
          "gemini-2.0-flash",
          "gemini-pro",
        ];
        let result = null;

        for (const modelName of modelNames) {
          try {
            const model = genAI.getGenerativeModel({ model: modelName });

            const prompt = `Você é um educador especialista em engajamento de leitura para alunos do 6º ao 9º ano (11-15 anos) em escolas particulares brasileiras.

CONTEXTO DO ALUNO:
- Nome: ${studentName || "Aluno"}
- Nível de leitura: ${studentLevel || "intermediário"}
- Livro: "${bookTitle}" de ${bookAuthor || "autor desconhecido"}
- Capítulo atual: ${chapter} de ${totalChapters || "?"}
${previousResponses ? `- Respostas anteriores do aluno: ${previousResponses}` : ""}

TAREFA:
Gere exatamente 4 questões/missões PERSONALIZADAS para o capítulo ${chapter} do livro "${bookTitle}".

REGRAS:
1. Cada questão deve ser de um tipo diferente:
   - "checkpoint": Quiz rápido de compreensão (1 pergunta objetiva com 4 alternativas)
   - "reflection": Reflexão pessoal que conecta o livro com a vida do aluno
   - "challenge": Desafio criativo (escrever, desenhar, criar algo)
   - "discussion": Pergunta para debate em dupla ou grupo

2. As questões devem ser:
   - Específicas para O CONTEÚDO REAL deste capítulo
   - Adaptadas ao nível do aluno
   - Engajantes e instigantes (não genéricas)
   - Em linguagem acessível para adolescentes
   - Se possível, personalizadas com base nas respostas anteriores

3. Para o checkpoint, inclua as 4 alternativas (a, b, c, d) e indique a correta.

4. Cada missão deve ter XP proporcional à dificuldade (30-120 XP).

FORMATO JSON (responda APENAS com o JSON, sem markdown):
[
  {
    "type": "checkpoint",
    "title": "título curto e chamativo",
    "description": "a pergunta completa",
    "options": ["a) ...", "b) ...", "c) ...", "d) ..."],
    "correctAnswer": "a",
    "xpReward": 30,
    "hint": "dica curta se o aluno errar"
  },
  {
    "type": "reflection",
    "title": "título curto e chamativo",
    "description": "a pergunta de reflexão",
    "xpReward": 60,
    "prompt": "instrução adicional para guiar a resposta"
  },
  {
    "type": "challenge",
    "title": "título curto e chamativo",
    "description": "o desafio criativo completo",
    "xpReward": 80,
    "deliverable": "o que o aluno precisa entregar"
  },
  {
    "type": "discussion",
    "title": "título curto e chamativo",
    "description": "a pergunta para debate",
    "xpReward": 50,
    "discussionGuide": "pontos para guiar a discussão"
  }
]`;

            result = await model.generateContent(prompt);
            break; // Success, exit loop
          } catch {
            continue; // Try next model
          }
        }

        if (result) {
          const text = result.response.text();
          const jsonStr = text
            .replace(/```json\n?/g, "")
            .replace(/```\n?/g, "")
            .trim();
          const questions = JSON.parse(jsonStr);

          return NextResponse.json({
            questions,
            bookTitle,
            chapter,
            generatedAt: new Date().toISOString(),
            studentName: studentName || "Aluno",
            source: "ai",
          });
        }
      } catch {
        // Fall through to fallback
      }
    }

    // Fallback: generate questions locally
    const questions = generateFallbackQuestions(
      bookTitle,
      bookAuthor || "",
      chapter,
      studentName || "Aluno"
    );

    return NextResponse.json({
      questions,
      bookTitle,
      chapter,
      generatedAt: new Date().toISOString(),
      studentName: studentName || "Aluno",
      source: "fallback",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Question generation error:", message);

    return NextResponse.json(
      { error: "Failed to generate questions", details: message },
      { status: 500 }
    );
  }
}
