import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, QrCode, Barcode, CreditCard } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const CHECKOUT_URL = "https://eisme.com.br/evento/ejm2027";

type Package = {
  title: string;
  subtitle: string;
  priceInt: string;
  priceCents: string;
  free?: boolean;
  featured?: boolean;
  badge?: string;
  benefits: string[];
};

const packages: Package[] = [
  {
    title: "Inteiro",
    subtitle: "A partir de 11 anos",
    priceInt: "599",
    priceCents: ",99",
    featured: true,
    benefits: [
      "Entrada nos 3 dias do encontro",
      "Todas as 9 refeições inclusas",
      "Hospedagem em alojamento compartilhado",
      "Prédios exclusivos para moços, moças e famílias",
      "Estacionamento Grátis",
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
      "Prédios exclusivos para famílias",
    ],
  },
  {
    title: "Infantil",
    subtitle: "De 0 a 4 anos",
    priceInt: "Grátis",
    priceCents: "",
    free: true,
    benefits: [
      "Entrada nos 3 dias do encontro",
      "Todas as 9 refeições inclusas",
      "Hospedagem em alojamento compartilhado",
      "Prédios exclusivos para famílias",
      "Necessário responsável",
    ],
  },
];

const payments = [
  { icon: QrCode, label: "Pix" },
  { icon: Barcode, label: "Boleto" },
  { icon: CreditCard, label: "Cartão de Crédito" },
];

const PriceBlock = ({ pkg }: { pkg: Package }) => (
  <div className="flex min-h-[5.25rem] flex-col items-center justify-center pb-5">
    {pkg.free ? (
      <span className="font-display text-4xl leading-none gradient-text sm:text-5xl">Grátis</span>
    ) : (
      <div className="flex items-start justify-center gap-1">
        <span className="mt-2 font-body text-base font-semibold text-muted-foreground">R$</span>
        <span className="font-display text-5xl leading-none tracking-tight text-foreground sm:text-6xl">
          {pkg.priceInt}
        </span>
        <span className="mt-2 font-body text-lg font-semibold text-muted-foreground">{pkg.priceCents}</span>
      </div>
    )}
    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-primary">
      1º Lote
    </span>
  </div>
);

const PricingSection = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [snaps, setSnaps] = React.useState<number[]>([]);
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setSnaps(api.scrollSnapList());
    setSelected(api.selectedScrollSnap());
    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onReInit = () => setSnaps(api.scrollSnapList());
    api.on("select", onSelect);
    api.on("reInit", onReInit);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  return (
    <section id="inscricao" className="section-padding bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Passaporte EJM 2027
          </span>
          <h2 className="mb-4 font-display text-2xl text-foreground md:text-4xl">
            <span className="gradient-text">Inscrição</span>
          </h2>
          <p className="mb-10 font-body text-sm text-muted-foreground sm:text-base">
            Garanta sua vaga no EJM 2027 com o melhor preço!
          </p>
        </motion.div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start" }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 pt-4 pb-6 sm:-ml-5">
            {packages.map((pkg, index) => (
              <CarouselItem
                key={index}
                className="pl-3 sm:pl-5 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <div className="group relative flex h-full flex-col rounded-[1.75rem] gradient-bg p-[2px] shadow-[0_16px_40px_-24px_hsl(var(--primary)/0.5)] transition-transform duration-300 hover:-translate-y-1 lg:shadow-[0_28px_60px_-26px_hsl(var(--primary)/0.5)]">
                  >
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-2px)] bg-card p-6 text-center sm:p-7">
                    >

                      <div className="mb-5">
                        <span
                          className={
                            pkg.featured
                              ? "mb-2 inline-block rounded-full gradient-bg px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-primary-foreground"
                              : "mb-2 inline-block rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-wider text-primary"
                          }
                        >
                          {pkg.title}
                        </span>
                        <p className="font-body text-xs text-muted-foreground sm:text-sm">{pkg.subtitle}</p>
                      </div>

                      <PriceBlock pkg={pkg} />

                      <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                      <ul className="mb-8 flex-grow space-y-3 text-left font-body text-xs text-muted-foreground sm:text-sm">
                        {pkg.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                              <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href={CHECKOUT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-4 py-3.5 font-body text-sm font-bold text-primary-foreground transition-all duration-300 hover:gap-3 hover:opacity-95 sm:py-4"
                      >
                        Garantir Passaporte
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Mobile: swipe hints */}
          <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver opção ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={
                  i === selected
                    ? "h-2 w-6 rounded-full gradient-bg transition-all"
                    : "h-2 w-2 rounded-full bg-primary/25 transition-all"
                }
              />
            ))}
          </div>

          <div className="hidden md:block">
            <CarouselPrevious className="-left-4 lg:-left-10" />
            <CarouselNext className="-right-4 lg:-right-10" />
          </div>
        </Carousel>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-border bg-muted/60 px-5 py-5 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {payments.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-body text-xs font-medium text-foreground sm:text-sm"
              >
                <p.icon className="h-4 w-4 text-primary" />
                {p.label}
              </span>
            ))}
          </div>
          <p className="font-body text-xs text-muted-foreground sm:text-sm">
            Vagas nas camas são limitadas.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
