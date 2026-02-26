import { motion } from "framer-motion";
import { Baby, MessageCircle } from "lucide-react";

const KidsSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-background p-6 md:p-10 text-center"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mx-auto mb-5">
            <Baby className="w-7 h-7 text-primary-foreground" />
          </div>

          <h2 className="font-display text-xl md:text-2xl text-foreground mb-2">
            Bênção para as <span className="gradient-text">Crianças</span>
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
            Traga seus pequenos! Crianças de <strong className="text-foreground">0 a 4 anos não pagam</strong>, e as de{" "}
            <strong className="text-foreground">5 a 10 anos pagam apenas uma taxa reduzida</strong> para cobrir a alimentação e a estadia.
          </p>

          <p className="font-body text-xs md:text-sm text-muted-foreground mb-6">
            Basta chamar a nossa equipe no WhatsApp <strong className="text-foreground">antes de finalizar a compra</strong> para passarmos os detalhes e liberarmos o seu cupom de desconto!
          </p>

          <a
            href="https://wa.me/5515997624048?text=Ol%C3%A1!%20Gostaria%20de%20saber%20sobre%20o%20ingresso%20infantil%20do%20EJM%202027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gradient-bg text-primary-foreground font-display text-xs md:text-sm px-6 py-3 rounded-full hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
            FALAR NO WHATSAPP
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default KidsSection;
