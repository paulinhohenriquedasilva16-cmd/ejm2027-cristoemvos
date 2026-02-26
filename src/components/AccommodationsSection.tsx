import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Bed, Droplets, Wifi, Users, ShieldCheck, Lamp, X, Star } from "lucide-react";

interface Accommodation {
  name: string;
  tag: "Inclusa no ingresso" | "Upgrade";
  image: string;
  description: string;
  amenities: { icon: typeof Bed; label: string }[];
}

const accommodations: Accommodation[] = [
  {
    name: "Alojamento Jundiaí",
    tag: "Inclusa no ingresso",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=500&fit=crop",
    description: "Alojamento coletivo com estrutura organizada e ambiente comunitário.",
    amenities: [
      { icon: Bed, label: "Camas confortáveis" },
      { icon: Droplets, label: "Banheiros compartilhados" },
      { icon: Users, label: "Ambiente comunitário" },
      { icon: ShieldCheck, label: "Segurança 24h" },
    ],
  },
  {
    name: "Alojamento Bloco A",
    tag: "Inclusa no ingresso",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=500&fit=crop",
    description: "Alojamento coletivo no Bloco A com infraestrutura completa.",
    amenities: [
      { icon: Bed, label: "Camas confortáveis" },
      { icon: Droplets, label: "Banheiros compartilhados" },
      { icon: Wifi, label: "Wi-Fi disponível" },
      { icon: ShieldCheck, label: "Segurança 24h" },
    ],
  },
  {
    name: "Alojamento J",
    tag: "Inclusa no ingresso",
    image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800&h=500&fit=crop",
    description: "Alojamento coletivo no Bloco J, próximo às áreas de convivência.",
    amenities: [
      { icon: Bed, label: "Camas confortáveis" },
      { icon: Users, label: "Ambiente comunitário" },
      { icon: Lamp, label: "Iluminação individual" },
      { icon: ShieldCheck, label: "Segurança 24h" },
    ],
  },
  {
    name: "Alojamento Bloco C",
    tag: "Inclusa no ingresso",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
    description: "Alojamento coletivo no Bloco C com fácil acesso ao evento.",
    amenities: [
      { icon: Bed, label: "Camas confortáveis" },
      { icon: Droplets, label: "Banheiros compartilhados" },
      { icon: Wifi, label: "Wi-Fi disponível" },
      { icon: ShieldCheck, label: "Segurança 24h" },
    ],
  },
  {
    name: "Apartamento Ouro – CH.A",
    tag: "Upgrade",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=500&fit=crop",
    description: "Apartamento privativo com conforto superior para você e sua família.",
    amenities: [
      { icon: Bed, label: "Cama de casal" },
      { icon: Droplets, label: "Banheiro privativo" },
      { icon: Wifi, label: "Wi-Fi disponível" },
      { icon: Lamp, label: "Ar-condicionado" },
    ],
  },
  {
    name: "Apartamento Ouro – CH.C",
    tag: "Upgrade",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=500&fit=crop",
    description: "Apartamento privativo no bloco C com estrutura completa.",
    amenities: [
      { icon: Bed, label: "Cama de casal" },
      { icon: Droplets, label: "Banheiro privativo" },
      { icon: Wifi, label: "Wi-Fi disponível" },
      { icon: Lamp, label: "Ar-condicionado" },
    ],
  },
  {
    name: "Hotel Maple Village",
    tag: "Upgrade",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
    description: "Hospedagem premium no Hotel Maple Village com serviço completo.",
    amenities: [
      { icon: Bed, label: "Cama king size" },
      { icon: Droplets, label: "Banheiro privativo" },
      { icon: Wifi, label: "Wi-Fi de alta velocidade" },
      { icon: Star, label: "Café da manhã incluso" },
    ],
  },
];

const AccommodationsSection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="acomodacoes" className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
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
            Clique em uma acomodação para ver os detalhes.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {accommodations.map((acc, i) => (
            <motion.button
              key={acc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelected(i)}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <img
                src={acc.image}
                alt={acc.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Tag */}
              <span
                className={`absolute top-2.5 left-2.5 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full ${
                  acc.tag === "Upgrade"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {acc.tag}
              </span>
              {/* Name */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <h3 className="font-display text-xs sm:text-sm text-white leading-tight">
                  {acc.name}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail modal */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.3 }}
                className="relative bg-card rounded-2xl overflow-hidden max-w-md w-full"
                style={{ boxShadow: "var(--shadow-warm)" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={accommodations[selected].image}
                    alt={accommodations[selected].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${
                      accommodations[selected].tag === "Upgrade"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {accommodations[selected].tag}
                  </span>
                  <h3 className="font-display text-base md:text-lg text-foreground mb-2">
                    {accommodations[selected].name}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mb-5">
                    {accommodations[selected].description}
                  </p>

                  {/* Amenities */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {accommodations[selected].amenities.map((a) => (
                      <div
                        key={a.label}
                        className="flex items-center gap-2 rounded-xl bg-muted p-2.5"
                      >
                        <a.icon className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-body text-xs text-foreground">{a.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
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

export default AccommodationsSection;
