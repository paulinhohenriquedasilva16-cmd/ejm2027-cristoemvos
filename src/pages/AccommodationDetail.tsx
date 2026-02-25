import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Bed, Bath, Wifi } from "lucide-react";
import { accommodations } from "@/components/AccommodationsSection";

const extraImages: Record<string, string[]> = {
  flat: [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
  ],
  prata: [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=500&fit=crop",
  ],
  hotel: [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&h=500&fit=crop",
  ],
  platina: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=500&fit=crop",
  ],
  ouro: [
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560185008-b033106af5c8?w=800&h=500&fit=crop",
  ],
  alojamentos: [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=800&h=500&fit=crop",
  ],
};

const features = [
  { icon: Bed, label: "Camas confortáveis" },
  { icon: Bath, label: "Banheiro privativo/compartilhado" },
  { icon: Wifi, label: "Wi-Fi disponível" },
  { icon: Users, label: "Capacidade variável" },
];

const AccommodationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const accommodation = accommodations.find((a) => a.slug === slug);
  const images = slug ? extraImages[slug] || [] : [];

  if (!accommodation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-foreground mb-4">Acomodação não encontrada</h1>
          <Link to="/" className="gradient-text font-medium">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/#acomodacoes"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-sm">Voltar às acomodações</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-2xl md:text-4xl text-foreground mb-4">
              {accommodation.name}
            </h1>
            <p className="font-body text-muted-foreground text-lg mb-8 max-w-2xl">
              {accommodation.desc}
            </p>
          </motion.div>

          {/* Image gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="md:row-span-2 rounded-2xl overflow-hidden"
            >
              <img
                src={images[0]}
                alt={`${accommodation.name} - foto principal`}
                className="w-full h-full object-cover min-h-[300px]"
              />
            </motion.div>
            {images.slice(1).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="rounded-2xl overflow-hidden"
              >
                <img
                  src={img}
                  alt={`${accommodation.name} - foto ${i + 2}`}
                  className="w-full h-full object-cover min-h-[200px]"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="font-display text-lg md:text-xl text-foreground mb-6">
              O que oferece
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-xl bg-muted p-4"
                >
                  <f.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-body text-sm text-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl bg-muted p-6 md:p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <h2 className="font-display text-lg md:text-xl text-foreground mb-4">
              Informações Importantes
            </h2>
            <ul className="space-y-3 font-body text-muted-foreground text-sm leading-relaxed">
              <li>• Check-in a partir das 14h do dia 15 de Janeiro de 2027</li>
              <li>• Check-out até as 12h do dia 17 de Janeiro de 2027</li>
              <li>• Roupa de cama e banho incluídas</li>
              <li>• Consulte a organização para valores adicionais desta categoria</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetail;
