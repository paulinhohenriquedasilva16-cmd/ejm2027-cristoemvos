import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Flame, Play, X } from "lucide-react";
import { MEMORIES, STORY_IDS, VIBE_FILTERS, type MemoryVibe } from "@/data/memories";
import { trackEvent } from "@/lib/analytics";
import StoriesViewer from "@/components/StoriesViewer";
import ShareCrewButton from "@/components/ShareCrewButton";
import { consumePendingStories, onOpenStories } from "@/lib/storiesBus";

type Filter = "todos" | MemoryVibe;

const INITIAL_VISIBLE = 8;

const MemoriesGallerySection = () => {
  const [filter, setFilter] = useState<Filter>("todos");
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [storiesOpen, setStoriesOpen] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [burstPhotoId, setBurstPhotoId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const counts = useMemo(() => {
    const map: Record<Filter, number> = {
      todos: MEMORIES.length,
      adoracao: 0,
      comunhao: 0,
      galera: 0,
    };
    for (const m of MEMORIES) map[m.vibe] += 1;
    return map;
  }, []);

  const items = useMemo(
    () => (filter === "todos" ? MEMORIES : MEMORIES.filter((m) => m.vibe === filter)),
    [filter],
  );

  const visibleItems = useMemo(
    () => (filter === "todos" && !showAll ? items.slice(0, INITIAL_VISIBLE) : items),
    [filter, showAll, items],
  );

  const selectFilter = (id: Filter) => {
    setFilter(id);
    setLightbox(null);
    trackEvent("gallery_filter_select", { filter: id });
  };

  const openStories = () => {
    setStoriesOpen(true);
    trackEvent("stories_open", { slides: STORY_IDS.length + 1 });
  };

  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, step]);

  const toggleLike = (id: string, caption: string) => {
    const willLike = !liked[id];
    if (willLike) {
      trackEvent("gallery_like", { photo_id: id });
      setBurstPhotoId(id);
      setAnnouncement(`Amém marcado em ${caption}`);
      window.setTimeout(() => {
        setBurstPhotoId((curr) => (curr === id ? null : curr));
      }, 800);
    } else {
      setAnnouncement(`Amém removido de ${caption}`);
    }
    setLiked((prev) => ({ ...prev, [id]: willLike }));
  };

  const current = lightbox !== null ? items[lightbox] : null;

  useEffect(() => {
    const onOpen = () => {
      setStoriesOpen(true);
      trackEvent("stories_open", { slides: STORY_IDS.length + 1 });
    };
    if (consumePendingStories()) onOpen();
    return onOpenStories(onOpen);
  }, []);

  const handleLightboxPanEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) step(1);
    else if (info.offset.x > 50) step(-1);
  };

  return (
    <section id="momentos" className="scroll-mt-20 overflow-hidden bg-graphite px-4 pb-12 pt-8 text-white md:px-8 md:pb-16 md:pt-12 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-6xl">
        <span className="sr-only" aria-live="polite">
          {announcement}
        </span>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.15em]">
            <Flame className="h-3.5 w-3.5 text-orange-300" aria-hidden="true" />
            Momentos reais dos EJMs
          </span>
          <h2 className="mb-4 font-display text-2xl md:text-4xl">
            Isso é o que <span className="gradient-text-dark">acontece</span> lá
          </h2>
          <p className="mb-6 font-body text-sm text-white/85 sm:text-base">
            Louvor, lágrimas, abraço e muita risada. Escolha o que quer ver e sinta como foi nos EJMs anteriores.
          </p>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={openStories}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full gradient-bg px-6 py-3 font-body text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            Ver momentos em tela cheia
          </motion.button>
        </motion.div>

        {/* Vibe Filters with animated layoutId pill + counts */}
        <div role="group" aria-label="Filtrar fotos por tema" className="mb-8 flex flex-wrap justify-center gap-2">
          {VIBE_FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectFilter(f.id)}
                className={`relative min-h-[44px] rounded-full border px-4 py-2 font-body text-sm font-semibold transition-colors ${
                  active
                    ? "border-transparent text-primary-foreground"
                    : "border-white/25 bg-white/5 text-white hover:bg-white/15"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="vibe-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full gradient-bg"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">
                  {f.label} <span className="opacity-80">({counts[f.id]})</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Ordered CSS Grid (fixes WCAG reading/tab order vs CSS columns) */}
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {visibleItems.map((m, i) => (
            <motion.li
              key={m.id}
              layout="position"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.24) }}
              className="group relative overflow-hidden rounded-2xl bg-black/30"
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`Ampliar foto: ${m.caption}`}
                className="relative block aspect-[4/5] w-full overflow-hidden rounded-2xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <img
                  src={m.src}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                />
                <span className="pointer-events-none absolute inset-x-3 bottom-3 pr-11 font-body text-xs font-medium leading-snug text-white drop-shadow sm:text-sm">
                  {m.caption}
                </span>
              </button>

              <div className="absolute bottom-2 right-2">
                <AnimatePresence>
                  {burstPhotoId === m.id && (
                    <motion.span
                      initial={{ opacity: 1, y: 0, scale: 0.85 }}
                      animate={{ opacity: 0, y: -32, scale: 1.15 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-4 right-0 whitespace-nowrap font-body text-xs font-bold text-orange-300"
                    >
                      +1 Amém
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.86 }}
                  aria-pressed={!!liked[m.id]}
                  aria-label={liked[m.id] ? `Remover amém de ${m.caption}` : `Dar amém em ${m.caption}`}
                  onClick={() => toggleLike(m.id, m.caption)}
                  className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors ${
                    liked[m.id] ? "bg-primary text-primary-foreground" : "bg-black/65 text-white hover:bg-black/80"
                  }`}
                >
                  <Flame className="h-5 w-5" aria-hidden="true" />
                </motion.button>
              </div>
            </motion.li>
          ))}
        </ul>

        {filter === "todos" && !showAll && items.length > INITIAL_VISIBLE && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-white/20 active:scale-95"
            >
              Ver todos os {items.length} momentos
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
          <p className="mb-4 font-display text-lg">Quer viver isso com a sua galera?</p>
          <ShareCrewButton className="border-white text-white hover:bg-white hover:text-graphite" />
        </div>
      </div>

      {/* Lightbox with counter + swipe */}
      <DialogPrimitive.Root open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-black/90" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="fixed inset-0 z-[81] flex flex-col items-center justify-center gap-3 p-4 outline-none"
          >
            <DialogPrimitive.Title className="sr-only">{current?.caption ?? "Foto"}</DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Fechar foto"
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </DialogPrimitive.Close>
            {current && lightbox !== null && (
              <motion.div
                onPanEnd={handleLightboxPanEnd}
                className="flex flex-col items-center gap-3"
              >
                <img
                  src={current.src}
                  alt={current.alt}
                  className="max-h-[72svh] max-w-full rounded-2xl object-contain"
                />
                <p className="text-center font-display text-base text-white">{current.caption}</p>
                <p className="font-body text-xs text-white/75 tabular-nums">
                  {lightbox + 1} / {items.length}
                </p>
              </motion.div>
            )}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Foto anterior"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white active:scale-95"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Próxima foto"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white active:scale-95"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <StoriesViewer open={storiesOpen} onOpenChange={setStoriesOpen} />
    </section>
  );
};

export default MemoriesGallerySection;
