import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo-ejm.png";

const CountdownTimer = () => {
  const targetDate = new Date("2027-01-15T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 md:gap-5">
      {units.map((unit) => (
        <div key={unit.label} className="glass-card px-4 py-3 md:px-6 md:py-4 text-center min-w-[70px] md:min-w-[90px]">
          <span className="block font-display text-2xl md:text-4xl text-primary-foreground">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="block text-xs md:text-sm text-primary-foreground/70 font-body mt-1 uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={logo} alt="EJM Logo" className="w-24 md:w-32 mx-auto mb-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6"
        >
          EJM 2027 –{" "}
          <span className="gradient-text">ENCHEI-VOS DO ESPIRITO SANTO</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-lg md:text-xl text-primary-foreground/80 mb-4 italic max-w-2xl mx-auto"
        >
          "Efésios 5:18"
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-base md:text-lg text-primary-foreground/70 mb-10 max-w-2xl mx-auto"
        >
          O encontro que marcará sua história espiritual.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <a
            href="https://eisme.com.br/evento/ejm2027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block gradient-bg text-primary-foreground font-display text-sm md:text-base px-8 py-4 rounded-full animate-pulse-glow hover:scale-105 transition-transform"
          >
            Garantir minha vaga no 1º Lote
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center"
        >
          <CountdownTimer />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-primary-foreground/50 text-sm mt-4 font-body"
        >
          15 de Janeiro de 2027 · Sumaré, SP
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
