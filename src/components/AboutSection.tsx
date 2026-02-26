import { motion } from "framer-motion";
import { Flame, BookOpen, Users, Play } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-6">
            Sobre o <span className="gradient-text">EJM</span>
          </h2>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            O EJM é mais do que um encontro — é um altar levantado para despertar a juventude. 
            O evento reúne jovens do mundo todo em uma 
            só fé, fundamentados na mensagem do Profeta William Marrion Branham.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: Flame,
              title: "Avivamento",
              description:
                "Um fogo que queima nos corações. Dias de culto intenso, adoração profunda e presença do Espírito Santo.",
            },
            {
              icon: BookOpen,
              title: "A Mensagem",
              description:
                "Fundamentados na doutrina restaurada pelo Profeta William Marrion Branham para esta geração.",
            },
            {
              icon: Users,
              title: "Comunhão",
              description:
                "Esta edição acontece em São Paulo sob a organização do Pr. Pedro Vitorino e da Igreja Cristo em Vós.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl bg-muted p-6 md:p-8 text-center hover:shadow-lg transition-shadow"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg text-foreground mb-3">{item.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Seção de vídeo - EJMs anteriores */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 md:mt-16"
        >
          <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden border-2 border-primary/20 bg-muted/50 p-3 md:p-4">
            <div className="absolute -top-px -left-px -right-px h-1 rounded-t-2xl gradient-bg" />
            <div className="flex items-center gap-2 mb-3">
              <Play className="w-4 h-4 text-primary" />
              <h3 className="font-display text-sm md:text-base text-foreground">
                Reviva os EJMs Anteriores
              </h3>
            </div>
            <p className="font-body text-muted-foreground text-xs md:text-sm mb-3 leading-relaxed">
              Veja como Deus se fez presente nas edições passadas e como Ele se fará presente em 2027!
            </p>
            <div className="aspect-video rounded-xl overflow-hidden bg-muted">
              <iframe
                src="https://www.youtube.com/embed/kQ2O8YTGH24"
                title="EJM's 2025 e 2026"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
