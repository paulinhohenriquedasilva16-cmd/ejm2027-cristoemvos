import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bed,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Lamp,
  MessageCircle,
  ShieldCheck,
  Star,
  Users,
  Wifi,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CheckoutLink from "@/components/CheckoutLink";
import { trackEvent } from "@/lib/analytics";

import jundiaiImg1 from "@/assets/alojamento-jundiai-1.jpg";
import jundiaiImg2 from "@/assets/alojamento-jundiai-2.jpg";
import jundiaiImg3 from "@/assets/alojamento-jundiai-3.jpg";
import jundiaiImg4 from "@/assets/alojamento-jundiai-4.jpg";
import jundiaiImg5 from "@/assets/alojamento-jundiai-5.jpg";
import jundiaiImg6 from "@/assets/alojamento-jundiai-6.jpg";
import jundiaiImg7 from "@/assets/alojamento-jundiai-7.jpg";
import blocoAImg1 from "@/assets/alojamento-blocoA-1.jpg";
import blocoAImg2 from "@/assets/alojamento-blocoA-2.jpg";
import alojJImg1 from "@/assets/alojamento-j-1.jpg";
import alojJImg2 from "@/assets/alojamento-j-2.jpg";
import alojJImg3 from "@/assets/alojamento-j-3.jpg";
import alojJImg4 from "@/assets/alojamento-j-4.jpg";
import blocoCImg1 from "@/assets/alojamento-blocoC-1.jpg";
import blocoCImg2 from "@/assets/alojamento-blocoC-2.jpg";
import blocoCImg3 from "@/assets/alojamento-blocoC-3.jpg";
import blocoCImg4 from "@/assets/alojamento-blocoC-4.jpg";
import blocoCImg5 from "@/assets/alojamento-blocoC-5.jpg";
import aptoCHCImg1 from "@/assets/apto-ouro-chc-1.jpg";
import aptoCHCImg2 from "@/assets/apto-ouro-chc-2.png";
import aptoCHCImg3 from "@/assets/apto-ouro-chc-3.jpg";
import aptoCHCImg4 from "@/assets/apto-ouro-chc-4.jpg";
import aptoCHAImg1 from "@/assets/apto-ouro-cha-1.jpg";
import aptoCHAImg2 from "@/assets/apto-ouro-cha-2.jpg";
import aptoCHAImg3 from "@/assets/apto-ouro-cha-3.jpg";
import mapleImg1 from "@/assets/hotel-maple-1.jpg";
import mapleImg2 from "@/assets/hotel-maple-2.jpg";
import mapleImg3 from "@/assets/hotel-maple-3.jpg";
import mapleImg4 from "@/assets/hotel-maple-4.jpg";
import mapleImg5 from "@/assets/hotel-maple-5.jpg";
import mapleImg6 from "@/assets/hotel-maple-6.jpg";
import mapleImg7 from "@/assets/hotel-maple-7.jpg";

interface Accommodation {
  id: string;
  name: string;
  tag: "Inclusa no ingresso" | "Privativo · Custo adicional";
  images: string[];
  description: string;
  amenities: { icon: typeof Bed; label: string }[];
  soldOut?: boolean;
}

const included: Accommodation[] = [
  {
    id: "alojamento-jundiai",
    name: "Alojamento Jundiaí",
    tag: "Inclusa no ingresso",
    images: [jundiaiImg1, jundiaiImg2, jundiaiImg3, jundiaiImg4, jundiaiImg5, jundiaiImg6, jundiaiImg7],
    description: "Alojamento coletivo com estrutura organizada e ambiente comunitário, incluso no Passaporte Ouro VIP.",
    amenities: [
      { icon: Bed, label: "Camas confortáveis" },
      { icon: Droplets, label: "Banheiros compartilhados" },
      { icon: Users, label: "Ambiente comunitário" },
      { icon: ShieldCheck, label: "Segurança 24h" },
    ],
  },
  {
    id: "alojamento-bloco-a",
    name: "Alojamento Bloco A",
    tag: "Inclusa no ingresso",
    images: [blocoAImg1, blocoAImg2],
    description: "Alojamento coletivo no Bloco A com infraestrutura completa, incluso no Passaporte Ouro VIP.",
    amenities: [
      { icon: Bed, label: "Camas confortáveis" },
      { icon: Droplets, label: "Banheiros compartilhados" },
      { icon: Users, label: "Ambiente comunitário" },
      { icon: ShieldCheck, label: "Segurança 24h" },
    ],
  },
  {
    id: "alojamento-j",
    name: "Alojamento J",
    tag: "Inclusa no ingresso",
    images: [alojJImg1, alojJImg2, alojJImg3, alojJImg4],
    description: "Alojamento coletivo no Bloco J, próximo às áreas de convivência, incluso no Passaporte Ouro VIP.",
    amenities: [
      { icon: Bed, label: "Camas confortáveis" },
      { icon: Users, label: "Ambiente comunitário" },
      { icon: Lamp, label: "Iluminação individual" },
      { icon: ShieldCheck, label: "Segurança 24h" },
    ],
  },
  {
    id: "alojamento-bloco-c",
    name: "Alojamento Bloco C",
    tag: "Inclusa no ingresso",
    images: [blocoCImg1, blocoCImg2, blocoCImg3, blocoCImg4, blocoCImg5],
    description: "Alojamento coletivo no Bloco C com fácil acesso aos cultos e refeitório, incluso no Passaporte Ouro VIP.",
    amenities: [
      { icon: Bed, label: "Camas confortáveis" },
      { icon: Droplets, label: "Banheiros compartilhados" },
      { icon: Users, label: "Ambiente comunitário" },
      { icon: ShieldCheck, label: "Segurança 24h" },
    ],
  },
];

