import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Flame,
  MessageCircle,
  Music,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type MomentCategory = "Culto" | "Refeição inclusa" | "Comunhão" | "Boas-vindas";

interface ScheduleMoment {
  time: string;
  title: string;
  category: MomentCategory;
  highlight?: boolean;
  note?: string;
}

interface ScheduleDay {
  id: string;
  shortLabel: string;
  dateLabel: string;
  fullTitle: string;
  summary: string;
  moments: ScheduleMoment[];
}

const STORAGE_KEY = "ejm2027_saved_moments";

const scheduleDays: ScheduleDay[] = [
  {
    id: "sexta",
    shortLabel: "Sexta",
    dateLabel: "15/Jan",
    fullTitle: "Sexta-feira · 15 de Janeiro",
    summary: "Chegada ao meio-dia com almoço de boas-vindas, acomodação, Culto de Abertura e louvor.",
    moments: [
      { time: "12:00", title: "Chegada dos irmãos e Almoço", category: "Refeição inclusa" },
      { time: "TARDE", title: "Acomodação (tempo livre)", category: "Boas-vindas" },
      { time: "15:30", title: "Café da tarde", category: "Refeição inclusa" },
      {
        time: "16:30",
        title: "Culto de Abertura",
        category: "Culto",
        highlight: true,
        note: "O início oficial do EJM 2027 com toda a juventude reunida",
      },
      { time: "21:00", title: "Jantar", category: "Refeição inclusa" },
      { time: "22:00", title: "Companheirismo e louvor", category: "Comunhão" },
    ],
  },
  {
    id: "sabado",
    shortLabel: "Sábado",
    dateLabel: "16/Jan",
    fullTitle: "Sábado · 16 de Janeiro",
    summary: "Dia completo: Louvorzão Ranchão pela manhã, gincanas à tarde, Culto às 16:30 e 4 refeições inclusas.",
    moments: [
      { time: "08:00", title: "Café da Manhã", category: "Refeição inclusa" },
      {
        time: "09:30",
        title: "Louvorzão Ranchão",
        category: "Comunhão",
        highlight: true,
        note: "Sábado de manhã com toda a galera cantando junto ao ar livre",
      },
      { time: "12:00", title: "Almoço", category: "Refeição inclusa" },
      {
        time: "13:00",
        title: "Gincanas e companheirismo",
        category: "Comunhão",
        note: "Dinâmicas, teatro bíblico e muita risada em equipe",
      },
      { time: "15:30", title: "Café da tarde", category: "Refeição inclusa" },
      {
        time: "16:30",
        title: "Culto",
        category: "Culto",
        highlight: true,
        note: "Palavra e adoração intensa no auditório principal",
      },
      { time: "21:00", title: "Jantar", category: "Refeição inclusa" },
      { time: "22:00", title: "Companheirismo", category: "Comunhão" },
    ],
  },
  {
    id: "domingo",
    shortLabel: "Domingo",
    dateLabel: "17/Jan",
    fullTitle: "Domingo · 17 de Janeiro",
    summary: "Café da manhã, Culto de Encerramento às 09:00 e almoço de despedida ao meio-dia.",
    moments: [
      { time: "08:00", title: "Café da Manhã", category: "Refeição inclusa" },
      {
        time: "09:00",
        title: "Culto de Encerramento",
        category: "Culto",
        highlight: true,
        note: "Oração final, envio e comunhão antes de voltar para casa",
      },
      { time: "12:00", title: "Almoço e despedida", category: "Refeição inclusa" },
    ],
  },
];

const categoryIcon = (category: MomentCategory) => {
  switch (category) {
    case "Culto":
      return Flame;
    case "Refeição inclusa":
      return UtensilsCrossed;
    case "Comunhão":
      return Music;
    default:
      return Sparkles;
  }
};

