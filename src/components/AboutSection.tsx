import { motion } from "framer-motion";
import { Flame, BookOpen, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-6">
            Sobre o <span className="gradient-text">Evento</span>
          </h2>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            O EJM é mais do que um encontro — é um altar levantado para despertar a juventude. 
            Idealizado pelo Pr. Alberi, o evento reúne jovens do mundo todo em uma 
            só fé, fundamentados na mensagem do Profeta William Marrion Branham.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
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
                "Idealizado pelo Pr. Alberi, esta edição acontece em São Paulo sob a organização do Pr. Pedro Vitorino e da Igreja Cristo em Vós.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl bg-muted p-8 text-center hover:shadow-lg transition-shadow"
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
      </div>
    </section>
  );
};

export default AboutSection;
