import { Link } from "react-router-dom";
import { Instagram, MessageCircle, Youtube } from "lucide-react";
import logoEjm from "@/assets/logo-ejm-darkbg.png";
import logoCristoEmVos from "@/assets/logo-cristoemvos.png";
import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_URLS } from "@/lib/checkout";

interface FooterProps {
  hasMobileStickyBar?: boolean;
}

const Footer = ({ hasMobileStickyBar = false }: FooterProps) => {
  return (
    <footer
      className={`bg-graphite section-padding ${
        hasMobileStickyBar
          ? "pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:pb-10"
          : "pb-10"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Official Brand Lockup: EJM 2027 + Igreja Cristo em Vós */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <div className="flex items-center gap-3">
              <img
                src={logoEjm}
                alt="Logotipo oficial EJM 2027"
                width={36}
                height={36}
                loading="lazy"
                className="h-9 w-9 object-contain md:h-10 md:w-10"
              />
              <div>
                <p className="font-display text-xs text-white md:text-sm">EJM 2027</p>
                <p className="font-body text-xs text-white/75">
                  Encontro de Jovens da Mensagem
                </p>
              </div>
            </div>

            <span aria-hidden="true" className="hidden h-7 w-px bg-white/20 sm:block" />

            <div className="flex items-center gap-2.5">
              <img
                src={logoCristoEmVos}
                alt="Logotipo oficial Igreja Cristo em Vós"
                width={32}
                height={32}
                loading="lazy"
                className="h-8 w-8 object-contain"
              />
              <p className="font-body text-xs font-medium text-white/85">
                Igreja Cristo em Vós
              </p>
            </div>
          </div>

          {/* Real, verified channels only (Instagram + YouTube + WhatsApp) */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/cristo.emvos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram oficial da Igreja Cristo em Vós (abre em nova aba)"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-colors hover:border-primary hover:text-orange-300"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/@cristo_emvos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Canal oficial da Igreja Cristo em Vós no YouTube (abre em nova aba)"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-colors hover:border-primary hover:text-orange-300"
            >
              <Youtube className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={WHATSAPP_URLS.caravans}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { channel: "footer" })}
              aria-label="Falar com a organização pelo WhatsApp (abre em nova aba)"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-colors hover:border-primary hover:text-orange-300"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 text-center">
          <p className="font-body text-xs text-white/80">
            Organização: Pr. Pedro Vitorino · Igreja Cristo em Vós
          </p>
          <p className="mt-2 font-body text-xs text-white/75">
            © 2027 Igreja Cristo em Vós | Todos os direitos reservados.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 font-body text-xs text-white/85">
            <Link
              to="/privacidade"
              className="inline-flex min-h-[44px] items-center px-2 underline underline-offset-4 transition-colors hover:text-orange-300"
            >
              Política de Privacidade
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("ejm-open-cookie-settings"))}
              className="inline-flex min-h-[44px] items-center px-2 underline underline-offset-4 transition-colors hover:text-orange-300"
            >
              Preferências de Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
