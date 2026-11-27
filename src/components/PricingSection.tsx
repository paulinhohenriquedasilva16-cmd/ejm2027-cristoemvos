import * as React from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Barcode,
  Check,
  CreditCard,
  MessageCircle,
  QrCode,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CHECKOUT_URL = "https://eisme.com.br/evento/ejm2027";
const CARAVAN_WHATSAPP_URL = "https://wa.me/5515998162393";

type BenefitItem = {
  lead: string;
  rest: string;
};

type MainTicket = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  priceInt: string;
  priceCents: string;
  installmentHighlight: string;
  installmentSecondary: string;
  benefits: BenefitItem[];
  warning?: {
    lead: string;
    rest: string;
  };
  ctaLabel: string;
  microcopy: string;
  featured: boolean;
};

const mainTickets: MainTicket[] = [
  {
    id: "ouro-vip",
    badge: "Experiência Completa • Vagas Limitadas",
    title: "1º Lote – Ouro VIP",
    subtitle:
      "A experiência completa do EJM 2027, com hospedagem e sem preocupações. Ideal para caravanas e cidades vizinhas.",
    priceInt: "599",
    priceCents: ",99",
    installmentHighlight: "em até 3x de R$ 200,00 sem juros",
    installmentSecondary: "ou até 12x de R$ 56,05 no cartão",
    benefits: [
      {
        lead: "Acomodação completa",
        rest: " no local (sexta a domingo)",
      },
      {
        lead: "Alimentação completa inclusa (9 refeições)",
        rest: " de sexta a domingo",
      },
      {
        lead: "Acesso total aos cultos:",
        rest: " Abertura, Sábado e Encerramento",
      },
      {
        lead: "Programação completa de comunhão:",
        rest: " Louvorzão Ranchão, gincanas e noites de companheirismo e louvor",
      },
    ],
    ctaLabel: "Garantir Ingresso Ouro VIP",
    microcopy: "Vagas de acomodação limitadas neste lote.",
    featured: true,
  },
  {
    id: "ouro-sem-acomodacao",
    badge: "Ideal para Sorocaba e Região",
    title: "1º Lote – Ouro SEM ACOMODAÇÃO",
    subtitle:
      "Viva toda a intensidade do EJM 2027 voltando para casa ou hotel à noite.",
    priceInt: "480",
    priceCents: ",00",
    installmentHighlight: "em até 3x de R$ 160,00 sem juros",
    installmentSecondary: "ou até 12x de R$ 44,84 no cartão",
    benefits: [
      {
        lead: "Alimentação completa inclusa (9 refeições)",
        rest: " de sexta a domingo",
      },
      {
        lead: "Acesso total aos cultos:",
        rest: " Abertura, Sábado e Encerramento",
      },
      {
        lead: "Programação completa de comunhão:",
        rest: " Louvorzão Ranchão, gincanas e noites de companheirismo e louvor",
      },
    ],
    warning: {
      lead: "Não inclui",
      rest: " hospedagem/pernoite no local",
    },
    ctaLabel: "Garantir Ingresso Sem Acomodação",
    microcopy: "Aproveite o valor promocional de 1º Lote.",
    featured: false,
  },
];

type ChildPackage = {
  id: string;
  ageLabel: string;
  priceInt: string;
  priceCents: string;
  free?: boolean;
  note: string;
  benefits: string[];
};

const childPackages: ChildPackage[] = [
  {
    id: "infantil-5-10",
    ageLabel: "De 5 a 10 anos",
    priceInt: "359",
    priceCents: ",99",
    note: "R$ 239,99 de desconto aplicado no checkout",
    benefits: [
      "Entrada nos 3 dias do encontro",
      "Todas as 9 refeições inclusas",
      "Hospedagem em alojamento compartilhado",
      "Prédios exclusivos para famílias",
    ],
  },
  {
    id: "infantil-0-4",
    ageLabel: "De 0 a 4 anos",
    priceInt: "Grátis",
    priceCents: "",
    free: true,
    note: "Desconto integral no checkout • Necessário responsável",
    benefits: [
      "Entrada nos 3 dias do encontro",
      "Todas as 9 refeições inclusas",
      "Hospedagem em alojamento compartilhado",
      "Prédios exclusivos para famílias",
    ],
  },
];

