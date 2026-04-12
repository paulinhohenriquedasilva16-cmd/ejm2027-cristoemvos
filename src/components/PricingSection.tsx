import { motion } from "framer-motion";
import { Bell } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="inscricao" className="section-padding bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-4">
            <span className="gradient-text">Inscrição</span>
          </h2>
          <p className="font-body text-muted-foreground mb-10">
            O 1º Lote foi encerrado. Em breve abriremos o 2º Lote!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border-2 border-primary/30 bg-muted p-6 sm:p-8 md:p-12 text-center"
          style={{ boxShadow: "var(--shadow-warm)" }}
        >
          <span className="inline-block bg-muted-foreground/20 text-muted-foreground text-xs font-body font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            1º Lote — Encerrado
          </span>

          <div className="mb-2">
            <span className="font-body text-muted-foreground text-sm line-through">R$ 599,99</span>
          </div>

          <div className="mb-8">
            <span className="font-display text-3xl sm:text-4xl md:text-5xl text-muted-foreground/50">
              2º Lote em breve
            </span>
          </div>

          <p className="font-body text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Estamos preparando o 2º Lote. Fique atento às nossas redes sociais para não perder a abertura das novas inscrições!
          </p>

          <div className="inline-flex items-center gap-2 gradient-bg text-primary-foreground font-display text-sm md:text-base px-10 py-4 rounded-full opacity-80">
            <Bell className="w-5 h-5 animate-pulse" />
            Aguarde o 2º Lote
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
