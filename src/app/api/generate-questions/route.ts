import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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
      language = "pt-BR",
    } = body;

    if (!bookTitle || !chapter) {
      return NextResponse.json({ error: "bookTitle and chapter are required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse JSON from response (strip markdown if present)
    const jsonStr = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const questions = JSON.parse(jsonStr);

    return NextResponse.json({
      questions,
      bookTitle,
      chapter,
      generatedAt: new Date().toISOString(),
      studentName: studentName || "Aluno",
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate questions", details: error.message },
      { status: 500 }
    );
  }
}
