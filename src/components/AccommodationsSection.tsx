import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const alojamento = {
  slug: "alojamentos",
  name: "Alojamentos",
  desc: "Opção coletiva inclusa na inscrição, com estrutura organizada e ambiente comunitário.",
  image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
};

const AccommodationsSection = () => {
  return (
    <section id="acomodacoes" className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-4">
            Nosso <span className="gradient-text">Alojamento</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Acomodação coletiva inclusa na sua inscrição.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group rounded-2xl overflow-hidden bg-muted max-w-2xl mx-auto"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="aspect-[3/2] overflow-hidden">
            <img
              src={alojamento.image}
              alt={alojamento.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-5 text-center">
            <h3 className="font-display text-sm md:text-base text-foreground mb-2">
              {alojamento.name}
            </h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              {alojamento.desc}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-center rounded-2xl bg-muted p-6 md:p-8 max-w-2xl mx-auto"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mb-5">
            Caso queira ficar em um <strong className="text-foreground">quarto privativo com sua família</strong>, consulte os quartos e valores de upgrade no checkout, ou entre em contato com o nosso suporte.
          </p>
          <a
            href="https://wa.me/5515997624048?text=Queria%20saber%20mais%20sobre%20as%20acomoda%C3%A7%C3%B5es%20em%20fam%C3%ADlia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gradient-bg text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Falar com o suporte
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export { alojamento };
export default AccommodationsSection;
