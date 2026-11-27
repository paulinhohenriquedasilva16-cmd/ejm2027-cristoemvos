import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Play } from "lucide-react";
import selfie from "@/assets/gallery/thumbs/selfie-galera.jpg";
import adoracao from "@/assets/gallery/thumbs/adoracao-luz-laranja.jpg";
import abraco from "@/assets/gallery/thumbs/abraco-laranja.jpg";
import { requestOpenStories } from "@/lib/storiesBus";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo-ejm-darkbg.png";

const EVENT_TARGET_MS = new Date("2027-01-15T12:00:00-03:00").getTime();

function computeTimeLeft() {
  const distance = Math.max(0, EVENT_TARGET_MS - Date.now());
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(computeTimeLeft);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const tick = () => {
      if (!document.hidden) setTimeLeft(computeTimeLeft());
    };
    const interval = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  const units = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label="Contagem regressiva para 15 de janeiro de 2027"
      className="flex gap-2 sm:gap-3"
    >
      {units.map((unit) => {
        const formatted = String(unit.value).padStart(2, "0");
        return (
          <div
            key={unit.label}
            className="min-w-[62px] rounded-2xl border border-white/15 bg-black/40 px-3 py-2 text-center shadow-lg sm:min-w-[74px] sm:px-4 sm:py-2.5"
          >
            <div className="relative h-7 overflow-hidden sm:h-8">
              {reduceMotion ? (
                <span className="block font-display text-lg tabular-nums text-white sm:text-2xl">
                  {formatted}
                </span>
              ) : (
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={formatted}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="block font-display text-lg tabular-nums text-white sm:text-2xl"
                  >
                    {formatted}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
            <span className="mt-0.5 block font-body text-[10px] font-semibold uppercase tracking-widest text-white/75">
              {unit.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20 pb-8 md:pt-20 md:pb-10"
    >
      {/* LCP Background Image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="animate-kenburns absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Deep Cinematic Overlay so the background never washes out the title */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, hsla(220, 16%, 7%, 0.72) 0%, hsla(220, 16%, 6%, 0.86) 62%, hsla(220, 16%, 5%, 0.96) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-45"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsla(24, 95%, 48%, 0.55) 0%, transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-8">
        {/* 1. Top Date & Batch Pill */}
        <div className="mb-5 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-white/15 bg-black/55 px-4 py-1.5 font-body text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg sm:text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
            15 a 17 Jan 2027
          </span>
          <span aria-hidden="true" className="text-white/40">•</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
            Sumaré-SP
          </span>
          <span aria-hidden="true" className="text-white/40">•</span>
          <span className="inline-flex items-center gap-1.5 text-orange-300">
            <span aria-hidden="true" className="live-dot h-2 w-2 rounded-full bg-orange-400" />
            1º Lote Aberto
          </span>
        </div>

        {/* 2. Official Logo + High-Contrast Title Lockup */}
        <div className="mx-auto mb-5 inline-flex max-w-full items-center justify-center gap-3.5 rounded-3xl border border-white/10 bg-black/35 px-4 py-3.5 shadow-2xl sm:gap-5 sm:px-6 sm:py-4 md:gap-6">
          <img
            src={logo}
            alt="Logotipo oficial do EJM 2027 - Enchei-vos do Espírito Santo"
            width={84}
            height={84}
            className="h-14 w-14 shrink-0 object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
          <span
            aria-hidden="true"
            className="h-12 w-0.5 shrink-0 rounded-full bg-gradient-to-b from-transparent via-orange-400/80 to-transparent sm:h-16 md:h-20"
          />
          <h1 className="text-left font-display leading-[1.15] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
            <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm tracking-wider text-white sm:text-lg md:text-xl">
              <span>EJM 2027</span>
              <span className="rounded-full border border-orange-400/35 bg-orange-500/15 px-2.5 py-0.5 font-body text-[11px] font-semibold italic tracking-normal text-orange-200">
                Efésios 5:18
              </span>
            </span>
            <span className="mt-1 block text-lg text-white sm:text-2xl md:text-3xl lg:text-4xl">
              <span className="whitespace-nowrap gradient-text-dark">ENCHEI-VOS</span>{" "}
              <span className="text-white">DO ESPÍRITO SANTO</span>
            </span>
          </h1>
        </div>

        {/* 3. Single Punchy Summary Line + 2 Primary Actions */}
        <p className="mx-auto mb-6 max-w-2xl font-body text-sm text-white/90 sm:text-base">
          Estância Árvore da Vida · <strong className="font-semibold text-white">9 refeições já pagas</strong> · A partir de{" "}
          <strong className="font-semibold text-white">3x de R$ 160 sem juros</strong>
        </p>

        <div className="mb-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#inscricao"
            className="group inline-flex min-h-[50px] w-full max-w-xs items-center justify-center gap-2 rounded-full gradient-bg px-7 py-3 font-body text-sm font-bold text-primary-foreground shadow-[0_12px_36px_-8px_hsla(22,95%,48%,0.65)] transition-[transform,opacity] hover:opacity-95 active:scale-[0.98] sm:w-auto sm:text-base"
          >
            <span>Garantir Minha Vaga</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              document.getElementById("momentos")?.scrollIntoView({ behavior: "smooth" });
              requestOpenStories();
            }}
            className="inline-flex min-h-[50px] w-full max-w-xs items-center justify-center gap-3 rounded-full border border-white/25 bg-black/40 py-1.5 pl-2 pr-5 font-body text-sm font-semibold text-white transition-colors hover:border-orange-300/60 hover:bg-black/60 sm:w-auto"
          >
            <span className="flex -space-x-2 rounded-full p-0.5 animate-pulse-glow" aria-hidden="true">
              {[selfie, adoracao, abraco].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-orange-300 object-cover"
                />
              ))}
            </span>
            <Play className="h-4 w-4 fill-orange-300 text-orange-300" aria-hidden="true" />
            <span>Ver momentos do EJM</span>
          </motion.button>
        </div>

        {/* 4. Compact Countdown */}
        <div className="flex justify-center">
          <CountdownTimer />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
