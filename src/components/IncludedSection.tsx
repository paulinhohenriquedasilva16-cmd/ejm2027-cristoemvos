import { motion } from "framer-motion";
import { UtensilsCrossed, BedDouble, Calendar, Music } from "lucide-react";

const IncludedSection = () => {
  const items = [
    { icon: UtensilsCrossed, title: "Alimentação Completa", desc: "4 refeições por dia durante todo o evento" },
    { icon: BedDouble, title: "Alojamento", desc: "Hospedagem inclusa no valor da inscrição" },
    { icon: Calendar, title: "Programação Inteira", desc: "Acesso a todos os cultos e atividades" },
    { icon: Music, title: "Louvor & Adoração", desc: "Momentos de adoração com músicos consagrados" },
  ];

  return (
    <section className="section-padding bg-graphite">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary-foreground mb-4">
            O que está <span className="gradient-text">Incluso</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-4 sm:p-6 text-center"
            >
              <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xs md:text-sm text-primary-foreground mb-2">{item.title}</h3>
              <p className="font-body text-primary-foreground/60 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludedSection;
