import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { getQuizMatch, onQuizMatch, type AdultTicketId } from "@/lib/quizBus";

const MobileStickyCTA = () => {
  const [heroVisible, setHeroVisible] = useState(true);
  const [pricingVisible, setPricingVisible] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [quizMatch, setQuizMatch] = useState<AdultTicketId | null>(() => getQuizMatch());

  useEffect(() => {
    const unsubQuiz = onQuizMatch(setQuizMatch);
    const onCookieVisibility = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      setCookieOpen(Boolean(detail?.open));
    };

    window.addEventListener("ejm-cookie-banner-visibility", onCookieVisibility);

    if (typeof IntersectionObserver === "undefined") {
      return () => {
        unsubQuiz();
        window.removeEventListener("ejm-cookie-banner-visibility", onCookieVisibility);
      };
    }

    const heroEl = document.getElementById("hero");
    const pricingEl = document.getElementById("inscricao");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === "hero") {
            setHeroVisible(entry.isIntersecting);
          } else if (entry.target.id === "inscricao") {
            setPricingVisible(entry.isIntersecting);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (heroEl) observer.observe(heroEl);
    if (pricingEl) observer.observe(pricingEl);

    return () => {
      unsubQuiz();
      observer.disconnect();
      window.removeEventListener("ejm-cookie-banner-visibility", onCookieVisibility);
    };
  }, []);

  const visible = !heroVisible && !pricingVisible && !cookieOpen;

  const topLabel =
    quizMatch === "ouro-vip"
      ? "Indicado · Ouro VIP"
      : quizMatch === "ouro-sem-acomodacao"
        ? "Indicado · Sem Acomodação"
        : "1º Lote Aberto";

  const priceLabel =
    quizMatch === "ouro-vip"
      ? "R$ 599,99 • 3x R$ 200 s/ juros"
      : quizMatch === "ouro-sem-acomodacao"
        ? "R$ 480,00 • 3x R$ 160 s/ juros"
        : "A partir de R$ 480 • 3x s/ juros";

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.18)] transition-[transform,opacity] duration-300 md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="min-w-0 font-body">
          <p className="truncate text-[11px] font-bold uppercase tracking-wider text-primary-ink">
            {topLabel}
          </p>
          <p className="truncate text-xs font-semibold text-foreground">
            {priceLabel}
          </p>
        </div>

        <a
          href="#inscricao"
          tabIndex={visible ? 0 : -1}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-full gradient-bg px-4 py-2.5 font-body text-xs font-bold text-primary-foreground transition-opacity hover:opacity-95 active:scale-95"
        >
          <span>Ver Ingressos</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
