import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const packages = [
  {
    title: "Inteiro",
    subtitle: "A partir de 11 anos",
    priceInt: "599",
    priceCents: ",99",
    benefits: [
      "Entrada nos 3 dias do encontro",
      "Todas as 9 refeições inclusas",
      "Hospedagem em alojamento compartilhado",
      "Prédios exclusivos para moços, moças e famílias",
      "Estacionamento Grátis"
    ],
  },
  {
    title: "Infantil",
    subtitle: "De 5 a 10 anos",
    priceInt: "359",
    priceCents: ",99",
    benefits: [
      "Entrada nos 3 dias do encontro",
      "Todas as 9 refeições inclusas",
      "Hospedagem em alojamento compartilhado",
      "Prédios exclusivos para famílias"
    ],
  },
  {
    title: "Infantil",
    subtitle: "De 0 a 4 anos",
    priceInt: "Grátis",
    priceCents: "",
    benefits: [
      "Entrada nos 3 dias do encontro",
      "Todas as 9 refeições inclusas",
      "Hospedagem em alojamento compartilhado",
      "Prédios exclusivos para famílias",
      "Necessário responsável"
    ],
  }
];

const PricingSection = () => {
  return (
    <section id="inscricao" className="section-padding bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-4">
            <span className="gradient-text">Inscrição</span>
          </h2>
          <p className="font-body text-muted-foreground mb-10">
            Garanta sua vaga no EJM 2027 com o melhor preço!
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {packages.map((pkg, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="rounded-3xl border-2 border-primary/30 bg-muted p-5 sm:p-6 text-center h-full flex flex-col relative"
                    style={{ boxShadow: "var(--shadow-warm)" }}
                  >
                    <div className="mb-4">
                      <span className="inline-block gradient-bg text-primary-foreground text-[10px] sm:text-xs font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                        {pkg.title}
                      </span>
                      <p className="text-muted-foreground text-xs sm:text-sm font-body">{pkg.subtitle}</p>
                    </div>

                    <div className="mb-6 flex items-baseline justify-center min-h-[4rem]">
                      {pkg.priceInt === "Grátis" ? (
                        <span className="font-display text-4xl text-foreground mt-2">
                          Grátis
                        </span>
                      ) : (
                        <div className="flex items-baseline gap-1 mt-2">
                          <span className="font-body text-xl font-medium text-foreground">R$</span>
                          <span className="font-display text-4xl text-foreground tracking-tight">
                            {pkg.priceInt}
                            <span className="text-xl sm:text-2xl text-muted-foreground ml-0.5">{pkg.priceCents}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <ul className="font-body text-xs sm:text-sm text-muted-foreground space-y-3 mb-8 text-left flex-grow">
                      {pkg.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://eisme.com.br/evento/ejm2027"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full gradient-bg text-primary-foreground font-body font-bold text-sm px-2 py-3 sm:py-4 rounded-full hover:opacity-90 transition-opacity mt-auto whitespace-nowrap"
                    >
                      Garantir Passaporte
                    </a>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12 lg:-left-16" />
            <CarouselNext className="-right-12 lg:-right-16" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default PricingSection;
