import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import CheckoutLink from "@/components/CheckoutLink";
import { trackEvent } from "@/lib/analytics";

type FaqCategory = "tudo" | "ingressos" | "hospedagem" | "familia";

interface FaqEntry {
  category: Exclude<FaqCategory, "tudo">;
  question: string;
  answer: string;
}

const FAQ_FILTERS: { id: FaqCategory; label: string }[] = [
  { id: "tudo", label: "Tudo" },
  { id: "ingressos", label: "Ingressos e Pagamento" },
  { id: "hospedagem", label: "Hospedagem e Refeições" },
  { id: "familia", label: "Caravanas e Família" },
];

const faqs: FaqEntry[] = [
  {
    category: "hospedagem",
    question: "Onde será realizado o evento?",
    answer:
      "O EJM 2027 acontecerá na Estância Árvore da Vida, em Sumaré-SP (Estr. Estância Árvore da Vida, 01, CEP 13176-050), um local preparado com estrutura completa para receber jovens, famílias e caravanas.",
  },
  {
    category: "ingressos",
    question: "Quando acontece o EJM 2027?",
    answer:
      "Nos dias 15, 16 e 17 de janeiro de 2027 (sexta a domingo). Serão 3 dias intensos de cultos, louvor, comunhão e 9 refeições inclusas.",
  },
  {
    category: "ingressos",
    question: "Qual a diferença entre os dois Passaportes do 1º Lote (Ouro VIP e Sem Acomodação)?",
    answer:
      "Você escolhe a opção ideal para sua realidade:\n\n✅ 1º Lote - Ouro VIP (R$ 599,99 ou até 3x de R$ 200,00 sem juros): inclui entrada nos 3 dias, todas as 9 refeições e sua cama nos alojamentos compartilhados (sexta a domingo).\n✅ 1º Lote - Ouro SEM ACOMODAÇÃO (R$ 480,00 ou até 3x de R$ 160,00 sem juros): inclui entrada nos 3 dias e todas as 9 refeições, sem pernoite no local (ideal para quem quer aproveitar todo o encontro sem ficar hospedado na Estância).\n\n⚠️ As vagas nas camas do Ouro VIP são limitadas. Quem garante antes assegura seu alojamento primeiro!",
  },
  {
    category: "familia",
    question: "Crianças pagam ingresso? Preciso pedir cupom?",
    answer:
      "Não precisa comprar separado nem pedir cupom! Tudo é feito na mesma página de inscrição dos ingressos: basta informar a data de nascimento da criança que o desconto entra automaticamente:\n\n👶 De 0 a 4 anos: entrada e alimentação gratuitas (necessário estar vinculada a um responsável pagante).\n👧 De 5 a 10 anos: tarifa infantil de R$ 359,99 no 1º Lote (com as 9 refeições e hospedagem em prédio exclusivo para famílias).\n🧑 A partir de 11 anos: valor integral do passaporte escolhido.",
  },
  {
    category: "hospedagem",
    question: "Como funciona a hospedagem e os quartos privativos?",
    answer:
      "A hospedagem nos alojamentos compartilhados está inclusa no Passaporte Ouro VIP (R$ 599,99), com prédios exclusivos para moços, moças e famílias. O Passaporte Ouro Sem Acomodação (R$ 480,00) não inclui pernoite.\n\nPara casais ou famílias que preferem privacidade total, oferecemos opções de apartamentos e hotel dentro da Estância pagos à parte na hora da inscrição (atenção: o Apartamento Ouro CH.C já está esgotado).",
  },
  {
    category: "hospedagem",
    question: "Posso escolher com quem vou dividir o quarto?",
    answer:
      "Sim! Quer ficar com a sua turma ou família? No momento da inscrição (Passaporte Ouro VIP), vocês podem se organizar para ficar no mesmo quarto do alojamento sem taxa extra.",
  },
  {
    category: "hospedagem",
    question: "A alimentação está inclusa nos dois ingressos?",
    answer:
      "Sim! Todas as 9 refeições do encontro estão inclusas tanto no Ouro VIP quanto no Ouro Sem Acomodação:\n\n• Sexta-feira: almoço de boas-vindas, café da tarde e jantar\n• Sábado: café da manhã, almoço, café da tarde e jantar\n• Domingo: café da manhã e almoço de despedida\n\nVocê não paga nada extra por alimentação.",
  },
  {
    category: "ingressos",
    question: "Quais as formas de pagamento e parcelamento?",
    answer:
      "Direto na página oficial de inscrição (eisme.com.br/evento/ejm2027), você pode pagar com:\n\n💳 Cartão de crédito em até 3x sem juros (R$ 200,00 no Ouro VIP ou R$ 160,00 no Sem Acomodação) ou em até 12x\n💰 Pagamento à vista no Pix\n📄 Boleto bancário",
  },
  {
    category: "ingressos",
    question: "Posso cancelar minha inscrição se houver algum imprevisto?",
    answer:
      "Sim. Seguimos o prazo garantido por lei para compras pela internet: você pode pedir o cancelamento com devolução total do valor em até 7 dias corridos após a compra. Se tiver qualquer dúvida, fale com nossa equipe no WhatsApp.",
  },
  {
    category: "familia",
    question: "Como chego ao local e há apoio para caravanas?",
    answer:
      "A Estância Árvore da Vida fica em Sumaré-SP, com acesso facilitado e estacionamento gratuito no local. Se você está organizando ou procurando uma caravana, chame nosso atendimento de caravanas pelo WhatsApp ((15) 99816-2393).",
  },
  {
    category: "familia",
    question: "Quem pode participar?",
    answer:
      "O EJM é feito para a juventude, mas é um espaço de braços abertos para toda a família! Qualquer pessoa que deseje viver essa experiência espiritual é bem-vinda.",
  },
  {
    category: "familia",
    question: "O que esperar do EJM 2027?",
    answer:
      "Não é apenas um evento, é um divisor de águas. Momentos intensos na presença de Deus, comunhão com jovens de diversas regiões e experiências espirituais marcantes. O EJM é feito de irmãos para irmãos, sem fins lucrativos e com foco exclusivo em se encher do Espírito Santo.",
  },
];

