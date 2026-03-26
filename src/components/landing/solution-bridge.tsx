"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { Lightbulb, BookOpen, Smartphone, ArrowDown } from "lucide-react";

// NÍVEL 3: CONSCIENTE DA SOLUÇÃO
// O visitante sabe que tem um problema. Agora apresentamos o CONCEITO da solução
// sem ainda revelar o produto. A ideia: um companheiro digital para livros físicos.

export function SolutionBridge() {
  const { locale } = useLocale();
  const pt = locale === "pt";

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-warm/6 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-medium text-warm uppercase tracking-wider mb-4">
            {pt ? "A virada" : "The turning point"}
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {pt ? (
              <>
                E se o livro físico tivesse um{" "}
                <span className="text-gradient">companheiro digital</span>?
              </>
            ) : (
              <>
                What if the physical book had a{" "}
                <span className="text-gradient">digital companion</span>?
              </>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {pt
              ? "Não é trocar o livro por uma tela. É dar ao livro algo que ele nunca teve: a capacidade de ouvir, responder e se adaptar a cada aluno."
              : "It's not replacing the book with a screen. It's giving the book something it never had: the ability to listen, respond, and adapt to each student."}
          </p>
        </motion.div>

        {/* Visual concept: Physical + Digital = Magic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/8 flex items-center justify-center mb-4">
              <BookOpen className="w-10 h-10 text-primary/70" />
            </div>
            <h3 className="text-base font-semibold mb-2">
              {pt ? "O livro físico" : "The physical book"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {pt
                ? "A experiência insubstituível de ler, folhear, sublinhar."
                : "The irreplaceable experience of reading, flipping pages, underlining."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-warm to-gold flex items-center justify-center mb-4 shadow-lg shadow-warm/20">
              <span className="text-2xl font-bold text-white">+</span>
            </div>
            <h3 className="text-base font-semibold mb-2 text-warm">
              {pt ? "Camada inteligente" : "Intelligent layer"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {pt
                ? "IA que entende onde cada aluno está e cria desafios sob medida."
                : "AI that understands where each student is and creates tailored challenges."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-success/8 flex items-center justify-center mb-4">
              <Lightbulb className="w-10 h-10 text-success/70" />
            </div>
            <h3 className="text-base font-semibold mb-2">
              {pt ? "Leitura com propósito" : "Reading with purpose"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {pt
                ? "Alunos que leem por vontade. Professores que enxergam tudo. Famílias conectadas."
                : "Students who read by choice. Teachers who see everything. Connected families."}
            </p>
          </motion.div>
        </div>

        {/* Transition statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-base text-muted-foreground mb-4">
            {pt
              ? "Isso não é ficção. Já existe — e foi feito para a realidade brasileira."
              : "This isn't fiction. It already exists — and it was made for the Brazilian reality."}
          </p>
          <a
            href="#features"
            className="group inline-flex items-center gap-2 text-sm font-medium text-warm hover:text-foreground transition-colors"
          >
            {pt ? "Conheça o BeReading" : "Meet BeReading"}
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
