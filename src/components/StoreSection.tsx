import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import lojaBg from "@/assets/loja-bg.jpg";
import { STORE_PRODUCTS, type StoreProduct } from "@/data/storeProducts";
import { trackEvent } from "@/lib/analytics";

const StoreReservationDialog = lazy(() => import("@/components/StoreReservationDialog"));

const StoreSection = () => {
  const featuredProduct = STORE_PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState<string>(featuredProduct.sizes[2] ?? "M");
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [open, setOpen] = useState(false);

  const [priceInt, priceCents] = featuredProduct.price.toFixed(2).split(".");

  const handleOpenReserve = (product: StoreProduct) => {
    setSelectedProduct(product);
    setOpen(true);
    trackEvent("store_modal_open", {
      product_id: product.id,
      product_name: product.name,
      value: product.price,
    });
  };

  return (
    <section id="loja" className="relative scroll-mt-20 overflow-hidden section-padding">
      <img
        src={lojaBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-graphite/80" />
      <div aria-hidden="true" className="absolute inset-0 gradient-bg opacity-15 mix-blend-multiply" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-graphite/75 via-transparent to-graphite/90" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:mb-14"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-graphite/60 px-4 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
            Loja Oficial · EJM 2027
          </span>
          <h2 className="mb-3 font-display text-2xl text-white md:text-4xl">
            Vista a Mensagem do <span className="gradient-text-dark">EJM 2027</span>
          </h2>
          <p className="mx-auto max-w-md font-body text-sm text-white/85 sm:text-base">
            Já garantiu seu passaporte? Escolha seu tamanho e reserve a Camiseta Oficial Efésios 5:18 com retirada no evento sem frete.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group mx-auto flex max-w-sm flex-col rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:border-primary/70 sm:p-4 md:backdrop-blur-xl"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
            <img
              src={featuredProduct.image}
              alt={featuredProduct.imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full gradient-bg px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow">
              {featuredProduct.badge}
            </span>
          </div>

          <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
            <h3 className="mb-2 font-display text-lg text-white sm:text-xl">
              {featuredProduct.name}
            </h3>
            <p className="mb-4 font-body text-sm leading-relaxed text-white/80">
              {featuredProduct.shortDescription}
            </p>

            {/* Quick size selection */}
            <div className="mb-5">
              <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-white/80">
                Tamanho selecionado: <strong className="text-orange-300">{selectedSize}</strong>
              </p>
              <div role="group" aria-label="Escolher tamanho da camiseta" className="flex flex-wrap gap-1.5">
                {featuredProduct.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedSize(size)}
                      className={`min-h-[40px] min-w-[40px] rounded-xl border px-2.5 font-body text-xs font-bold transition-colors active:scale-95 ${
                        active
                          ? "border-transparent gradient-bg text-primary-foreground"
                          : "border-white/25 bg-black/30 text-white hover:bg-white/15"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/20 pt-4">
              <div className="flex min-h-[3.5rem] flex-col justify-end">
                <div className="flex items-baseline gap-1">
                  <span className="font-body text-lg text-white/85">R$</span>
                  <span className="font-display text-4xl text-white">
                    {priceInt}
                    <span className="text-xl text-white/75">,{priceCents}</span>
                  </span>
                </div>
                <span className="font-body text-[11px] uppercase tracking-wider text-white/75">
                  Reserva + Pix sem taxa
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleOpenReserve(featuredProduct)}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full gradient-bg px-5 py-3 font-body text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95 active:scale-95"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Reservar
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            to="/loja"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            <span>Abrir página da Loja Oficial</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {open && (
        <Suspense fallback={null}>
          <StoreReservationDialog
            product={selectedProduct}
            initialSize={selectedSize}
            open={open}
            onOpenChange={setOpen}
          />
        </Suspense>
      )}
    </section>
  );
};

export default StoreSection;
