import { motion } from "framer-motion";
import { MapPin, TreePine, Waves } from "lucide-react";
import venueBg from "@/assets/venue-bg.jpg";

const VenueSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${venueBg})` }}
      />
      <div className="absolute inset-0 bg-graphite/80" />

      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-4xl text-primary-foreground mb-4">
              <span className="gradient-text">Localização</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-body text-primary-foreground/80 text-lg">
                Estância Árvore da Vida
              </span>
            </div>
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Um refúgio cercado por natureza exuberante, lagos e jardins. Um espaço pensado 
              para que você tenha uma experiência profunda com Deus, longe da rotina e imerso em paz.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 md:mb-12"
          >
            <div className="aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/Og0XUfFbGuI"
                title="Estância Árvore da Vida"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10 md:mb-12"
          >
            <h3 className="font-display text-lg md:text-xl text-primary-foreground text-center mb-4">
              Como Chegar
            </h3>
            <div className="aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=Estr.+Est%C3%A2ncia+%C3%81rvore+da+Vida,+01+-+Est%C3%A2ncia+%C3%81rvore+da+Vida,+Sumar%C3%A9+-+SP,+13176-050&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Mapa - Estância Árvore da Vida"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
            <div className="text-center mt-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Estr.+Est%C3%A2ncia+%C3%81rvore+da+Vida,+01+-+Est%C3%A2ncia+%C3%81rvore+da+Vida,+Sumar%C3%A9+-+SP,+13176-050"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-primary hover:text-primary/80 transition-colors text-sm underline underline-offset-4"
              >
                <MapPin className="w-4 h-4" />
                Abrir no Google Maps
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
            {[
              { icon: TreePine, title: "Natureza", desc: "Áreas verdes, trilhas e muito contato com a criação." },
              { icon: Waves, title: "Tranquilidade", desc: "Lagos e jardins que inspiram reflexão e oração." },
              { icon: MapPin, title: "Infraestrutura", desc: "Espaço completo com auditório, alojamentos e refeitório." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card p-6 text-center"
              >
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display text-sm text-primary-foreground mb-2">{item.title}</h3>
                <p className="font-body text-primary-foreground/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="font-display text-lg md:text-xl text-primary-foreground text-center mb-4">
              Como Chegar
            </h3>
            <div className="aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=Estr.+Est%C3%A2ncia+%C3%81rvore+da+Vida,+01+-+Est%C3%A2ncia+%C3%81rvore+da+Vida,+Sumar%C3%A9+-+SP,+13176-050&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Mapa - Estância Árvore da Vida"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
            <div className="text-center mt-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Estr.+Est%C3%A2ncia+%C3%81rvore+da+Vida,+01+-+Est%C3%A2ncia+%C3%81rvore+da+Vida,+Sumar%C3%A9+-+SP,+13176-050"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-primary hover:text-primary/80 transition-colors text-sm underline underline-offset-4"
              >
                <MapPin className="w-4 h-4" />
                Abrir no Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
