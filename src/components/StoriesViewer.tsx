import { useCallback, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowRight, Flame, Pause, Play, X } from "lucide-react";
import { MEMORIES, STORY_IDS, type MemoryVibe } from "@/data/memories";
import { trackEvent } from "@/lib/analytics";
import CheckoutLink from "@/components/CheckoutLink";
import ShareCrewButton from "@/components/ShareCrewButton";

const SLIDE_MS = 5000;
const STORIES = STORY_IDS.map((id) => MEMORIES.find((m) => m.id === id)!).filter(Boolean);
const TOTAL = STORIES.length + 1;

const VIBE_LABELS: Record<MemoryVibe, string> = {
  adoracao: "Adoração",
  comunhao: "Comunhão",
  galera: "Gincanas e Companheirismo",
};

interface StoriesViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StoriesViewer = ({ open, onOpenChange }: StoriesViewerProps) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [bursts, setBursts] = useState<number[]>([]);
  const isLast = index === TOTAL - 1;
  const isPaused = paused || holding || Boolean(reduceMotion);

  useEffect(() => {
    if (!open) {
      setIndex(0);
      setPaused(false);
      setHolding(false);
      setBursts([]);
    }
  }, [open]);

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, TOTAL - 1)), []);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  // Preload next slide image for smooth 4G playback
  useEffect(() => {
    if (!open) return;
    const nextStory = STORIES[index + 1];
    if (nextStory) {
      const img = new Image();
      img.src = nextStory.src;
    }
  }, [open, index]);

  useEffect(() => {
    if (!open || isLast || isPaused) return;
    const t = window.setTimeout(next, SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [open, index, isLast, isPaused, next]);

  useEffect(() => {
    if (open && isLast) trackEvent("stories_complete", { slides: TOTAL });
  }, [open, isLast]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  const story = STORIES[index];

  const handleReact = () => {
    const id = Date.now() + Math.random();
    setBursts((prevBursts) => [...prevBursts.slice(-4), id]);
    if (story) trackEvent("gallery_like", { photo_id: story.id });
    window.setTimeout(() => {
      setBursts((prevBursts) => prevBursts.filter((b) => b !== id));
    }, 850);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 90) onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-[81] h-[100svh] w-full max-w-[440px] -translate-x-1/2 -translate-y-1/2 overflow-hidden outline-none sm:h-[min(92svh,820px)] sm:rounded-3xl"
        >
          <motion.div
            drag={reduceMotion ? false : "y"}
            dragConstraints={{ top: 0, bottom: 140 }}
            dragSnapToOrigin
            onDragEnd={handleDragEnd}
            onPointerDown={() => setHolding(true)}
            onPointerUp={() => setHolding(false)}
            onPointerCancel={() => setHolding(false)}
            className="relative flex h-full w-full flex-col overflow-hidden bg-graphite text-white sm:rounded-3xl"
          >
            <DialogPrimitive.Title className="sr-only">Momentos do EJM</DialogPrimitive.Title>
            <span className="sr-only" aria-live="polite">
              {story ? `Foto ${index + 1} de ${TOTAL}: ${story.caption}` : `Última tela ${TOTAL} de ${TOTAL}: Garanta sua vaga no EJM 2027`}
            </span>

            <AnimatePresence mode="wait">
              {story ? (
                <motion.img
                  key={story.id}
                  src={story.src}
                  alt={story.alt}
                  initial={reduceMotion ? false : { opacity: 0.4, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.4 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <motion.div
                  key="cta-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  aria-hidden="true"
                  className="absolute inset-0 gradient-bg"
                />
              )}
            </AnimatePresence>

            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85" />

            {/* Top Progress Bars */}
            <div className="relative z-20 flex gap-1.5 px-3 pt-3" aria-hidden="true">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                  <div
                    key={i === index ? `active-${index}` : `s-${i}`}
                    className={`h-full origin-left rounded-full bg-white ${
                      i === index && !isLast && !reduceMotion ? "story-progress" : ""
                    }`}
                    style={{
                      animationPlayState: isPaused ? "paused" : "running",
                      transform:
                        i < index || (i === index && (isLast || reduceMotion))
                          ? "scaleX(1)"
                          : i === index
                            ? undefined
                            : "scaleX(0)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header Controls */}
            <div className="relative z-20 flex items-center justify-between px-4 pt-3">
              <div className="flex items-center gap-2">
                <span className="font-body text-xs font-bold uppercase tracking-wider">EJM 2027</span>
                {story && (
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider">
                    {VIBE_LABELS[story.vibe]}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {!isLast && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPaused((p) => !p);
                    }}
                    aria-label={isPaused ? "Continuar stories" : "Pausar stories"}
                    aria-pressed={isPaused}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    {isPaused ? (
                      <Play className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Pause className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                )}
                <DialogPrimitive.Close
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Fechar stories"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </DialogPrimitive.Close>
              </div>
            </div>

            {/* Tap Navigation Zones */}
            {!isLast && (
              <div className="absolute inset-x-0 top-24 bottom-36 z-10 flex">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Story anterior"
                  className="h-full w-1/3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white"
                />
                <button
                  type="button"
                  onClick={next}
                  aria-label="Próximo story"
                  className="h-full w-2/3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white"
                />
              </div>
            )}

            {/* Bottom Content & Reaction */}
            <div className="relative z-20 mt-auto px-5 pb-8">
              {isLast ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="mb-2 font-display text-2xl leading-tight">Quer viver isso em 2027?</p>
                  <p className="mb-5 font-body text-sm text-white/90">
                    15 a 17 de janeiro, Estância Árvore da Vida, Sumaré SP.
                  </p>
                  <CheckoutLink
                    source="stories"
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-body text-sm font-bold text-graphite shadow-lg transition-transform active:scale-95"
                  >
                    <span>Quero viver isso em 2027</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </CheckoutLink>
                  <div className="mt-3">
                    <ShareCrewButton className="w-full border-white/80 text-white hover:bg-white hover:text-graphite" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIndex(0)}
                    className="mt-2 min-h-[44px] font-body text-xs font-semibold text-white/85 underline underline-offset-4"
                  >
                    Ver tudo desde o início
                  </button>
                </motion.div>
              ) : (
                <div className="flex items-end justify-between gap-3">
                  <motion.div
                    key={story?.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="min-w-0 flex-1"
                  >
                    <p className="font-display text-xl leading-snug drop-shadow-lg">{story?.caption}</p>
                    <p className="mt-1 font-body text-[11px] text-white/75">
                      Segure para pausar · Toque para avançar
                    </p>
                  </motion.div>

                  <div className="relative shrink-0">
                    <AnimatePresence>
                      {bursts.map((id) => (
                        <motion.span
                          key={id}
                          initial={{ opacity: 1, y: 0, scale: 0.8 }}
                          animate={{ opacity: 0, y: -48, scale: 1.25 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.75, ease: "easeOut" }}
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-xs font-bold text-orange-300"
                        >
                          Amém 🔥
                        </motion.span>
                      ))}
                    </AnimatePresence>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.88 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReact();
                      }}
                      aria-label="Reagir com Amém neste story"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-orange-300 ring-1 ring-white/25"
                    >
                      <Flame className="h-5 w-5" aria-hidden="true" />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default StoriesViewer;
