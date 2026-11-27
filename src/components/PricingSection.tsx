import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Barcode,
  Check,
  CreditCard,
  MessageCircle,
  QrCode,
  Share2,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckoutLink from "@/components/CheckoutLink";
import PassportQuiz from "@/components/PassportQuiz";
import { getQuizMatch, onQuizMatch, type AdultTicketId } from "@/lib/quizBus";
import { trackEvent } from "@/lib/analytics";
import type { TicketSkuId } from "@/lib/analytics/types";
import { WHATSAPP_URLS } from "@/lib/checkout";

type BenefitItem = {
  lead: string;
  rest: string;
};

type MainTicket = {
  id: TicketSkuId;
  badge: string;
  title: string;
  subtitle: string;
  priceInt: string;
  priceCents: string;
  installmentHighlight: string;
  installmentSecondary: string;
  valueAnchor: string;
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
    title: "1º Lote - Ouro VIP",
    subtitle:
      "A experiência completa do EJM 2027, com hospedagem e sem preocupações. Ideal para caravanas e cidades vizinhas.",
    priceInt: "599",
    priceCents: ",99",
    installmentHighlight: "em até 3x de R$ 200,00 sem juros",
    installmentSecondary: "ou até 12x de R$ 56,05 no cartão",
    valueAnchor: "Equivale a R$ 200/dia com cama, 9 refeições e toda a programação.",
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
    microcopy: "Vagas de acomodação limitadas · Site oficial de inscrição · Reembolso garantido em 7 dias",
    featured: true,
  },
  {
    id: "ouro-sem-acomodacao",
    badge: "Ideal para Quem quer aproveitar sem ficar no local",
    title: "1º Lote - Ouro SEM ACOMODAÇÃO",
    subtitle:
      "Viva toda a intensidade do EJM 2027 voltando para casa ou hotel à noite.",
    priceInt: "480",
    priceCents: ",00",
    installmentHighlight: "em até 3x de R$ 160,00 sem juros",
    installmentSecondary: "ou até 12x de R$ 44,84 no cartão",
    valueAnchor: "Economize R$ 119,99 se você já tem onde dormir na região.",
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
    microcopy: "Valor promocional de 1º Lote · Site oficial de inscrição · Devolução garantida em 7 dias",
    featured: false,
  },
];

