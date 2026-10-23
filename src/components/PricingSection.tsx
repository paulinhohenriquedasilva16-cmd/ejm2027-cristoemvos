import { ArrowUpRight, Check, QrCode, Barcode, CreditCard, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECKOUT_URL = "https://eisme.com.br/evento/ejm2027";

type Package = {
  title: string;
  subtitle: string;
  priceInt: string;
  priceCents: string;
  free?: boolean;
  benefits: string[];
};

const packages: Package[] = [
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

const PricingSection = () => (
  <section id="inscricao" className="bg-background px-5 py-16 sm:px-8 md:py-24">
    <div className="mx-auto max-w-6xl">
      <header className="mb-9 flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 flex items-center gap-2 font-body text-sm font-semibold text-primary">
            <Ticket className="h-4 w-4" aria-hidden="true" /> Passaporte EJM 2027
          </p>
          <h2 className="font-display text-3xl leading-snug text-foreground sm:text-4xl">Inscrição</h2>
        </div>
        <div className="max-w-sm md:text-right">
          <p className="font-body text-sm font-semibold text-primary">1º Lote</p>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">Garanta sua vaga no EJM 2027.</p>
        </div>
      </header>

      <div className="grid items-stretch gap-5 md:grid-cols-3">
        {packages.map((pkg) => (
          <article key={pkg.subtitle} className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-graphite px-6 py-5 text-primary-foreground">
              <h3 className="font-body text-xl font-semibold">{pkg.title}</h3>
              <p className="mt-1 font-body text-sm text-primary-foreground/80">{pkg.subtitle}</p>
            </div>

            <div className="flex flex-1 flex-col px-6 pb-6 pt-7">
              <div className="mb-6 flex h-16 items-center gap-1.5 text-primary">
                {pkg.free ? (
                  <p className="font-body text-4xl font-bold leading-none">Grátis</p>
                ) : (
                  <p className="flex items-baseline gap-1 font-body tabular-nums">
                    <span className="mr-1 text-base font-medium text-muted-foreground">R$</span>
                    <span className="text-4xl font-bold leading-none lg:text-5xl">{pkg.priceInt}</span>
                    <span className="text-xl font-semibold">{pkg.priceCents}</span>
                  </p>
                )}
              </div>

              <div className="mb-6 border-t border-dashed border-border pt-5">
                <p className="mb-4 font-body text-xs font-semibold uppercase text-foreground">Seu passaporte inclui</p>
                <ul className="space-y-3.5 font-body text-sm leading-relaxed text-muted-foreground">
                  {pkg.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button asChild size="lg" className="mt-auto h-12 w-full justify-between rounded-md px-4 font-body font-semibold">
                <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  Garantir Passaporte <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-8 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {payments.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 font-body text-xs font-medium text-muted-foreground">
              <Icon className="h-4 w-4 text-foreground" aria-hidden="true" /> {label}
            </span>
          ))}
        </div>
        <p className="font-body text-xs text-muted-foreground">Vagas nas camas são limitadas.</p>
      </footer>
    </div>
  </section>
);

export default PricingSection;
