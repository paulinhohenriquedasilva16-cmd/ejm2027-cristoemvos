import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import logoEjmLightBg from "@/assets/logo-ejm.png";
import logoEjmDarkBg from "@/assets/logo-ejm-darkbg.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const desktopLinks = [
  { hash: "#momentos", label: "Momentos" },
  { hash: "#cronograma", label: "Cronograma" },
  { hash: "#acomodacoes", label: "Acomodações" },
  { hash: "#faq", label: "Dúvidas" },
];

const mobileLinks = [
  { hash: "#momentos", label: "Momentos" },
  { hash: "#sobre", label: "Sobre" },
  { hash: "#cronograma", label: "Cronograma" },
  { hash: "#acomodacoes", label: "Acomodações" },
  { hash: "#inscricao", label: "Ingressos" },
  { hash: "#faq", label: "Dúvidas" },
];

interface NavbarProps {
  alwaysSolid?: boolean;
}

const Navbar = ({ alwaysSolid = false }: NavbarProps) => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (alwaysSolid) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysSolid]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const isSolid = alwaysSolid || scrolled || mobileMenuOpen;
  const isHome = pathname === "/";
  const isStore = pathname === "/loja";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isSolid
          ? "border-b border-border bg-background/98 text-foreground shadow-sm md:bg-background/95 md:backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-black/65 to-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* Brand */}
        {isHome ? (
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg"
            aria-label="EJM 2027 - Ir para o topo"
          >
            <img
              src={isSolid ? logoEjmLightBg : logoEjmDarkBg}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 object-contain"
            />
            <span className="whitespace-nowrap font-display text-xs tracking-tight sm:text-sm">
              EJM 2027
            </span>
          </a>
        ) : (
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg"
            aria-label="EJM 2027 - Voltar ao início"
          >
            <img
              src={logoEjmLightBg}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 object-contain"
            />
            <span className="whitespace-nowrap font-display text-xs tracking-tight sm:text-sm">
              EJM 2027
            </span>
          </Link>
        )}

        {/* Desktop Navigation (spacious, switches to menu below 1024px so it never cramps) */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {desktopLinks.map((link) =>
            isHome ? (
              <a
                key={link.hash}
                href={link.hash}
                className={`inline-flex min-h-[44px] items-center px-1 font-body text-sm font-medium transition-colors ${
                  isSolid
                    ? "text-foreground/85 hover:text-primary-ink"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.hash}
                to={`/${link.hash}`}
                className="inline-flex min-h-[44px] items-center px-1 font-body text-sm font-medium text-foreground/85 transition-colors hover:text-primary-ink"
              >
                {link.label}
              </Link>
            )
          )}

          <Link
            to="/loja"
            aria-current={isStore ? "page" : undefined}
            className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 font-body text-sm font-semibold transition-colors ${
              isStore
                ? "bg-primary/10 text-primary-ink"
                : isSolid
                  ? "text-foreground/85 hover:bg-muted hover:text-primary-ink"
                  : "text-white/95 hover:bg-white/15 hover:text-white"
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Loja</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          <Link
            to="/loja"
            aria-current={isStore ? "page" : undefined}
            aria-label="Abrir Loja Oficial do EJM 2027"
            title="Loja Oficial"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
              isStore
                ? "border border-primary/40 bg-primary/10 text-primary-ink"
                : isSolid
                  ? "border border-border bg-muted/80 text-foreground hover:border-primary/40"
                  : "border border-white/25 bg-graphite/80 text-white hover:bg-graphite/95"
            }`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          </Link>

          <LanguageSwitcher variant={isSolid ? "solid" : "transparent"} />

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-sheet"
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            onClick={() => setMobileMenuOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
              isSolid
                ? "border border-border bg-muted/80 text-foreground hover:border-primary/40"
                : "border border-white/25 bg-graphite/80 text-white hover:bg-graphite/95"
            }`}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {isHome ? (
            <a
              href="#inscricao"
              className="hidden min-h-[44px] items-center justify-center whitespace-nowrap rounded-full gradient-bg px-4 py-2 font-body text-xs font-bold text-primary-foreground transition-opacity hover:opacity-95 sm:inline-flex sm:px-5 sm:text-sm"
            >
              Inscrever-se
            </a>
          ) : (
            <Link
              to="/#inscricao"
              className="hidden min-h-[44px] items-center justify-center whitespace-nowrap rounded-full gradient-bg px-4 py-2 font-body text-xs font-bold text-primary-foreground transition-opacity hover:opacity-95 sm:inline-flex sm:px-5 sm:text-sm"
            >
              Inscrever-se
            </Link>
          )}
        </div>
      </div>

      {/* Vertical Quick Sheet Menu on Mobile/Tablet (strictly Y transition, zero horizontal overflow) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-nav-sheet"
            aria-label="Menu rápido mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-border bg-background px-4 pb-5 pt-3 text-foreground shadow-xl lg:hidden"
          >
            <ul className="grid grid-cols-2 gap-2">
              {mobileLinks.map((link) => (
                <li key={link.hash}>
                  {isHome ? (
                    <a
                      href={link.hash}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex min-h-[48px] items-center justify-center rounded-2xl border border-border bg-muted/40 px-3 font-body text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary-ink"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={`/${link.hash}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex min-h-[48px] items-center justify-center rounded-2xl border border-border bg-muted/40 px-3 font-body text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary-ink"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/loja"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-4 font-body text-sm font-bold text-primary-ink"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                <span>Loja Oficial</span>
              </Link>
              {isHome ? (
                <a
                  href="#inscricao"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[48px] items-center justify-center rounded-full gradient-bg px-4 font-body text-sm font-bold text-primary-foreground"
                >
                  Inscrever-se
                </a>
              ) : (
                <Link
                  to="/#inscricao"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[48px] items-center justify-center rounded-full gradient-bg px-4 font-body text-sm font-bold text-primary-foreground"
                >
                  Inscrever-se
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
