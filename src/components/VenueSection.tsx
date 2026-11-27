import { motion } from "framer-motion";
import { MapPin, TreePine, Waves } from "lucide-react";
import venueBg from "@/assets/venue-bg.jpg";
import YouTubeFacade from "@/components/YouTubeFacade";
import { trackEvent } from "@/lib/analytics";

const VenueSection = () => {
  return (
    <section id="local" className="relative scroll-mt-20 overflow-hidden">
      <img
        src={venueBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-graphite/85" />

      <div className="relative z-10 section-padding">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center md:mb-12"
          >
            <h2 className="mb-4 font-display text-2xl text-white md:text-4xl">
              <span className="gradient-text-dark">Localização</span>: Estância Árvore da Vida
            </h2>
            <div className="mb-5 flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-orange-400" aria-hidden="true" />
              <span className="font-body text-base font-medium text-white/90 sm:text-lg">
                Sumaré-SP · Fácil acesso para caravanas e estacionamento grátis
              </span>
            </div>
            <p className="mx-auto max-w-2xl font-body text-sm leading-relaxed text-white/80 sm:text-base">
              Um refúgio cercado por natureza exuberante, lagos e jardins. Um espaço pensado
              para que você tenha uma experiência profunda com Deus, longe da rotina e imerso em paz.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-10 md:mb-12"
          >
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-lg">
              <YouTubeFacade
                videoId="Og0XUfFbGuI"
                title="Conheça a Estância Árvore da Vida"
              />
            </div>
          </motion.div>

          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mb-12 md:gap-6">
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
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card p-6 text-center"
              >
                <item.icon className="mx-auto mb-3 h-8 w-8 text-orange-400" aria-hidden="true" />
                <h3 className="mb-2 font-body text-sm font-bold text-white sm:text-base">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="mb-4 text-center font-display text-lg text-white md:text-xl">
              Como Chegar
            </h3>
            <div className="mx-auto aspect-video max-w-3xl overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=Estr.+Est%C3%A2ncia+%C3%81rvore+da+Vida,+01+-+Est%C3%A2ncia+%C3%81rvore+da+Vida,+Sumar%C3%A9+-+SP,+13176-050&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Mapa - Estância Árvore da Vida, Sumaré - SP"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Estr.+Est%C3%A2ncia+%C3%81rvore+da+Vida,+01+-+Est%C3%A2ncia+%C3%81rvore+da+Vida,+Sumar%C3%A9+-+SP,+13176-050"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("map_directions_click", {
                    destination: "Estância Árvore da Vida, Sumaré - SP",
                  })
                }
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 font-body text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <MapPin className="h-4 w-4 text-orange-300" aria-hidden="true" />
                Abrir rotas no Google Maps
              </a>
              <a
                href="#inscricao"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full gradient-bg px-6 py-2.5 font-body text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95"
              >
                Ver Ingressos e Valores
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
