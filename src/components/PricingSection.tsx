import { motion } from "framer-motion";
import { CreditCard, QrCode, FileText, ShieldCheck } from "lucide-react";

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
            Garanta sua vaga no 1º Lote com o melhor preço.
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

          <div className="mb-2">
            <span className="font-body text-muted-foreground text-sm">Por apenas</span>
          </div>
          <div className="mb-8">
            <span className="font-display text-4xl sm:text-5xl md:text-7xl gradient-text">R$ 599</span>
            <span className="font-display text-xl sm:text-2xl md:text-3xl gradient-text">,99</span>
          </div>

          <p className="font-body text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Inclui alimentação completa, alojamento e acesso a toda a programação do evento.
          </p>

          <a
            href="https://eisme.com.br/evento/ejm2027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block gradient-bg text-primary-foreground font-display text-sm md:text-base px-10 py-4 rounded-full hover:scale-105 transition-transform animate-pulse-glow mb-8"
          >
            Inscrever-se Agora
          </a>

          {/* Payment methods */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[
              { icon: QrCode, label: "Pix" },
              { icon: FileText, label: "Boleto" },
              { icon: CreditCard, label: "Cartão" },
            ].map((method) => (
              <div key={method.label} className="flex items-center gap-2 text-muted-foreground">
                <method.icon className="w-5 h-5" />
                <span className="font-body text-sm">{method.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground/60">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-body text-xs">Pagamento 100% seguro</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
