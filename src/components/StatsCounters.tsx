import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const STATS = [
  { value: 3, label: "Dias de imersão" },
  { value: 9, label: "Refeições já pagas" },
  { value: 3, label: "Cultos especiais" },
  { value: 1, label: "Louvorzão/Ranchão" },
];

const Counter = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setN(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
};

const StatsCounters = () => (
  <section
    aria-label="O EJM em números"
    className="border-b border-white/10 bg-graphite px-4 py-8 text-white md:px-8 md:py-10"
  >
    <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center md:grid-cols-4">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className="flex flex-col"
        >
          <dt className="order-2 mt-1 font-body text-xs uppercase tracking-wider text-white/85">
            {s.label}
          </dt>
          <dd className="gradient-text-dark font-display text-4xl md:text-5xl">
            <Counter to={s.value} />
          </dd>
        </motion.div>
      ))}
    </dl>
  </section>
);

export default StatsCounters;
