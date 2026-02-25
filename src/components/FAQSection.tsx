import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Onde será realizado o evento?",
    answer:
      "O EJM 2027 acontecerá na Estância Árvore da Vida, um local preparado para receber grandes eventos cristãos, com estrutura completa, conforto e ambiente espiritual ideal.",
  },
  {
    question: "Quando acontece o EJM 2027?",
    answer:
      "Nos dias 15, 16 e 17 de janeiro de 2027. Serão 3 dias intensos de transformação, comunhão e presença de Deus.",
  },
  {
    question: "Qual o valor do ingresso?",
    answer:
      "O valor do primeiro lote está por R$ 599,99.\n\n⚠️ Importante: os lotes são limitados e o valor tende a subir nas próximas fases.",
  },
  {
    question: "Crianças pagam ingresso?",
    answer:
      "👶 Crianças de 0 a 4 anos: entrada gratuita (não pagam).\n\n👧 Crianças de 5 a 10 anos: pagam 60% do valor do pacote.\n\n🧑 A partir de 11 anos: valor normal do ingresso.",
  },
  {
    question: "O ingresso inclui hospedagem?",
    answer:
      "A hospedagem pode variar conforme o modelo de inscrição. Recomendamos verificar no momento da compra ou nas informações oficiais do evento. O local possui estrutura para acomodação, garantindo conforto e segurança.",
  },
  {
    question: "Como funciona o translado do aeroporto?",
    answer:
      "Estamos organizando a logística de translado do aeroporto até o local do evento. Mais próximo do evento, serão disponibilizadas orientações detalhadas com pontos estratégicos e horários definidos para facilitar a chegada. Aguarde as instruções oficiais após sua inscrição.",
  },
  {
    question: "Posso ir com meu próprio transporte?",
    answer:
      "Sim! Você pode ir com veículo próprio. A Estância Árvore da Vida possui acesso facilitado e estrutura para receber participantes.",
  },
  {
    question: "O evento inclui alimentação?",
    answer:
      "A alimentação pode estar inclusa dependendo do pacote. Caso não esteja, o local conta com estrutura adequada para refeições.",
  },
  {
    question: "Quem pode participar?",
    answer:
      "O evento é voltado para jovens da mensagem, mas qualquer pessoa que deseje viver essa experiência espiritual é bem-vinda.",
  },
  {
    question: "O que esperar do EJM 2027?",
    answer:
      "Momentos intensos de presença de Deus, comunhão com jovens de diversas regiões, louvores, ministrações e experiências espirituais marcantes. Um ambiente que pode transformar sua vida.",
  },
  {
    question: "E se eu estiver em dúvida se vale a pena?",
    answer:
      "Se você sente que precisa de algo novo, de direção, de renovação espiritual… esse evento é pra você. Muitos chegam com dúvidas… e saem com a vida transformada.",
  },
  {
    question: "Como faço para garantir minha vaga?",
    answer:
      "Basta realizar sua inscrição pelo site oficial. As vagas são limitadas e os lotes podem esgotar rapidamente. Não deixe pra depois — talvez você pague mais caro.",
  },
];

const FAQSection = () => {
  return (
    <section className="bg-graphite section-padding">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
            Tire suas dúvidas
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-primary-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="font-body text-sm text-primary-foreground/60">
            Tudo o que você precisa saber sobre o EJM 2027
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card-dark px-4 sm:px-6 border-white/10 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="font-body text-sm md:text-base text-primary-foreground hover:text-primary transition-colors py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-primary-foreground/70 leading-relaxed pb-5 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://eisme.com.br/evento/ejm2027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block gradient-bg text-primary-foreground font-display text-xs md:text-sm px-8 py-3 rounded-full hover:scale-105 transition-transform"
          >
            GARANTA SUA VAGA AGORA
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