type ChildPackage = {
  id: TicketSkuId;
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
    note: "Adicionado junto ao ingresso do responsável · Desconto automático pela data de nascimento",
    benefits: [
      "Entrada nos 3 dias do encontro",
      "Todas as 9 refeições inclusas",
      "Alojamento incluso quando vinculado a responsável no Ouro VIP",
      "Prédios exclusivos para famílias",
    ],
  },
  {
    id: "infantil-0-4",
    ageLabel: "De 0 a 4 anos",
    priceInt: "Grátis",
    priceCents: "",
    free: true,
    note: "Adicionado junto ao ingresso do responsável · Desconto integral automático na inscrição",
    benefits: [
      "Entrada nos 3 dias do encontro",
      "Todas as 9 refeições inclusas",
      "Alojamento incluso quando vinculado a responsável no Ouro VIP",
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
  { icon: CreditCard, label: "Cartão em até 3x sem juros" },
];

const PricingSection = () => {
  const [quizMatch, setQuizMatch] = useState<AdultTicketId | null>(() => getQuizMatch());

  useEffect(() => onQuizMatch(setQuizMatch), []);

  return (
    <section id="inscricao" className="section-padding scroll-mt-20 bg-background">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-primary-ink">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            1º Lote Aberto · Passaporte EJM 2027
          </span>
          <h2 className="mb-4 font-display text-2xl text-foreground md:text-4xl">
            Garanta sua <span className="gradient-text">Inscrição</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground sm:text-base">
            Escolha a modalidade ideal para você e aproveite o valor promocional de 1º Lote com parcelamento em até 3x sem juros.
          </p>
        </motion.div>

        <PassportQuiz />

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
                        : "inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-primary-ink"
                    }
                  >
                    {ticket.featured && <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                    <span>{ticket.badge}</span>
                  </span>
                  {quizMatch === ticket.id && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-graphite px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-orange-300">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      Indicado para você
                    </span>
                  )}
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
                  <p className="mt-2.5 font-body text-xs font-semibold text-primary-ink sm:text-sm">
                    {ticket.installmentHighlight}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-muted-foreground">
                    {ticket.installmentSecondary}
                  </p>
                  <p className="mt-2 border-t border-border/70 pt-2 font-body text-[11px] text-muted-foreground">
                    {ticket.valueAnchor}
                  </p>
                </div>

                <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Benefits list */}
                <ul className="mb-6 flex-grow space-y-3.5 text-left font-body text-sm text-muted-foreground">
                  {ticket.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary-ink" strokeWidth={3} aria-hidden="true" />
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
                  <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-3 text-left font-body text-xs sm:text-sm">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                    <span className="leading-snug text-foreground/90">
                      <strong className="font-semibold text-foreground">{ticket.warning.lead}</strong>
                      {ticket.warning.rest}
                    </span>
                  </div>
                )}

                {/* CTA button */}
                <div className="mt-auto">
                  <CheckoutLink
                    source="pricing_card"
                    ticketId={ticket.id}
                    className={
                      ticket.featured
                        ? "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full gradient-bg px-5 py-3.5 text-center font-body text-sm font-bold text-primary-foreground transition-opacity duration-200 hover:opacity-95 active:scale-[0.98]"
                        : "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-5 py-3.5 text-center font-body text-sm font-bold text-primary-ink transition-colors duration-200 hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
                    }
                  >
                    <span>{ticket.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </CheckoutLink>
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
          <Accordion
            type="single"
            collapsible
            onValueChange={(value) => {
              if (value === "refeicoes") {
                trackEvent("accordion_toggle", {
                  scope: "pricing_meals",
                  item_id: "refeicoes",
                  label: "O que está incluso na alimentação (9 refeições)?",
                  open: true,
                });
              }
            }}
          >
            <AccordionItem
              value="refeicoes"
              className="rounded-2xl border border-border bg-muted/50 px-5 transition-colors data-[state=open]:border-primary/35 sm:px-6"
            >
              <AccordionTrigger className="py-4 text-left font-body text-sm font-semibold text-foreground hover:text-primary-ink hover:no-underline sm:text-base">
                <span className="flex items-center gap-3 pr-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-ink">
                    <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
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
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary-ink">
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

        {/* Children discounts (equal neutral visual weight per AGENTS.md) */}
        <motion.div
          id="desconto-infantil"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 scroll-mt-24 md:mt-12"
        >
          <div className="mb-6 text-center">
            <h3 className="mb-1.5 font-display text-base text-foreground sm:text-lg">
              Descontos Automáticos para <span className="text-primary-ink">Crianças</span>
            </h3>
            <p className="mx-auto max-w-2xl font-body text-xs text-muted-foreground sm:text-sm">
              Não precisa comprar separado nem usar cupom: tudo é feito na{" "}
              <strong className="font-semibold text-foreground">mesma página de inscrição dos ingressos</strong>.
              Ao informar a data de nascimento da criança, o desconto entra automaticamente no ingresso.
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
                    <span className="mb-1.5 inline-block rounded-full border border-primary/25 bg-primary/5 px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-primary-ink">
                      Desconto automático
                    </span>
                    <h4 className="font-display text-sm text-foreground sm:text-base">
                      {pkg.ageLabel}
                    </h4>
                  </div>

                  <div className="text-right">
                    {pkg.free ? (
                      <span className="font-display text-2xl leading-none text-primary-ink sm:text-3xl">
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
                    <span className="mt-1 block font-body text-[11px] font-semibold uppercase tracking-wide text-primary-ink">
                      1º Lote
                    </span>
                  </div>
                </div>

                <p className="mb-4 font-body text-xs text-muted-foreground">{pkg.note}</p>

                <ul className="flex-grow space-y-2 font-body text-xs text-muted-foreground sm:text-sm">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-2.5 w-2.5 text-primary-ink" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <CheckoutLink
              source="pricing_child"
              ticketId="geral"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-6 py-2.5 font-body text-xs font-bold text-primary-ink transition-colors hover:bg-primary hover:text-primary-foreground sm:text-sm"
            >
              <span>Fazer inscrição na mesma página dos ingressos</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </CheckoutLink>
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
                <p.icon className="h-4 w-4 text-primary-ink" aria-hidden="true" />
                {p.label}
              </span>
            ))}
          </div>
          <p className="font-body text-xs text-muted-foreground sm:text-sm">
            Pagamento seguro no checkout oficial Eisme.
          </p>
        </motion.div>

        {/* Caravans / Support & Share with Parents footer strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-center"
        >
          <p className="mb-4 font-body text-sm text-muted-foreground">
            Vai trazer uma caravana ou ficou com alguma dúvida sobre os ingressos? Fale com a nossa equipe no WhatsApp.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URLS.caravans}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { channel: "caravans" })}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-body text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary-ink sm:w-auto"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <MessageCircle className="h-4 w-4 text-primary-ink" aria-hidden="true" />
              Falar no WhatsApp
            </a>

            <a
              href={WHATSAPP_URLS.parentsShare}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { channel: "share_parents" })}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-border bg-muted/60 px-5 py-2.5 font-body text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary-ink sm:w-auto"
            >
              <Share2 className="h-4 w-4 text-primary-ink" aria-hidden="true" />
              Enviar resumo para meus pais
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

