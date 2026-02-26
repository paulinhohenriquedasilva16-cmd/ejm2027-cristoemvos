import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Bed, Droplets, Wifi, Users, ShieldCheck, Lamp, X, Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import jundiaiImg1 from "@/assets/alojamento-jundiai-1.jpg";
import jundiaiImg2 from "@/assets/alojamento-jundiai-2.jpg";
import jundiaiImg3 from "@/assets/alojamento-jundiai-3.jpg";
import jundiaiImg4 from "@/assets/alojamento-jundiai-4.jpg";
import jundiaiImg5 from "@/assets/alojamento-jundiai-5.jpg";
import jundiaiImg6 from "@/assets/alojamento-jundiai-6.jpg";
import jundiaiImg7 from "@/assets/alojamento-jundiai-7.jpg";
import blocoAImg1 from "@/assets/alojamento-blocoA-1.jpg";
import blocoAImg2 from "@/assets/alojamento-blocoA-2.jpg";
import alojJImg1 from "@/assets/alojamento-j-1.jpg";
import alojJImg2 from "@/assets/alojamento-j-2.jpg";
import alojJImg3 from "@/assets/alojamento-j-3.jpg";
import alojJImg4 from "@/assets/alojamento-j-4.jpg";

interface Accommodation {
  name: string;
  tag: "Inclusa no ingresso" | "Upgrade";
  images: string[];
  description: string;
  amenities: { icon: typeof Bed; label: string }[];
}

const included: Accommodation[] = [
  {
    name: "Alojamento Jundiaí",
    tag: "Inclusa no ingresso",
    images: [jundiaiImg1, jundiaiImg2, jundiaiImg3, jundiaiImg4, jundiaiImg5, jundiaiImg6, jundiaiImg7],
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
    images: [blocoAImg1, blocoAImg2],
    description: "Alojamento coletivo no Bloco A com infraestrutura completa.",
    amenities: [
      { icon: Bed, label: "Camas confortáveis" },
      { icon: Droplets, label: "Banheiros compartilhados" },
      { icon: Users, label: "Ambiente comunitário" },
      { icon: ShieldCheck, label: "Segurança 24h" },
    ],
  },
  {
    name: "Alojamento J",
    tag: "Inclusa no ingresso",
    images: [alojJImg1, alojJImg2, alojJImg3, alojJImg4],
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
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop"],
    description: "Alojamento coletivo no Bloco C com fácil acesso ao evento.",
    amenities: [
      { icon: Bed, label: "Camas confortáveis" },
      { icon: Droplets, label: "Banheiros compartilhados" },
      { icon: Users, label: "Ambiente comunitário" },
      { icon: ShieldCheck, label: "Segurança 24h" },
    ],
  },
];

const upgrades: Accommodation[] = [
  {
    name: "Apartamento Ouro – CH.A",
    tag: "Upgrade",
    images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=500&fit=crop"],
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
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=500&fit=crop"],
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
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop"],
    description: "Hospedagem premium no Hotel Maple Village com serviço completo.",
    amenities: [
      { icon: Bed, label: "Cama king size" },
      { icon: Droplets, label: "Banheiro privativo" },
      { icon: Wifi, label: "Wi-Fi de alta velocidade" },
      { icon: Star, label: "Café da manhã incluso" },
    ],
  },
];

/* ── Modal image carousel ── */
const ModalCarousel = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, images.length]);

  if (images.length === 1) {
    return (
      <div className="aspect-video overflow-hidden">
        <img src={images[0]} alt="" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      {/* Arrows */}
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors" aria-label="Anterior">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors" aria-label="Próximo">
        <ChevronRight className="w-4 h-4" />
      </button>
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/50"}`}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Horizontal scroll carousel ── */
const AccCarousel = ({
  items,
  onSelect,
}: {
  items: Accommodation[];
  onSelect: (acc: Accommodation) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      <button
        onClick={() => scroll(-1)}
        className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-md"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-4 h-4 text-foreground" />
      </button>
      <button
        onClick={() => scroll(1)}
        className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-md"
        aria-label="Próximo"
      >
        <ChevronRight className="w-4 h-4 text-foreground" />
      </button>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((acc) => (
          <button
            key={acc.name}
            onClick={() => onSelect(acc)}
            className="group relative flex-none w-52 sm:w-60 rounded-2xl overflow-hidden aspect-[3/4] text-left snap-start focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <img
              src={acc.images[0]}
              alt={acc.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <span
              className={`absolute top-2.5 left-2.5 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full ${
                acc.tag === "Upgrade"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {acc.tag}
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <h3 className="font-display text-xs sm:text-sm text-white leading-tight">
                {acc.name}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Main section ── */
const AccommodationsSection = () => {
  const [selected, setSelected] = useState<Accommodation | null>(null);

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
            Nossas <span className="gradient-text">Acomodações</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Clique em uma acomodação para ver os detalhes.
          </p>
        </motion.div>

        {/* Included carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="font-display text-sm md:text-base text-foreground mb-4">
            Inclusas no ingresso
          </h3>
          <AccCarousel items={included} onSelect={setSelected} />
        </motion.div>

        {/* Upgrade carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h3 className="font-display text-sm md:text-base text-foreground mb-4">
            Upgrades
          </h3>
          <AccCarousel items={upgrades} onSelect={setSelected} />
        </motion.div>

        {/* Detail modal */}
        <AnimatePresence>
          {selected && (
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
                className="relative bg-card rounded-2xl overflow-hidden max-w-md w-full max-h-[90vh] overflow-y-auto"
                style={{ boxShadow: "var(--shadow-warm)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>

                <ModalCarousel images={selected.images} />

                <div className="p-5 md:p-6">
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${
                      selected.tag === "Upgrade"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {selected.tag}
                  </span>
                  <h3 className="font-display text-base md:text-lg text-foreground mb-2">
                    {selected.name}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mb-5">
                    {selected.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {selected.amenities.map((a) => (
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
            Ficou em dúvida sobre o <strong className="text-foreground">upgrade de acomodação</strong>? Consulte os valores no checkout ou fale com o nosso suporte.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://eisme.com.br/evento/ejm2027"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gradient-bg text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Ver no checkout
            </a>
            <a
              href="https://wa.me/5515997624048?text=Queria%20saber%20mais%20sobre%20as%20acomoda%C3%A7%C3%B5es%20em%20fam%C3%ADlia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-6 py-3 rounded-full hover:bg-primary/10 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Falar com o suporte
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationsSection;
