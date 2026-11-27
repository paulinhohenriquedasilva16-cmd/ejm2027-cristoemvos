import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, RotateCcw, Sparkles, Users } from "lucide-react";
import CheckoutLink from "@/components/CheckoutLink";
import ShareCrewButton from "@/components/ShareCrewButton";
import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_URLS } from "@/lib/checkout";
import { publishQuizMatch, type AdultTicketId } from "@/lib/quizBus";

type Stay = "ficar" | "voltar";
type Who = "amigos" | "caravana" | "familia";

const STAY_OPTIONS: { id: Stay; label: string; hint: string }[] = [
  { id: "ficar", label: "Dormir na Estância com a galera", hint: "Cama garantida + 9 refeições" },
  { id: "voltar", label: "Voltar para casa à noite", hint: "Sem pernoite + 9 refeições" },
];

const WHO_OPTIONS: { id: Who; label: string }[] = [
  { id: "amigos", label: "Sozinho ou com amigos" },
  { id: "caravana", label: "Com a caravana da igreja" },
  { id: "familia", label: "Em família, com crianças" },
];

export function recommend(
  stay: Stay,
  who: Who
): {
  ticketId: AdultTicketId;
  title: string;
  price: string;
  installment: string;
  bullets: string[];
  note: string;
} {
  const isVip = stay === "ficar";
  const ticketId: AdultTicketId = isVip ? "ouro-vip" : "ouro-sem-acomodacao";
  const title = isVip ? "1º Lote Ouro VIP" : "1º Lote Ouro SEM ACOMODAÇÃO";
  const price = isVip ? "R$ 599,99" : "R$ 480,00";
  const installment = isVip ? "3x de R$ 200,00 sem juros" : "3x de R$ 160,00 sem juros";
  const bullets = isVip
    ? ["Cama nos alojamentos (sexta a domingo)", "Todas as 9 refeições + 100% dos cultos"]
    : ["Todas as 9 refeições inclusas", "100% dos cultos, Louvorzão/Ranchão e gincanas"];
  const notes: Record<Who, string> = {
    amigos: "Chame a galera para garantir junto e viver tudo lado a lado.",
    caravana: "Fale com nossa equipe de caravanas no WhatsApp para alinhar a chegada.",
    familia: "Confira abaixo os valores infantis (0 a 4 anos grátis e 5 a 10 anos com desconto).",
  };
  return { ticketId, title, price, installment, bullets, note: notes[who] };
}

const optionClass = (selected: boolean) =>
  `min-h-[52px] w-full rounded-2xl border px-4 py-3 text-left font-body text-sm font-semibold transition-colors active:scale-[0.98] ${
    selected
      ? "border-primary bg-primary/10 text-primary-ink"
      : "border-border bg-card text-foreground hover:border-primary/50"
  }`;

const PassportQuiz = () => {
  const [stay, setStay] = useState<Stay | null>(null);
  const [who, setWho] = useState<Who | null>(null);

  const result = stay && who ? recommend(stay, who) : null;
  const progress = result ? 100 : stay ? 50 : 15;

  const pickStay = (s: Stay) => {
    setStay(s);
    if (who) {
      const r = recommend(s, who);
      publishQuizMatch(r.ticketId);
      trackEvent("quiz_complete", { stay: s, who, recommended: r.ticketId });
    }
  };

  const pickWho = (w: Who) => {
    setWho(w);
    if (stay) {
      const r = recommend(stay, w);
      publishQuizMatch(r.ticketId);
      trackEvent("quiz_complete", { stay, who: w, recommended: r.ticketId });
    }
  };

  const reset = () => {
    setStay(null);
    setWho(null);
    publishQuizMatch(null);
  };

  return (
    <div
      id="quiz"
      className="mx-auto mb-10 max-w-3xl scroll-mt-24 rounded-3xl border border-primary/20 bg-primary/5 p-5 sm:p-7"
      aria-labelledby="quiz-title"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 id="quiz-title" className="flex items-center gap-2 font-display text-base text-foreground sm:text-lg">
          <Sparkles className="h-5 w-5 shrink-0 text-primary-ink" aria-hidden="true" />
          Qual passaporte é o seu?
        </h3>
        <span className="shrink-0 font-body text-xs font-bold uppercase tracking-wider text-primary-ink">
          {result ? "Resultado pronto" : stay ? "Pergunta 2 de 2" : "Pergunta 1 de 2"}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-primary/15" aria-hidden="true">
        <motion.div
          className="h-full origin-left rounded-full gradient-bg"
          initial={false}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <fieldset className="mb-4">
        <legend className="mb-2 font-body text-sm font-bold text-foreground">
          1. Como você prefere viver o EJM?
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {STAY_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={stay === o.id}
              onClick={() => pickStay(o.id)}
              className={optionClass(stay === o.id)}
            >
              <span className="block">{o.label}</span>
              <span className="mt-0.5 block text-xs font-normal text-muted-foreground">{o.hint}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <AnimatePresence initial={false}>
        {stay && (
          <motion.fieldset
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mb-2"
          >
            <legend className="mb-2 font-body text-sm font-bold text-foreground">
              2. Com quem você vai?
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {WHO_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={who === o.id}
                  onClick={() => pickWho(o.id)}
                  className={optionClass(who === o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </motion.fieldset>
        )}
      </AnimatePresence>

      <div aria-live="polite">
        <AnimatePresence>
          {result && (
            <motion.div
              key={`${stay}-${who}`}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="mt-5 rounded-2xl border border-primary/25 bg-card p-5 text-center shadow-sm"
            >
              <p className="font-body text-xs font-bold uppercase tracking-wider text-primary-ink">
                Indicado para você
              </p>
              <p className="mt-1 font-display text-lg text-foreground sm:text-xl">{result.title}</p>
              <p className="mt-1 font-body text-sm font-bold text-primary-ink">
                {result.price} · até {result.installment}
              </p>

              <ul className="mx-auto my-3 flex max-w-md flex-col items-center gap-1 font-body text-xs text-muted-foreground sm:text-sm">
                {result.bullets.map((b) => (
                  <li key={b} className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary-ink" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <p className="mb-4 font-body text-xs text-muted-foreground sm:text-sm">{result.note}</p>

              <div className="flex flex-col items-center justify-center gap-2.5 sm:flex-row">
                <CheckoutLink
                  source="quiz"
                  ticketId={result.ticketId}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full gradient-bg px-6 py-3 font-body text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95 active:scale-95 sm:w-auto"
                >
                  <span>Garantir este passaporte</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </CheckoutLink>

                {who === "amigos" && <ShareCrewButton className="w-full sm:w-auto" />}

                {who === "caravana" && (
                  <a
                    href={WHATSAPP_URLS.caravans}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { channel: "caravans" })}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-primary px-5 py-3 font-body text-sm font-bold text-primary-ink transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Falar com equipe de caravanas</span>
                  </a>
                )}

                {who === "familia" && (
                  <a
                    href="#desconto-infantil"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-primary px-5 py-3 font-body text-sm font-bold text-primary-ink transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
                  >
                    <Users className="h-4 w-4" aria-hidden="true" />
                    <span>Ver valores infantis abaixo</span>
                  </a>
                )}
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-[44px] items-center gap-1.5 font-body text-xs font-semibold text-muted-foreground underline underline-offset-4"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Responder de novo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PassportQuiz;