const upgrades: Accommodation[] = [
  {
    id: "apartamento-ouro-cha",
    name: "Apartamento Ouro | CH.A",
    tag: "Privativo · Custo adicional",
    images: [aptoCHAImg1, aptoCHAImg2, aptoCHAImg3],
    description: "Apartamento privativo com conforto superior para você e sua família (opção à parte na hora da inscrição).",
    amenities: [
      { icon: Bed, label: "Cama de casal" },
      { icon: Droplets, label: "Banheiro privativo" },
      { icon: Wifi, label: "Wi-Fi disponível" },
      { icon: Lamp, label: "Ar-condicionado" },
    ],
  },
  {
    id: "apartamento-ouro-chc",
    name: "Apartamento Ouro | CH.C",
    tag: "Privativo · Custo adicional",
    soldOut: true,
    images: [aptoCHCImg1, aptoCHCImg2, aptoCHCImg3, aptoCHCImg4],
    description: "Apartamento privativo no bloco C com estrutura completa. Todas as unidades desta opção já foram reservadas.",
    amenities: [
      { icon: Bed, label: "Cama de casal" },
      { icon: Droplets, label: "Banheiro privativo" },
      { icon: Wifi, label: "Wi-Fi disponível" },
      { icon: Lamp, label: "Ar-condicionado" },
    ],
  },
  {
    id: "hotel-maple-village",
    name: "Hotel Maple Village",
    tag: "Privativo · Custo adicional",
    images: [mapleImg1, mapleImg2, mapleImg3, mapleImg4, mapleImg5, mapleImg6, mapleImg7],
    description: "Hospedagem completa no Hotel Maple Village com todo conforto (opção à parte na hora da inscrição).",
    amenities: [
      { icon: Bed, label: "Cama king size" },
      { icon: Droplets, label: "Banheiro privativo" },
      { icon: Wifi, label: "Wi-Fi de alta velocidade" },
      { icon: Star, label: "Café da manhã incluso" },
    ],
  },
];

