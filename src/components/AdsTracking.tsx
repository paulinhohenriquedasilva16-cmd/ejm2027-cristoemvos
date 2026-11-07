import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getRegion, readConsent, saveConsent, startPixel, trackCheckoutClick, trackPageView } from "@/lib/metaPixel";

const AdsTracking = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    void startPixel();
    (async () => {
      if (navigator.globalPrivacyControl || readConsent()) return;
      if ((await getRegion()).needsConsent) setShow(true);
    })();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (a?.href?.includes("eisme.com.br")) void trackCheckoutClick(a.href);
    };
    const open = () => setShow(true);
    document.addEventListener("click", onClick, true);
    window.addEventListener("ejm-open-cookie-settings", open);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("ejm-open-cookie-settings", open);
    };
  }, []);

  useEffect(() => { void trackPageView(pathname); }, [pathname]);

  if (!show) return null;
  const choose = async (c: "granted" | "denied") => { await saveConsent(c); setShow(false); };

  return (
    <div role="dialog" aria-label="Preferências de cookies" className="fixed bottom-4 inset-x-4 z-[60] mx-auto max-w-xl rounded-2xl border border-border bg-background/95 backdrop-blur-xl p-5 shadow-2xl font-body">
      <p className="text-sm text-foreground mb-4">
        Usamos o Meta Pixel (Facebook/Instagram) para medir visitas e cliques na inscrição e melhorar nossos anúncios. Você pode mudar sua escolha a qualquer momento em "Cookies" no rodapé.{" "}
        <Link to="/privacidade" className="underline text-primary">Política de privacidade</Link>
      </p>
      <div className="flex gap-3">
        <button onClick={() => choose("denied")} className="flex-1 min-h-[44px] rounded-full border border-input text-foreground font-semibold hover:border-primary">Recusar</button>
        <button onClick={() => choose("granted")} className="flex-1 min-h-[44px] rounded-full gradient-bg text-primary-foreground font-semibold">Aceitar</button>
      </div>
    </div>
  );
};

export default AdsTracking;