const mealSchedule = [
  {
    day: "Sexta-feira",
    meals: "Almoço de boas-vindas, café da tarde e jantar.",
  },
  {
    day: "Sábado",
    meals: "Café da manhã, almoço, café da tarde e jantar.",
  },
  {
    day: "Domingo",
    meals: "Café da manhã e almoço de despedida.",
  },
];

const payments = [
  { icon: QrCode, label: "Pix" },
  { icon: Barcode, label: "Boleto" },
  { icon: CreditCard, label: "Cartão de Crédito" },
];

const PricingSection = () => {
  return (
    <section id="inscricao" className="section-padding bg-background">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Passaporte EJM 2027
          </span>
          <h2 className="mb-4 font-display text-2xl text-foreground md:text-4xl">
            <span className="gradient-text">Inscrição</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground sm:text-base">
            Escolha a modalidade ideal para você e garanta sua vaga no 1º Lote com o melhor preço!
          </p>
        </motion.div>

        {/* Main 2-tier comparison cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:gap-8">
          {mainTickets.map((ticket, index) => {
            const cardInner = (
              <div
                className={`relative flex h-full flex-col overflow-hidden p-6 sm:p-8 ${
                  ticket.featured
                    ? "rounded-[calc(1.75rem-2px)] bg-card"
                    : "rounded-[1.75rem] border border-border bg-card"
                }`}
                style={ticket.featured ? undefined : { boxShadow: "var(--shadow-card)" }}
              >
                {/* Top badge */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={
                      ticket.featured
                        ? "inline-flex items-center gap-1.5 rounded-full gradient-bg px-3.5 py-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-primary-foreground"
                        : "inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-primary"
                    }
                  >
                    {ticket.featured && <Sparkles className="h-3.5 w-3.5 shrink-0" />}
                    <span>{ticket.badge}</span>
                  </span>
                </div>

                {/* Title & subtitle */}
                <h3 className="mb-2 font-display text-lg leading-snug text-foreground sm:text-xl">
                  {ticket.title}
                </h3>
                <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
                  {ticket.subtitle}
                </p>

                {/* Price & installments */}
                <div className="mb-6 rounded-2xl bg-muted/60 px-4 py-5 text-center">
                  <div className="flex items-start justify-center gap-1">
                    <span className="mt-1.5 font-body text-base font-semibold text-muted-foreground">
                      R$
                    </span>
                    <span className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl">
                      {ticket.priceInt}
                    </span>
                    <span className="mt-1.5 font-body text-lg font-semibold text-muted-foreground">
                      {ticket.priceCents}
                    </span>
                  </div>
                  <p className="mt-2.5 font-body text-xs font-semibold text-primary sm:text-sm">
                    {ticket.installmentHighlight}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-muted-foreground">
                    {ticket.installmentSecondary}
                  </p>
                </div>

                <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Benefits list */}
                <ul className="mb-6 flex-grow space-y-3.5 text-left font-body text-sm text-muted-foreground">
                  {ticket.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                      </span>
                      <span className="leading-snug">
                        <strong className="font-semibold text-foreground">{benefit.lead}</strong>
                        {benefit.rest}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Non-included warning for Sem Acomodação */}
                {ticket.warning && (
                  <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-3 text-left font-body text-xs sm:text-sm">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    <span className="leading-snug text-foreground/85">
                      <strong className="font-semibold text-foreground">{ticket.warning.lead}</strong>
                      {ticket.warning.rest}
                    </span>
                  </div>
                )}

                {/* CTA button */}
                <div className="mt-auto">
                  <a
                    href={CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      ticket.featured
                        ? "inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full gradient-bg px-5 py-3.5 text-center font-body text-sm font-bold text-primary-foreground transition-all duration-300 hover:gap-3 hover:opacity-95"
                        : "inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-5 py-3.5 text-center font-body text-sm font-bold text-primary transition-all duration-300 hover:gap-3 hover:bg-primary hover:text-primary-foreground"
                    }
                  >
                    <span>{ticket.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </a>
                  <p className="mt-3 text-center font-body text-xs italic text-muted-foreground">
                    {ticket.microcopy}
                  </p>
                </div>
              </div>
            );

            return (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`h-full ${ticket.featured ? "md:-translate-y-1.5" : ""}`}
              >
                {ticket.featured ? (
                  <div
                    className="h-full rounded-[1.75rem] gradient-bg p-[2px] transition-transform duration-300 hover:-translate-y-1"
                    style={{ boxShadow: "var(--shadow-warm)" }}
                  >
                    {cardInner}
                  </div>
                ) : (
                  <div className="h-full transition-transform duration-300 hover:-translate-y-1">
                    {cardInner}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Expandable 9-meals schedule accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <Accordion type="single" collapsible>
            <AccordionItem
              value="refeicoes"
              className="rounded-2xl border border-border bg-muted/50 px-5 transition-colors data-[state=open]:border-primary/35 sm:px-6"
            >
              <AccordionTrigger className="py-4 text-left font-body text-sm font-semibold text-foreground hover:text-primary hover:no-underline sm:text-base">
                <span className="flex items-center gap-3 pr-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <UtensilsCrossed className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block">O que está incluso na alimentação (9 refeições)?</span>
                    <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                      Ver o que está incluso nas 9 refeições de sexta a domingo
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pt-1">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {mealSchedule.map((item) => (
                    <div
                      key={item.day}
                      className="rounded-xl border border-border/80 bg-card p-3.5 font-body"
                    >
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                        {item.day}
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {item.meals}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* Children discounts (existing age-based packages, equal neutral weight) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 md:mt-12"
        >
          <div className="mb-6 text-center">
            <h3 className="mb-1.5 font-display text-base text-foreground sm:text-lg">
              Descontos para <span className="gradient-text">Crianças</span>
            </h3>
            <p className="font-body text-xs text-muted-foreground sm:text-sm">
              O desconto é aplicado automaticamente no checkout com base na data de nascimento.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {childPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 sm:p-6"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="mb-1.5 inline-block rounded-full border border-primary/25 bg-primary/5 px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-primary">
                      Infantil
                    </span>
                    <p className="font-display text-sm text-foreground sm:text-base">
                      {pkg.ageLabel}
                    </p>
                  </div>

                  <div className="text-right">
                    {pkg.free ? (
                      <span className="font-display text-2xl leading-none gradient-text sm:text-3xl">
                        {pkg.priceInt}
                      </span>
                    ) : (
                      <div className="flex items-start justify-end gap-0.5">
                        <span className="mt-0.5 font-body text-xs font-semibold text-muted-foreground">
                          R$
                        </span>
                        <span className="font-display text-2xl leading-none text-foreground sm:text-3xl">
                          {pkg.priceInt}
                        </span>
                        <span className="mt-0.5 font-body text-xs font-semibold text-muted-foreground">
                          {pkg.priceCents}
                        </span>
                      </div>
                    )}
                    <span className="mt-1 block font-body text-[11px] font-semibold uppercase tracking-wide text-primary">
                      1º Lote
                    </span>
                  </div>
                </div>

                <p className="mb-4 font-body text-xs text-muted-foreground">{pkg.note}</p>

                <ul className="mb-5 flex-grow space-y-2 font-body text-xs text-muted-foreground sm:text-sm">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-full border border-primary/35 bg-primary/5 px-4 py-2.5 font-body text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:text-sm"
                >
                  Garantir Passaporte Infantil
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-muted/60 px-5 py-4 text-center sm:flex-row sm:text-left"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {payments.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-body text-xs font-medium text-foreground sm:text-sm"
              >
                <p.icon className="h-4 w-4 text-primary" />
                {p.label}
              </span>
            ))}
          </div>
          <p className="font-body text-xs text-muted-foreground sm:text-sm">
            Pagamento seguro direto no checkout oficial.
          </p>
        </motion.div>

        {/* Caravans / Support footer strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-center"
        >
          <p className="mb-3 font-body text-sm text-muted-foreground">
            Vai trazer uma caravana ou ficou com alguma dúvida sobre os ingressos? Fale com a nossa equipe no WhatsApp.
          </p>
          <a
            href={CARAVAN_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-body text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <MessageCircle className="h-4 w-4 text-primary" />
            Falar no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
