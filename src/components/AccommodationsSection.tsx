import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const accommodations = [
  {
    slug: "flat",
    name: "Padrão Flat",
    desc: "Acomodação compacta e funcional, ideal para quem busca praticidade com conforto essencial.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
  },
  {
    slug: "prata",
    name: "Padrão Prata",
    desc: "Quartos confortáveis com boa estrutura, perfeitos para uma estadia agradável durante o evento.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
  },
  {
    slug: "hotel",
    name: "Padrão Hotel",
    desc: "Experiência hoteleira completa com comodidades que garantem descanso e bem-estar.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
  },
  {
    slug: "platina",
    name: "Padrão Platina",
    desc: "Acomodação premium com acabamento refinado e espaço amplo para máximo conforto.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
  },
  {
    slug: "ouro",
    name: "Padrão Ouro",
    desc: "Suíte de alto padrão com ambiente sofisticado e amenidades exclusivas.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop",
  },
  {
    slug: "alojamentos",
    name: "Alojamentos",
    desc: "Opção coletiva inclusa na inscrição, com estrutura organizada e ambiente comunitário.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
  },
];

const AccommodationsSection = () => {
  return (
    <section id="acomodacoes" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-4">
            Nossas <span className="gradient-text">Acomodações</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Escolha o tipo de hospedagem que melhor combina com você.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodations.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-muted"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-sm md:text-base text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
                <Link
                  to={`/acomodacao/${item.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium gradient-text hover:opacity-80 transition-opacity"
                >
                  Ver mais detalhes
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { accommodations };
export default AccommodationsSection;
