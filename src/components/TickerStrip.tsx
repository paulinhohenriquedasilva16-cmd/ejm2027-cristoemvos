import { useState } from "react";

const WORDS = [
  "EFÉSIOS 5:18",
  "LOUVORZÃO NO RANCHÃO",
  "9 REFEIÇÕES JÁ PAGAS",
  "15 A 17 JAN",
  "ESTÂNCIA ÁRVORE DA VIDA",
  "GINCANAS E GALERA",
  "COMUNHÃO DE VERDADE",
];

const TickerStrip = () => {
  const [paused, setPaused] = useState(false);

  return (
    <div
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      className="relative w-full max-w-full overflow-hidden gradient-bg py-3 text-primary-foreground"
    >
      <div className={`ticker-track flex w-max whitespace-nowrap ${paused ? "ticker-paused" : ""}`}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {WORDS.map((w) => (
              <span key={`${dup}-${w}`} className="px-5 font-display text-xs tracking-wider sm:text-sm">
                {w}
                <span className="pl-5 opacity-60">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerStrip;
