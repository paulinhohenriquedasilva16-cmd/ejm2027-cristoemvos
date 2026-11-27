import { motion } from "framer-motion";
import { CreditCard, Hotel, Info, UtensilsCrossed } from "lucide-react";

const ObjectionsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center md:mb-12"
        >
          <h2 className="mb-4 font-display text-2xl text-foreground md:text-4xl">
            Sem Surpresas. Tudo <span className="gradient-text">Transparente</span>
          </h2>
          <p className="mx-auto max-w-2xl font-body text-sm text-muted-foreground sm:text-base">
            Escolha se prefere dormir na Estância ou voltar para casa à noite. Nos dois casos, sua alimentação e programação estão 100% resolvidas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {/* Hospedagem flexível */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col rounded-2xl bg-muted p-6 md:p-7"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl gradient-bg">
              <Hotel className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
            </div>
            <h3 className="mb-3 font-display text-base text-foreground sm:text-lg">
              Hospedagem do Seu Jeito
            </h3>
            <p className="mb-4 flex-grow font-body text-sm leading-relaxed text-muted-foreground">
              No <strong className="text-foreground">Ouro VIP (R$ 599,99)</strong>, sua cama nos alojamentos
              compartilhados já está inclusa. Prefere aproveitar todo o evento sem dormir no local? Escolha o{" "}
              <strong className="text-foreground">Sem Acomodação (R$ 480,00)</strong>.
            </p>
            <div className="flex items-start gap-2 rounded-xl bg-card p-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-ink" aria-hidden="true" />
              <p className="font-body text-xs leading-relaxed text-muted-foreground">
                Segurança 24h e prédios exclusivos para moços, moças e famílias. Quartos privativos à parte na hora da inscrição.
              </p>
            </div>
          </motion.div>

          {/* 9 Refeições Inclusas */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col rounded-2xl bg-muted p-6 md:p-7"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl gradient-bg">
              <UtensilsCrossed className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
            </div>
            <h3 className="mb-3 font-display text-base text-foreground sm:text-lg">
              9 Refeições Inclusas
            </h3>
            <p className="mb-4 flex-grow font-body text-sm leading-relaxed text-muted-foreground">
              Você não gasta nada extra com alimentação. Os dois passaportes incluem{" "}
              <strong className="text-foreground">todas as 9 refeições</strong> de sexta a domingo no
              refeitório da Estância.
            </p>
            <div className="flex items-start gap-2 rounded-xl bg-card p-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-ink" aria-hidden="true" />
              <p className="font-body text-xs leading-relaxed text-muted-foreground">
                Sexta (3 refeições), Sábado (4 refeições) e Domingo (café da manhã e almoço de despedida).
              </p>
            </div>
          </motion.div>

          {/* Pagamento Facilitado & Famílias */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex flex-col rounded-2xl bg-muted p-6 md:p-7"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl gradient-bg">
              <CreditCard className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
            </div>
            <h3 className="mb-3 font-display text-base text-foreground sm:text-lg">
              Parcelamento sem Juros
            </h3>
            <p className="mb-4 flex-grow font-body text-sm leading-relaxed text-muted-foreground">
              Parcele seu passaporte em{" "}
              <strong className="text-foreground">até 3x sem juros no cartão</strong> (ou até 12x),
              além de pagamento à vista no Pix ou Boleto bancário.
            </p>
            <div className="flex items-start gap-2 rounded-xl bg-card p-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-ink" aria-hidden="true" />
              <p className="font-body text-xs leading-relaxed text-muted-foreground">
                Crianças de 0 a 4 anos não pagam e de 5 a 10 anos pagam R$ 359,99, com desconto automático na hora da inscrição.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ObjectionsSection;