/* ── On-demand Modal image carousel (renders only active slide for mobile bandwidth) ── */
const ModalCarousel = ({ images, altPrefix }: { images: string[]; altPrefix: string }) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % images.length);
  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);

  if (images.length === 1) {
    return (
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={images[0]}
          alt={`${altPrefix} (foto 1 de 1)`}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden bg-muted">
      <img
        src={images[current]}
        alt={`${altPrefix} (foto ${current + 1} de ${images.length})`}
        decoding="async"
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        aria-label="Próxima foto"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Foto {current + 1} de {images.length}
      </span>
      <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-black/70 px-2 backdrop-blur-sm">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className="flex min-h-[44px] min-w-[28px] items-center justify-center"
            aria-label={`Ver foto ${i + 1} de ${images.length}`}
            aria-current={i === current ? "true" : undefined}
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                i === current ? "w-5 bg-white" : "w-2 bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Horizontal scroll carousel with accessible navigation ── */
const AccCarousel = ({
  items,
  label,
  onSelect,
}: {
  items: Accommodation[];
  label: string;
  onSelect: (acc: Accommodation) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (!ref.current) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    ref.current.scrollBy({
      left: dir * 260,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-body text-xs text-muted-foreground md:hidden">
          Deslize para o lado para ver todas as opções →
        </p>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary-ink"
            aria-label={`Anterior em ${label}`}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary-ink"
            aria-label={`Próximo em ${label}`}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((acc) => (
          <button
            key={acc.id}
            type="button"
            onClick={() => onSelect(acc)}
            className={`group relative aspect-[3/4] w-56 flex-none snap-start overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-60 ${
              acc.soldOut ? "opacity-80" : ""
            }`}
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <img
              src={acc.images[0]}
              alt={acc.name}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${
                acc.soldOut ? "grayscale" : "group-hover:scale-105"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            {acc.soldOut && (
              <div className="absolute inset-0 z-[1] flex items-center justify-center">
                <span className="-rotate-12 rounded-full bg-destructive px-4 py-2 font-display text-sm font-bold text-destructive-foreground shadow-lg sm:text-base">
                  ESGOTADO
                </span>
              </div>
            )}
            <span
              className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 font-body text-[11px] font-semibold ${
                acc.soldOut
                  ? "bg-destructive text-destructive-foreground"
                  : acc.tag === "Privativo · Custo adicional"
                    ? "bg-graphite/90 text-white"
                    : "gradient-bg text-primary-foreground"
              }`}
            >
              {acc.soldOut ? "Esgotado" : acc.tag}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4">
              <span className="block font-body text-sm font-bold leading-snug text-white">
                {acc.name}
              </span>
              <span className="mt-1 block font-body text-xs text-white/85">
                Ver fotos e detalhes →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Main section ── */
const AccommodationsSection = () => {
  const [selected, setSelected] = useState<Accommodation | null>(null);

  const handleSelect = (acc: Accommodation) => {
    setSelected(acc);
    trackEvent("view_accommodation", {
      accommodation_id: acc.id,
      accommodation_name: acc.name,
      accommodation_type: acc.tag,
      sold_out: Boolean(acc.soldOut),
    });
  };

  return (
    <section id="acomodacoes" className="section-padding scroll-mt-20 overflow-x-clip bg-muted/40">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center md:mb-12"
        >
          <h2 className="mb-4 font-display text-2xl text-foreground md:text-4xl">
            Onde Você Vai <span className="gradient-text">Descansar</span>
          </h2>
          <p className="mx-auto max-w-2xl font-body text-sm text-muted-foreground sm:text-base">
            Estrutura organizada dentro da Estância Árvore da Vida para ir a pé aos cultos, descansar com segurança 24h e conviver com sua turma. Toque em uma acomodação para ver as fotos.
          </p>
        </motion.div>

        {/* Included carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="mb-2 font-display text-sm text-foreground md:text-base">
            Inclusas no Passaporte Ouro VIP (R$ 599,99) · Vagas por ordem de inscrição
          </h3>
          <AccCarousel items={included} label="acomodações inclusas" onSelect={handleSelect} />
        </motion.div>

        {/* Upgrade carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-sm text-foreground md:text-base">
              Quartos Privativos para Casais e Famílias (Upgrade à parte)
            </h3>
            <span className="rounded-full bg-destructive/10 px-3 py-1 font-body text-xs font-semibold text-destructive">
              CH.C esgotado · Poucas unidades restantes
            </span>
          </div>
          <AccCarousel items={upgrades} label="quartos privativos" onSelect={handleSelect} />
        </motion.div>

        {/* Accessible Radix Dialog modal */}
        <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
          <DialogContent
            className="max-h-[90dvh] max-w-md gap-0 overflow-y-auto overflow-x-hidden border-border bg-card p-0"
            style={{ boxShadow: "var(--shadow-warm)" }}
            closeClassName="right-2 top-2 z-10 bg-black/60 text-white hover:bg-black/80 opacity-100"
          >
            {selected && (
              <>
                <ModalCarousel
                  key={selected.id}
                  images={selected.images}
                  altPrefix={selected.name}
                />

                <div className="p-5 md:p-6">
                  <DialogHeader className="mb-4 space-y-2 text-left">
                    <span
                      className={`inline-block w-fit rounded-full px-3 py-1 font-body text-xs font-semibold ${
                        selected.soldOut
                          ? "bg-destructive/15 text-destructive"
                          : selected.tag === "Privativo · Custo adicional"
                            ? "bg-amber-100 text-amber-950"
                            : "bg-orange-100 text-orange-950"
                      }`}
                    >
                      {selected.soldOut ? "Esgotado" : selected.tag}
                    </span>
                    <DialogTitle className="font-display text-base text-foreground md:text-lg">
                      {selected.name}
                    </DialogTitle>
                    <DialogDescription className="font-body text-sm text-muted-foreground">
                      {selected.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mb-6 grid grid-cols-2 gap-2.5">
                    {selected.amenities.map((a) => (
                      <div
                        key={a.label}
                        className="flex items-center gap-2 rounded-xl bg-muted p-2.5"
                      >
                        <a.icon className="h-4 w-4 shrink-0 text-primary-ink" aria-hidden="true" />
                        <span className="font-body text-xs text-foreground">{a.label}</span>
                      </div>
                    ))}
                  </div>

                  {selected.soldOut ? (
                    <a
                      href="#suporte"
                      onClick={() => setSelected(null)}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 font-body text-sm font-bold text-primary-ink transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Consultar outras opções com o suporte
                    </a>
                  ) : (
                    <CheckoutLink
                      source="accommodation_modal"
                      ticketId="ouro-vip"
                      accommodationName={selected.name}
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full gradient-bg px-5 py-3 font-body text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95"
                    >
                      <span>
                        {selected.tag === "Privativo · Custo adicional"
                          ? "Ver disponibilidade na página de inscrição"
                          : "Garantir Passaporte Ouro VIP"}
                      </span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </CheckoutLink>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-6 text-center md:p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <p className="mb-5 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            Vai em família, casal ou quer fechar um quarto com sua igreja? Compare os passaportes abaixo ou fale com nossa equipe.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#inscricao"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full gradient-bg px-6 py-3 font-body text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95 sm:w-auto"
            >
              <span>Escolher Meu Passaporte</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#suporte"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-body text-sm font-bold text-primary-ink transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Tirar dúvida de quarto
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationsSection;
