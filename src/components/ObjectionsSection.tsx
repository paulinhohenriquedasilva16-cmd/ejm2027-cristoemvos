import { motion } from "framer-motion";
import { Hotel, Info, UtensilsCrossed } from "lucide-react";

const ObjectionsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-4">
            Tudo <span className="gradient-text">Pensado</span> para Você
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Queremos que sua única preocupação seja estar presente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Hospedagem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-muted p-6 md:p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5">
              <Hotel className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-3">Hospedagem Inclusa</h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
              O valor de <strong className="text-foreground">R$ 599,99</strong> já inclui alojamentos 
              compartilhados sem custo adicional. Você não precisa se preocupar com onde ficar.
            </p>
            <div className="flex items-start gap-2 rounded-lg bg-background p-3">
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="font-body text-xs text-muted-foreground">
                Quartos privativos estão disponíveis mediante custo adicional. 
                Consulte a organização para mais detalhes.
              </p>
            </div>
          </motion.div>

          {/* Refeições */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-muted p-6 md:p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5">
              <UtensilsCrossed className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-3">9 Refeições Inclusas</h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
              Todas as refeições dos 3 dias já estão inclusas no seu Passaporte: 
              <strong className="text-foreground"> café da manhã, almoço, café da tarde e jantar</strong>. 
              Você não gasta nada a mais com alimentação.
            </p>
            <div className="flex items-start gap-2 rounded-lg bg-background p-3">
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="font-body text-xs text-muted-foreground">
                São 4 refeições por dia completas para que você aproveite 
                cada momento sem preocupação.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ObjectionsSection;