const FAQSection = () => {
  const [category, setCategory] = useState<FaqCategory>("tudo");

  const visibleFaqs = useMemo(
    () => (category === "tudo" ? faqs : faqs.filter((f) => f.category === category)),
    [category]
  );

  return (
    <section id="faq" className="scroll-mt-20 bg-muted/50 section-padding">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-7 text-center md:mb-9"
        >
          <span className="mb-3 block font-body text-xs font-semibold uppercase tracking-[0.28em] text-primary-ink">
            Tire suas dúvidas
          </span>
          <h2 className="mb-3 font-display text-2xl text-foreground md:text-3xl">
            Perguntas Frequentes
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Tudo o que você precisa saber antes de garantir seu passaporte no 1º Lote
          </p>
        </motion.div>

        {/* Quick topic filters */}
        <div role="group" aria-label="Filtrar dúvidas por assunto" className="mb-6 flex flex-wrap justify-center gap-2">
          {FAQ_FILTERS.map((f) => {
            const active = category === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(f.id)}
                className={`relative min-h-[44px] rounded-full border px-4 py-2 font-body text-xs font-semibold transition-colors sm:text-sm ${
                  active
                    ? "border-transparent text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:text-primary-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="faq-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full gradient-bg"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={category}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-3"
            onValueChange={(value) => {
              if (!value) return;
              const item = visibleFaqs.find((f) => f.question === value);
              if (item) {
                trackEvent("accordion_toggle", {
                  scope: "faq",
                  item_id: value,
                  label: item.question,
                  open: true,
                });
              }
            }}
          >
            {visibleFaqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-2xl border border-border bg-card px-4 transition-colors data-[state=open]:border-primary/45 sm:px-6"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <AccordionTrigger className="py-4 text-left font-body text-sm font-semibold text-foreground transition-colors hover:text-primary-ink hover:no-underline md:py-5 md:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-line pb-5 font-body text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-center"
        >
          <CheckoutLink
            source="faq"
            ticketId="geral"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full gradient-bg px-8 py-3.5 font-body text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.02] hover:opacity-95 active:scale-95"
          >
            Garanta sua vaga agora no 1º Lote
          </CheckoutLink>
          <p className="mt-3 font-body text-xs text-muted-foreground">
            Site oficial de inscrição · Até 3x sem juros · Devolução garantida em 7 dias
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
