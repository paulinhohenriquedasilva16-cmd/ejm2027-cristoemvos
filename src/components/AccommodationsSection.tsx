import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Bed, Droplets, Wifi, Users, ShieldCheck, Lamp } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800&h=500&fit=crop",
];

const amenities = [
  { icon: Bed, label: "Camas confortáveis" },
  { icon: Droplets, label: "Banheiros compartilhados" },
  { icon: Wifi, label: "Wi-Fi disponível" },
  { icon: Users, label: "Ambiente comunitário" },
  { icon: ShieldCheck, label: "Segurança 24h" },
  { icon: Lamp, label: "Iluminação individual" },
];

const AccommodationsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, [next]);

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
          className="max-w-lg mx-auto"
        >
          {/* Carousel */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Alojamento - foto ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: i === current ? 1 : 0 }}
                loading="lazy"
              />
            ))}
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-primary-foreground w-5" : "bg-primary-foreground/50"
                  }`}
                  aria-label={`Ir para foto ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            {amenities.map((a) => (
              <div
                key={a.label}
                className="flex items-center gap-2.5 rounded-xl bg-muted p-3"
              >
                <a.icon className="w-4 h-4 text-primary shrink-0" />
                <span className="font-body text-xs sm:text-sm text-foreground">{a.label}</span>
              </div>
            ))}
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

export default AccommodationsSection;
