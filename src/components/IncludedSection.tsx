import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UtensilsCrossed, BedDouble, Calendar, Music, ChevronDown, ArrowRight } from "lucide-react";

const items = [
  {
    icon: UtensilsCrossed,
    title: "9 Refeições Inclusas",
    desc: "Alimentação completa de sexta a domingo nas duas modalidades",
    detail: "Inclui almoço, café da tarde e jantar na sexta; café, almoço, café da tarde e jantar no sábado; café e almoço no domingo.",
    href: "#inscricao",
    linkLabel: "Ver passaportes",
  },
  {
    icon: BedDouble,
    title: "Opção com Hospedagem",
    desc: "Alojamento incluso no Ouro VIP ou ingresso sem pernoite",
    detail: "Prédios separados para moços, moças e famílias, e opção de organizar quarto com sua turma sem taxa extra.",
    href: "#acomodacoes",
    linkLabel: "Ver acomodações",
  },
  {
    icon: Calendar,
    title: "Programação Inteira",
    desc: "Acesso total aos 3 cultos, gincanas e momentos de comunhão",
    detail: "Culto de Abertura na sexta, Louvorzão Ranchão, gincanas e culto no sábado, e Culto de Encerramento no domingo.",
    href: "#cronograma",
    linkLabel: "Ver cronograma",
  },
  {
    icon: Music,
    title: "Louvor & Adoração",
    desc: "Louvorzão Ranchão e noites de adoração com músicos consagrados",
    detail: "Momentos intensos de adoração coletiva ao ar livre e no auditório principal com jovens de todo o Brasil.",
    href: "#momentos",
    linkLabel: "Ver fotos reais",
  },
];

const IncludedSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-muted/50">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center md:mb-10"
        >
          <h2 className="mb-3 font-display text-2xl text-foreground md:text-4xl">
            O que está <span className="gradient-text">Incluso</span>
          </h2>
          <p className="mx-auto max-w-xl font-body text-sm text-muted-foreground sm:text-base">
            Tudo planejado para você viver três dias intensos sem preocupações. Toque em um card para ver detalhes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-border bg-card p-5 text-center transition-colors hover:border-primary/40 sm:p-6"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex flex-1 flex-col items-center text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <div className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl gradient-bg text-primary-foreground">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1.5 font-body text-sm font-bold text-foreground sm:text-base">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {item.desc}
                  </p>
                  <span className="mt-3 inline-flex min-h-[32px] items-center gap-1 font-body text-[11px] font-semibold text-primary-ink">
                    <span>{isOpen ? "Menos detalhes" : "Ver detalhes"}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 border-t border-border pt-3 text-left font-body text-xs leading-relaxed text-muted-foreground"
                    >
                      <p>{item.detail}</p>
                      <a
                        href={item.href}
                        className="mt-2 inline-flex min-h-[40px] items-center gap-1 font-semibold text-primary-ink underline underline-offset-4"
                      >
                        <span>{item.linkLabel}</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IncludedSection;
