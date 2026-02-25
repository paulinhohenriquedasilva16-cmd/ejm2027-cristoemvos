import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const LoteBanner = () => {
  const targetDate = new Date("2026-04-11T23:59:59").getTime(); // ~45 days from now

  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setDaysLeft(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHoursLeft(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutesLeft(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      }
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 gradient-bg py-2 px-4 text-center">
      <div className="flex items-center justify-center gap-2 text-primary-foreground font-body text-xs sm:text-sm">
        <Clock className="w-4 h-4 animate-pulse" />
        <span className="font-semibold">1º LOTE</span>
        <span className="hidden sm:inline">—</span>
        <span>
          Encerra em{" "}
          <strong>{daysLeft} dias</strong>, {hoursLeft}h {minutesLeft}min
        </span>
        <a
          href="https://eisme.com.br/evento/ejm2027"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors px-3 py-0.5 rounded-full text-xs font-semibold"
        >
          Garanta já
        </a>
      </div>
    </div>
  );
};

export default LoteBanner;
