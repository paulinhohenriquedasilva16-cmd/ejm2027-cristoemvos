import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  initAnalytics,
  saveConsentAndSync,
  syncProvidersWithState,
  trackCheckoutClick,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";
import {
  CONSENT_KEY,
  canTrackSync,
  dispatchCookieBannerVisibility,
  getSyncConsentState,
} from "@/lib/consent";

const SCROLL_MILESTONES = [25, 50, 75, 90] as const;
const TRACKED_SECTIONS = ["inscricao", "acomodacoes", "cronograma"] as const;

const AdsTracking = () => {
  const { pathname, search } = useLocation();
  const [show, setShow] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Capture UTM / click IDs on route search changes
  useEffect(() => {
    captureAttribution(search, pathname, document.referrer, canTrackSync());
  }, [pathname, search]);

  // Notify MobileStickyCTA whenever the consent banner visibility changes & move focus on open
  useEffect(() => {
    dispatchCookieBannerVisibility(show);
    if (show) {
      dialogRef.current?.focus();
    }
  }, [show]);

  useEffect(() => {
    let active = true;
    void initAnalytics().then(({ needsBanner }) => {
      if (active && needsBanner) setShow(true);
    });

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a || a.dataset.checkoutTracked === "true") return;
      if (a.href?.includes("eisme.com.br")) {
        trackCheckoutClick({ source: "hero", ticketId: "geral", url: a.href });
      }
    };

    const onOpenSettings = () => setShow(true);

    // Cross-tab sync: ONLY sync providers with the stored state, NEVER re-write localStorage (prevents ping-pong loop)
    const onStorage = (e: StorageEvent) => {
      if (e.key !== CONSENT_KEY) return;
      syncProvidersWithState(getSyncConsentState());
      setShow(false);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("ejm-open-cookie-settings", onOpenSettings);
    window.addEventListener("storage", onStorage);

    return () => {
      active = false;
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("ejm-open-cookie-settings", onOpenSettings);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Track SPA page views
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // Track scroll depth milestones and key commercial sections (including lazy-loaded #acomodacoes)
  useEffect(() => {
    if (pathname !== "/") return;

    const reachedDepths = new Set<number>();
    const onScroll = () => {
      if (!canTrackSync()) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((window.scrollY / docHeight) * 100);
      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !reachedDepths.has(milestone)) {
          reachedDepths.add(milestone);
          trackEvent("scroll_depth", { percent: milestone });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("ejm-consent-change", onScroll);

    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    if (typeof IntersectionObserver !== "undefined") {
      const seenSections = new Set<string>();
      const observedElements = new Set<string>();

      observer = new IntersectionObserver(
        (entries) => {
          if (!canTrackSync()) return;
          for (const entry of entries) {
            const id = entry.target.id;
            if (entry.isIntersecting && id && !seenSections.has(id)) {
              seenSections.add(id);
              trackEvent("section_view", { section_id: id });
            }
          }
        },
        { threshold: 0.1 }
      );

      const attachTargets = () => {
        for (const id of TRACKED_SECTIONS) {
          if (observedElements.has(id)) continue;
          const el = document.getElementById(id);
          if (el) {
            observer?.observe(el);
            observedElements.add(id);
          }
        }
        if (observedElements.size === TRACKED_SECTIONS.length) {
          mutationObserver?.disconnect();
        }
      };

      attachTargets();

      if (observedElements.size < TRACKED_SECTIONS.length && typeof MutationObserver !== "undefined") {
        mutationObserver = new MutationObserver(attachTargets);
        mutationObserver.observe(document.body, { childList: true, subtree: true });
      }
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("ejm-consent-change", onScroll);
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [pathname]);

  if (!show) return null;

  const choose = async (choice: "granted" | "denied") => {
    await saveConsentAndSync(choice);
    setShow(false);
  };

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-label="Preferências de cookies"
      onKeyDown={(e) => {
        if (e.key === "Escape") setShow(false);
      }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] inset-x-4 z-[60] mx-auto max-w-xl rounded-2xl border border-border bg-background p-5 shadow-2xl md:bg-background/95 md:backdrop-blur-xl font-body focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <p className="mb-4 text-sm text-foreground">
        Usamos ferramentas de medição (Google Tag Manager, Meta Pixel, Google Analytics e Microsoft Clarity) para entender visitas, cliques na inscrição e melhorar nossos anúncios. Você pode alterar sua escolha quando quiser em &quot;Preferências de Cookies&quot; no rodapé.{" "}
        <Link to="/privacidade" className="font-semibold text-primary-ink underline hover:opacity-80">
          Política de privacidade
        </Link>
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => void choose("denied")}
          className="flex-1 min-h-[44px] rounded-full border border-input font-semibold text-foreground transition-colors hover:border-primary"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => void choose("granted")}
          className="flex-1 min-h-[44px] rounded-full gradient-bg font-semibold text-primary-foreground transition-opacity hover:opacity-95"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
};

export default AdsTracking;
