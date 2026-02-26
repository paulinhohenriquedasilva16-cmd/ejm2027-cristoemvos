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
      "O EJM 2027 acontecerá na Estância Árvore da Vida, um local preparado com muito carinho e dedicação para que você receba o melhor de Deus com todo o conforto.",
  },
  {
    question: "Quando acontece o EJM 2027?",
    answer:
      "Nos dias 15, 16 e 17 de janeiro de 2027. Serão 3 dias de muitas bênçãos onde a sua única preocupação será ouvir a voz de Deus e viver momentos inesquecíveis na presença Dele.",
  },
  {
    question: "O que o meu Passaporte (R$ 599,99) inclui?",
    answer:
      "Transparência total! O valor de R$ 599,99 é o seu pacote padrão completo. Ele inclui:\n\n✅ Entrada nos 3 dias do encontro\n✅ Todas as 9 refeições\n✅ Sua cama no alojamento compartilhado\n\nVocê não paga absolutamente nada a mais por isso.\n\n⚠️ As vagas nas camas são limitadas. Quem compra primeiro, escolhe o quarto primeiro!",
  },
  {
    question: "Crianças pagam ingresso?",
    answer:
      "👶 Crianças de 0 a 4 anos: não pagam!\n\n👧 Crianças de 5 a 10 anos: pagam apenas uma taxa reduzida para cobrir alimentação e estadia.\n\n🧑 A partir de 11 anos: valor normal do ingresso.\n\n📲 Entre em contato com nossa equipe no WhatsApp antes de finalizar a compra para receber os detalhes e liberar seu cupom de desconto!",
  },
  {
    question: "O ingresso inclui hospedagem?",
    answer:
      "Sim! O seu Passaporte já inclui hospedagem nos alojamentos compartilhados. Famílias e grupos podem se organizar para fechar quartos inteiros de beliches sem nenhuma taxa extra.\n\nPara casais ou famílias que preferem total privacidade, oferecemos opções de quartos de hotel (com a diária do quarto paga à parte no site). Você não precisa se preocupar em procurar hotel na cidade e ficar distante do local do EJM.",
  },
  {
    question: "Posso escolher com quem vou dividir o quarto?",
    answer:
      "Sim! Quer ficar com a sua turma? No momento da inscrição, vocês podem escolher dormir no mesmo quarto do alojamento. E o melhor: é a chance perfeita para conhecer jovens de todos os lugares!",
  },
  {
    question: "Alimentação inclusa no valor do ingresso?",
    answer:
      "Sim! Todas as 9 refeições do encontro estão inclusas no valor do seu Passaporte. Você não paga nada a mais por isso.",
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
    question: "Quem pode participar?",
    answer:
      "O EJM é feito para a juventude, mas é um espaço de braços abertos para a sua família! Qualquer pessoa que deseje viver essa experiência espiritual é bem-vinda.",
  },
  {
    question: "O que esperar do EJM 2027?",
    answer:
      "Não é apenas um evento, é um divisor de águas. Momentos intensos de presença de Deus, comunhão com jovens de diversas regiões e experiências espirituais que vão marcar a sua história. O EJM é feito de irmãos para irmãos, sem fins lucrativos e com foco exclusivo em entrar na presença de Deus e se encher com o Espírito Santo.",
  },
  {
    question: "Quais as formas de pagamento?",
    answer:
      "Para que ninguém fique de fora, você pode:\n\n💳 Parcelar no cartão de crédito direto pelo site\n💰 Pagamento à vista no Pix\n📄 Pagamento via Boleto",
  },
  {
    question: "E se eu estiver em dúvida se vale a pena?",
    answer:
      "Se você sente que precisa de algo novo, de direção, de renovação espiritual… esse evento é pra você. Responda ao chamado. Diga: \"Eis-me aqui\". Muitos chegam com dúvidas… e saem com a vida transformada.",
  },
  {
    question: "Como faço para garantir minha vaga?",
    answer:
      "Basta realizar sua inscrição pelo site oficial. As vagas nas camas são limitadas — quem compra primeiro, escolhe o quarto primeiro! Não deixe pra depois.",
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
