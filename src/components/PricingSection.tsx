import { motion } from "framer-motion";

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
            Garanta sua vaga no EJM 2027 com o melhor preço!
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
          <span className="inline-block gradient-bg text-primary-foreground text-xs font-body font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            1º Lote
          </span>

          <div className="mb-8">
            <span className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground">
              R$ 599<span className="text-xl sm:text-2xl">,99</span>
            </span>
          </div>

          <ul className="font-body text-sm text-muted-foreground space-y-2 mb-8 max-w-md mx-auto text-left">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              Entrada nos 3 dias do encontro
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              Todas as 9 refeições inclusas
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              Hospedagem em alojamento compartilhado
            </li>
          </ul>

          <a
            href="https://eisme.com.br/evento/ejm2027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block gradient-bg text-primary-foreground font-display text-sm md:text-base px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Garantir meu Passaporte
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
