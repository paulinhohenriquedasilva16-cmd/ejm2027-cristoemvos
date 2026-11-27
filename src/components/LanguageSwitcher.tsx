import { useCallback, useEffect, useState } from "react";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trackEvent } from "@/lib/analytics";

interface GoogleTranslateConstructor {
  new (
    options: { pageLanguage: string; autoDisplay: boolean; layout: unknown },
    elementId: string
  ): unknown;
  InlineLayout: { SIMPLE: unknown };
}

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: GoogleTranslateConstructor;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const languages = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

function readGoogTransCookie(
  cookieStr = typeof document !== "undefined" ? document.cookie : ""
): string {
  const match = cookieStr
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("googtrans="));
  if (!match) return "pt";
  try {
    const raw = decodeURIComponent(match.slice("googtrans=".length));
    const parts = raw.split("/").filter(Boolean);
    const target = parts[1];
    return languages.some((l) => l.code === target) ? target : "pt";
  } catch {
    return "pt";
  }
}

const setCookie = (name: string, value: string, maxAge?: number) => {
  const hostname = window.location.hostname;
  const agePart = typeof maxAge === "number" ? `;max-age=${maxAge}` : "";
  document.cookie = `${name}=${value};path=/${agePart}`;
  document.cookie = `${name}=${value};path=/;domain=${hostname}${agePart}`;
  const parts = hostname.split(".");
  if (parts.length > 1) {
    const parent = "." + parts.slice(-2).join(".");
    document.cookie = `${name}=${value};path=/;domain=${parent}${agePart}`;
  }
};

function injectGoogleTranslateScript(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById("google-translate-script")) return;

  window.googleTranslateElementInit = () => {
    const TranslateElement = window.google?.translate?.TranslateElement;
    if (!TranslateElement) return;
    new TranslateElement(
      {
        pageLanguage: "pt",
        autoDisplay: false,
        layout: TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

interface LanguageSwitcherProps {
  variant?: "transparent" | "solid";
  standalone?: boolean;
}

const LanguageSwitcher = ({ variant = "transparent", standalone = false }: LanguageSwitcherProps) => {
  const [current, setCurrent] = useState<string>(() => readGoogTransCookie());

  useEffect(() => {
    if (current !== "pt") {
      injectGoogleTranslateScript();
    }
  }, [current]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) {
      injectGoogleTranslateScript();
    }
  }, []);

  const changeLanguage = (lang: string) => {
    trackEvent("language_change", { from_lang: current, to_lang: lang });
    setCurrent(lang);
    if (lang === "pt") {
      setCookie("googtrans", "", 0);
      setCookie("googtrans", "/pt/pt");
    } else {
      injectGoogleTranslateScript();
      setCookie("googtrans", `/pt/${lang}`);
    }
    // Brief delay lets GTM/GA4 flush the language_change beacon before reloading
    window.setTimeout(() => {
      window.location.reload();
    }, 150);
  };

  const currentLang = languages.find((l) => l.code === current) || languages[0];

  const triggerClasses =
    variant === "solid"
      ? "inline-flex min-h-[44px] items-center gap-1 rounded-full border border-border bg-muted/80 px-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted font-body sm:px-3"
      : "inline-flex min-h-[44px] items-center gap-1 rounded-full border border-white/25 bg-graphite/85 px-2.5 text-xs font-medium text-white md:backdrop-blur-md transition-colors hover:bg-graphite/95 font-body sm:px-3";

  const content = (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger
          className={triggerClasses}
          aria-label={`Selecionar idioma (atual: ${currentLang.label})`}
        >
          <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span aria-hidden="true">{currentLang.flag}</span>
          <span className="hidden lg:inline">{currentLang.label}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
          {languages.map((lang) => {
            const isSelected = lang.code === current;
            return (
              <DropdownMenuItem
                key={lang.code}
                lang={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`min-h-[44px] cursor-pointer justify-between gap-2 ${
                  isSelected ? "font-semibold text-primary-ink" : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true">{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                {isSelected && <Check className="h-4 w-4 shrink-0 text-primary-ink" aria-hidden="true" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  if (standalone) {
    return <div className="fixed top-4 right-4 z-50">{content}</div>;
  }

  return content;
};

export default LanguageSwitcher;
