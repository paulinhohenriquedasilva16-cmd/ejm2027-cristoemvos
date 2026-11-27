import { Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const SHARE_URL =
  "https://ejm.cristoemvos.com/?utm_source=whatsapp&utm_medium=share&utm_campaign=chame_a_galera";
const MESSAGE =
  "Bora pro EJM 2027? 15 a 17 de janeiro na Estância Árvore da Vida, em Sumaré SP. Louvor, comunhão e 9 refeições inclusas. Vê aqui: ";

interface ShareCrewButtonProps {
  className?: string;
}

const ShareCrewButton = ({ className = "" }: ShareCrewButtonProps) => (
  <a
    href={`https://wa.me/?text=${encodeURIComponent(MESSAGE + SHARE_URL)}`}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackEvent("whatsapp_click", { channel: "share_crew" })}
    className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-body text-sm font-bold text-primary-ink transition-all hover:-translate-y-0.5 hover:bg-primary-ink hover:text-primary-foreground active:scale-95 ${className}`}
  >
    <Share2 className="h-4 w-4" aria-hidden="true" />
    Chame a galera
  </a>
);

export default ShareCrewButton;