function readSavedMoments(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

const ScheduleSection = () => {
  const [activeDayId, setActiveDayId] = useState<string>("sexta");
  const [saved, setSaved] = useState<Record<string, boolean>>(() => readSavedMoments());
  const [liveMsg, setLiveMsg] = useState("");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // Ignore storage quota errors
    }
  }, [saved]);

  const savedCount = Object.values(saved).filter(Boolean).length;

  const handleSelectDay = (day: ScheduleDay) => {
    setActiveDayId(day.id);
    trackEvent("schedule_day_select", { day_id: day.id, day_label: day.fullTitle });
  };

  const toggleSaveMoment = (key: string, title: string) => {
    setSaved((prev) => {
      const nextVal = !prev[key];
      setLiveMsg(nextVal ? `${title} salvo no seu roteiro` : `${title} removido do seu roteiro`);
      return { ...prev, [key]: nextVal };
    });
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % scheduleDays.length;
    else if (e.key === "ArrowLeft") nextIndex = (index - 1 + scheduleDays.length) % scheduleDays.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = scheduleDays.length - 1;

    if (nextIndex !== null) {
      e.preventDefault();
      const targetDay = scheduleDays[nextIndex];
      handleSelectDay(targetDay);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section id="cronograma" className="section-padding scroll-mt-20 bg-background">
      <div className="mx-auto max-w-5xl">
        <span className="sr-only" aria-live="polite">
          {liveMsg}
        </span>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-primary-ink">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            Programação Oficial · 15 a 17 de Janeiro
          </span>
          <h2 className="mb-4 font-display text-2xl text-foreground md:text-4xl">
            Cronograma <span className="gradient-text">Oficial</span>
          </h2>
          <p className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
            Confira os horários oficiais dos 3 dias de encontro, marque seus momentos favoritos e já monte o seu roteiro.
          </p>
        </motion.div>

        {/* WAI-ARIA Tabs with animated layoutId indicator */}
        <div
          role="tablist"
          aria-label="Dias do cronograma oficial do EJM 2027"
          className="mx-auto mb-8 grid max-w-xl grid-cols-3 gap-2 rounded-2xl border border-border bg-muted/60 p-1.5"
        >
          {scheduleDays.map((day, index) => {
            const isSelected = day.id === activeDayId;
            return (
              <button
                key={day.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${day.id}`}
                tabIndex={isSelected ? 0 : -1}
                aria-selected={isSelected}
                aria-controls={`panel-${day.id}`}
                onClick={() => handleSelectDay(day)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`relative min-h-[48px] rounded-xl px-2 py-2.5 text-center font-body transition-colors ${
                  isSelected
                    ? "text-primary-foreground"
                    : "text-foreground/85 hover:bg-card hover:text-foreground"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="schedule-day-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl gradient-bg shadow-md"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 block text-xs font-bold sm:text-sm">{day.shortLabel}</span>
                <span
                  className={`relative z-10 block text-[11px] ${
                    isSelected ? "text-white/95" : "text-muted-foreground"
                  }`}
                >
                  {day.dateLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Render ALL 3 panels with `hidden` so Saturday & Sunday remain indexable in the DOM */}
        <div className="mx-auto max-w-3xl">
          {scheduleDays.map((day) => {
            const isSelected = day.id === activeDayId;
            return (
              <div
                key={day.id}
                role="tabpanel"
                id={`panel-${day.id}`}
                aria-labelledby={`tab-${day.id}`}
                hidden={!isSelected}
              >
                <div className="mb-6 flex flex-col items-center justify-between gap-2 rounded-2xl border border-border bg-muted/40 px-5 py-4 text-center sm:flex-row sm:text-left">
                  <div>
                    <h3 className="font-display text-base text-foreground sm:text-lg">
                      {day.fullTitle}
                    </h3>
                    <p className="mt-1 font-body text-xs text-muted-foreground sm:text-sm">
                      {day.summary}
                    </p>
                  </div>
                  {savedCount > 0 && (
                    <span className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-body text-xs font-bold text-primary-ink">
                      {savedCount} {savedCount === 1 ? "salvo" : "salvos"} no roteiro
                    </span>
                  )}
                </div>

                <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-0.5 before:bg-border sm:before:left-6">
                  {day.moments.map((moment, idx) => {
                    const Icon = categoryIcon(moment.category);
                    const key = `${day.id}-${moment.time}-${moment.title}`;
                    const isSaved = Boolean(saved[key]);

                    return (
                      <motion.li
                        key={key}
                        initial={isSelected ? { opacity: 0, y: 12 } : false}
                        animate={isSelected ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.24) }}
                        className={`relative flex items-center gap-3 rounded-2xl border p-3.5 transition-colors sm:gap-4 sm:p-4 ${
                          moment.highlight
                            ? "border-primary/40 bg-card"
                            : "border-border bg-card"
                        }`}
                        style={{ boxShadow: "var(--shadow-card)" }}
                      >
                        <div
                          className={`flex min-w-[72px] shrink-0 items-center justify-center rounded-xl px-2.5 py-2.5 text-center font-display text-xs tabular-nums sm:min-w-[84px] sm:text-sm ${
                            moment.highlight
                              ? "gradient-bg text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {moment.time}
                        </div>

                        <div className="min-w-0 flex-1 font-body">
                          <h4 className="text-sm font-bold leading-snug text-foreground sm:text-base">
                            {moment.title}
                          </h4>
                          {moment.note && (
                            <p className="mt-0.5 text-xs text-muted-foreground">{moment.note}</p>
                          )}
                          <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Icon className="h-3.5 w-3.5 shrink-0 text-primary-ink" aria-hidden="true" />
                            <span>{moment.category}</span>
                          </span>
                        </div>

                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.85 }}
                          aria-pressed={isSaved}
                          aria-label={
                            isSaved
                              ? `Remover ${moment.title} do meu roteiro`
                              : `Salvar ${moment.title} no meu roteiro`
                          }
                          onClick={() => toggleSaveMoment(key, moment.title)}
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            isSaved
                              ? "border-primary bg-primary/10 text-primary-ink"
                              : "border-border bg-muted/40 text-muted-foreground hover:border-primary/40 hover:text-primary-ink"
                          }`}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                            aria-hidden="true"
                          />
                        </motion.button>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>
            );
          })}

          {/* Commercial bridge to Pricing & Official WhatsApp Group */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-muted/50 p-5 text-center sm:flex-row sm:text-left">
            <div className="font-body">
              <p className="text-sm font-semibold text-foreground">
                Quer viver esses 3 dias completos com a gente?
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Tanto o Ouro VIP quanto o Sem Acomodação participam de 100% desta programação e das 9 refeições.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:shrink-0 sm:flex-row">
              <a
                href="#inscricao"
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full gradient-bg px-5 py-2.5 font-body text-xs font-bold text-primary-foreground transition-opacity hover:opacity-95 sm:text-sm"
              >
                <span>Ver Ingressos</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#grupo-whatsapp"
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5 font-body text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary-ink sm:text-sm"
              >
                <MessageCircle className="h-4 w-4 text-primary-ink" aria-hidden="true" />
                <span>Avisos no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
