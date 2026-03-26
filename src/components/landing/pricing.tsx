"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

// NÍVEL 5: MAIS CONSCIENTE
// O visitante já sabe que o BeReading é a solução. Agora removemos TODA objeção.
// Risco zero + urgência + garantia = conversão.

export function Pricing() {
  const { locale } = useLocale();
  const pt = locale === "pt";

  const plans = [
    {
      name: pt ? "Piloto Gratuito" : "Free Pilot",
      price: pt ? "Grátis" : "Free",
      period: "",
      description: pt
        ? "Teste com 1 turma por 30 dias. Sem cartão. Sem compromisso. Cancele quando quiser."
        : "Test with 1 class for 30 days. No card. No commitment. Cancel anytime.",
      features: pt
        ? [
            "1 turma de até 40 alunos",
            "Todas as funcionalidades liberadas",
            "Missões por IA incluídas",
            "Dashboard do professor completo",
            "Portal da família ativo",
            "Suporte por email",
          ]
        : [
            "1 class of up to 40 students",
            "All features unlocked",
            "AI missions included",
            "Full teacher dashboard",
            "Family portal active",
            "Email support",
          ],
      cta: pt ? "Começar Piloto Grátis" : "Start Free Pilot",
      highlighted: false,
    },
    {
      name: pt ? "Escola" : "School",
      price: "R$ 12",
      period: pt ? "/aluno/mês" : "/student/month",
      description: pt
        ? "Para escolas que querem transformar toda a cultura de leitura. O investimento equivale a metade de um livro por ano."
        : "For schools that want to transform their entire reading culture. The investment equals half a book per year.",
      features: pt
        ? [
            "Turmas ilimitadas",
            "Todos os papéis (professor, aluno, família, gestão)",
            "IA Gemini com questões personalizadas",
            "Relatórios de engajamento por turma",
            "Ranking e gamificação completa",
            "Suporte prioritário via WhatsApp",
            "Treinamento de onboarding incluído",
          ]
        : [
            "Unlimited classes",
            "All roles (teacher, student, family, admin)",
            "Gemini AI with personalized questions",
            "Engagement reports per class",
            "Full ranking and gamification",
            "Priority WhatsApp support",
            "Onboarding training included",
          ],
      cta: pt ? "Quero para Minha Escola" : "I Want It for My School",
      highlighted: true,
    },
    {
      name: pt ? "Rede de Escolas" : "School Network",
      price: pt ? "Sob consulta" : "Custom",
      period: "",
      description: pt
        ? "Para redes com 3+ unidades. Preço especial, painel administrativo consolidado e gerente de sucesso dedicado."
        : "For networks with 3+ units. Special pricing, consolidated admin panel, and dedicated success manager.",
      features: pt
        ? [
            "Tudo do plano Escola",
            "Painel consolidado multi-unidade",
            "API para integração com sistemas",
            "Relatórios para mantenedora",
            "Gerente de sucesso dedicado",
            "SLA de suporte 24h",
          ]
        : [
            "Everything from School plan",
            "Multi-unit consolidated panel",
            "API for system integration",
            "Reports for management",
            "Dedicated success manager",
            "24h support SLA",
          ],
      cta: pt ? "Falar com Comercial" : "Talk to Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-medium text-warm uppercase tracking-wider mb-4">
            {pt ? "Investimento" : "Investment"}
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {pt ? (
              <>
                Risco zero.{" "}
                <span className="text-gradient">Resultado desde o dia 1.</span>
              </>
            ) : (
              <>
                Zero risk.{" "}
                <span className="text-gradient">Results from day 1.</span>
              </>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {pt
              ? "Comece de graça. Veja os alunos engajarem. Só pague quando tiver certeza. Sem surpresas, sem contratos longos."
              : "Start for free. Watch students engage. Only pay when you're sure. No surprises, no long contracts."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/20 scale-[1.02]"
                  : "bg-card border-border/60 hover:shadow-lg hover:shadow-primary/5"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warm text-warm-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  {pt ? "Mais escolhido" : "Most popular"}
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span
                    className={`text-sm ${
                      plan.highlighted
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>
              <p
                className={`text-sm mb-6 ${
                  plan.highlighted
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        plan.highlighted ? "text-warm" : "text-success"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                className={`group flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-primary-foreground text-primary hover:opacity-90"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Risk removal guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-3 text-center md:text-left">
            <ShieldCheck className="w-6 h-6 text-success shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-1">
                {pt ? "Garantia de 30 dias" : "30-day guarantee"}
              </h4>
              <p className="text-xs text-muted-foreground">
                {pt
                  ? "Se não ver engajamento dos alunos em 30 dias, devolvemos 100% do valor."
                  : "If you don't see student engagement in 30 days, we refund 100%."}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-center md:text-left">
            <Clock className="w-6 h-6 text-warm shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-1">
                {pt ? "Sem contrato de fidelidade" : "No lock-in contract"}
              </h4>
              <p className="text-xs text-muted-foreground">
                {pt
                  ? "Cancele quando quiser. Mensal, sem multa, sem burocracia."
                  : "Cancel anytime. Monthly, no penalty, no red tape."}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-center md:text-left">
            <Sparkles className="w-6 h-6 text-gold-foreground shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-1">
                {pt ? "Onboarding incluso" : "Onboarding included"}
              </h4>
              <p className="text-xs text-muted-foreground">
                {pt
                  ? "Treinamos sua equipe. Setup completo em menos de uma semana."
                  : "We train your team. Full setup in less than a week."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
