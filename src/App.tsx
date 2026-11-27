import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index";
import AdsTracking from "./components/AdsTracking";

const Store = lazy(() => import("./pages/Store"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const HashScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
        return true;
      }
      return false;
    };
    if (!scrollToTarget()) {
      const timer = setTimeout(scrollToTarget, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
};

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background font-body text-sm text-muted-foreground">
    Carregando...
  </div>
);

const App = () => (
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <HashScrollHandler />
      <AdsTracking />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/loja" element={<Store />} />
          <Route path="/acomodacao/:slug" element={<Navigate to="/#acomodacoes" replace />} />
          <Route path="/privacidade" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </MotionConfig>
);

export default App;
