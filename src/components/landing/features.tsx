"use client";

import { motion } from "framer-motion";
import { BookOpen, Target, Trophy, BarChart3, Heart, Zap, Sparkles, Brain } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

// NÍVEL 4: CONSCIENTE DO PRODUTO
// O visitante já sabe que existe uma solução. Agora revelamos O BeReading.
// Cada feature é posicionada como "a resposta" para uma dor específica do Nível 2.

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Features() {
  const { locale } = useLocale();
  const pt = locale === "pt";

  const features = [
    {
      icon: Brain,
      title: pt ? "Missões por IA Personalizada" : "AI-Personalized Missions",
      description: pt
        ? "Cada aluno recebe desafios únicos gerados por IA com base no capítulo que está lendo, seu nível e suas respostas anteriores. Nunca mais fichas genéricas."
        : "Each student gets unique AI-generated challenges based on the chapter they're reading, their level, and past responses. No more generic worksheets.",
      color: "bg-warm/10 text-warm",
      pain: pt ? "Resolve: aluno que lê por obrigação" : "Solves: student reading out of obligation",
    },
    {
      icon: Trophy,
      title: pt ? "Gamificação que Engaja" : "Gamification that Engages",
      description: pt
        ? "XP, streaks, níveis e badges transformam a leitura em uma jornada. O aluno quer voltar. Não precisa cobrar."
        : "XP, streaks, levels, and badges turn reading into a journey. The student wants to come back. No nagging needed.",
      color: "bg-gold/10 text-gold-foreground",
      pain: pt ? "Resolve: falta de motivação" : "Solves: lack of motivation",
    },
    {
      icon: BarChart3,
      title: pt ? "Dashboard do Professor em Tempo Real" : "Real-Time Teacher Dashboard",
      description: pt
        ? "Veja quem leu, quem está atrasado, quem precisa de atenção. Insights de IA apontam exatamente onde intervir. Acabou a correção manual."
        : "See who read, who's behind, who needs attention. AI insights pinpoint exactly where to intervene. No more manual grading.",
      color: "bg-success/10 text-success",
      pain: pt ? "Resolve: 4h/semana de correção" : "Solves: 4h/week of grading",
    },
    {
      icon: Heart,
      title: pt ? "Portal da Família" : "Family Portal",
      description: pt
        ? "Pais acompanham o progresso em tempo real. Sabem o que o filho está lendo, como está indo, e quando celebrar."
        : "Parents track progress in real time. Know what their child is reading, how they're doing, and when to celebrate.",
      color: "bg-destructive/10 text-destructive",
      pain: pt ? "Resolve: família sem visibilidade" : "Solves: family without visibility",
    },
    {
      icon: BookOpen,
      title: pt ? "O Livro Físico Continua Protagonista" : "The Physical Book Stays Center Stage",
      description: pt
        ? "O BeReading não substitui o livro — amplifica. O aluno lê o livro real e interage digitalmente depois. Sem telas durante a leitura."
        : "BeReading doesn't replace the book — it amplifies it. The student reads the real book and interacts digitally after. No screens during reading.",
      color: "bg-primary/10 text-primary",
      pain: pt ? "Resolve: medo de telas demais" : "Solves: fear of too much screen time",
    },
    {
      icon: Zap,
      title: pt ? "Implementação em 1 Semana" : "1-Week Implementation",
      description: pt
        ? "Nada de treinamento longo ou integração complexa. A escola escolhe os livros, cadastra as turmas, e começa. Simples assim."
        : "No lengthy training or complex integration. The school picks the books, registers classes, and starts. That simple.",
      color: "bg-warm/10 text-warm",
      pain: pt ? "Resolve: burocracia de implementação" : "Solves: implementation bureaucracy",
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm/8 border border-warm/15 text-sm mb-6">
            <Sparkles className="w-4 h-4 text-warm" />
            <span className="text-warm font-medium">
              {pt ? "Apresentando o BeReading" : "Introducing BeReading"}
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {pt ? (
              <>
                Cada dor tem uma{" "}
                <span className="text-gradient">resposta construída</span>
              </>
            ) : (
              <>
                Every pain has a{" "}
                <span className="text-gradient">built-in answer</span>
              </>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {pt
              ? "O BeReading não é mais um app de leitura. É a camada inteligente que transforma qualquer programa de leitura escolar em uma experiência que alunos, professores e famílias amam."
              : "BeReading isn't just another reading app. It's the intelligent layer that transforms any school reading program into an experience students, teachers, and families love."}
          </p>
        </motion.div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-14 py-4"
        >
          {[
            { value: pt ? "4 papéis" : "4 roles", label: pt ? "aluno, professor, família, gestão" : "student, teacher, family, admin" },
            { value: pt ? "IA Gemini" : "Gemini AI", label: pt ? "questões personalizadas por aluno" : "personalized questions per student" },
            { value: "100%", label: pt ? "compatível com livro físico" : "compatible with physical books" },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-lg font-bold text-warm">{stat.value}</div>
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group bg-card rounded-2xl border border-border/60 p-7 hover:shadow-lg hover:shadow-primary/5 hover:border-border transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {feature.description}
              </p>
              <span className="inline-block text-[10px] font-medium text-warm/80 bg-warm/6 px-2.5 py-1 rounded-full">
                {feature.pain}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
