import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bell, MessageCircle, ShoppingBag, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreReservationDialog from "@/components/StoreReservationDialog";
import { STORE_PRODUCTS, type StoreProduct } from "@/data/storeProducts";
import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_URLS } from "@/lib/checkout";
import { applyRouteSeo } from "@/lib/seo";

const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [preselectedSizes, setPreselectedSizes] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    applyRouteSeo("store");
    window.scrollTo({ top: 0 });
  }, []);

  const handleReserve = (product: StoreProduct) => {
    setSelectedProduct(product);
    setOpen(true);
    trackEvent("store_modal_open", {
      product_id: product.id,
      product_name: product.name,
      value: product.price,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#conteudo-loja"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-full focus:bg-graphite focus:px-4 focus:py-3 focus:font-body focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      <Navbar alwaysSolid />

      <main id="conteudo-loja" className="pt-24 pb-16 md:pt-28">
        <section className="section-padding pt-4 md:pt-8">
          <div className="mx-auto max-w-5xl">
            {/* Back link */}
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex min-h-[44px] items-center gap-2 font-body text-sm font-medium text-primary-ink underline underline-offset-4 hover:opacity-80"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar para o EJM 2027
              </Link>
            </div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 max-w-2xl md:mb-12"
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-primary-ink">
                <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                Loja Oficial · EJM 2027
              </span>
              <h1 className="mb-3 font-display text-2xl text-foreground sm:text-3xl md:text-4xl">
                Produtos Oficiais <span className="gradient-text">EJM 2027</span>
              </h1>
              <p className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                Leve a mensagem de Efésios 5:18 com você. Reserve agora via Pix sem taxa e retire presencialmente no credenciamento do encontro sem custo de frete.
              </p>
            </motion.div>

            {/* Scalable Product Catalog Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {STORE_PRODUCTS.map((product) => {
                const [priceInt, priceCents] = product.price.toFixed(2).split(".");
                const chosenSize = preselectedSizes[product.id] ?? "";
                return (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group flex flex-col rounded-3xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-white">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        width={400}
                        height={400}
                        decoding="async"
                        className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full gradient-bg px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow">
                        {product.badge}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
                      <h2 className="mb-2 font-display text-lg text-foreground">
                        {product.name}
                      </h2>
                      <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">
                        {product.shortDescription}
                      </p>

                      {product.sizes && (
                        <div className="mb-5">
                          <span className="mb-2 block font-body text-xs font-medium text-muted-foreground">
                            Escolha o tamanho:
                          </span>
                          <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Tamanhos disponíveis para ${product.name}`}>
                            {product.sizes.map((s) => (
                              <button
                                key={s}
                                type="button"
                                aria-pressed={chosenSize === s}
                                onClick={() =>
                                  setPreselectedSizes((prev) => ({
                                    ...prev,
                                    [product.id]: s,
                                  }))
                                }
                                className={`min-h-[36px] min-w-[40px] rounded-lg border px-2 py-1 font-body text-xs font-semibold transition-colors ${
                                  chosenSize === s
                                    ? "border-transparent gradient-bg text-primary-foreground"
                                    : "border-input bg-background text-foreground hover:border-primary"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-body text-sm font-semibold text-muted-foreground">
                              R$
                            </span>
                            <span className="font-display text-3xl text-foreground">
                              {priceInt}
                              <span className="text-base text-muted-foreground">,{priceCents}</span>
                            </span>
                          </div>
                          <span className="mt-0.5 block font-body text-[11px] text-muted-foreground">
                            {product.pickupNote}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleReserve(product)}
                          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full gradient-bg px-5 py-2.5 font-body text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95"
                        >
                          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                          Reservar
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}

              {/* Future Products Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-primary/35 bg-muted/40 p-6 text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary-ink">
                  <Sparkles className="h-7 w-7" aria-hidden="true" />
                </div>
                <span className="mb-2 inline-block rounded-full border border-primary/25 bg-primary/5 px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-primary-ink">
                  Em Breve
                </span>
                <h2 className="mb-2 font-display text-base text-foreground sm:text-lg">
                  Mais Itens Oficiais Chegando
                </h2>
                <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
                  Novos produtos oficiais do EJM 2027 serão adicionados aqui em breve. Entre no Grupo Oficial do WhatsApp para receber os lançamentos em primeira mão.
                </p>
                <a
                  href={WHATSAPP_URLS.officialGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { channel: "official_group" })}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-primary/40 bg-card px-5 py-2.5 font-body text-xs font-bold text-primary-ink transition-colors hover:bg-primary hover:text-primary-foreground sm:text-sm"
                >
                  <Bell className="h-4 w-4" aria-hidden="true" />
                  Receber novidades no WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Cross-link back to Event Passports */}
            <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl bg-graphite p-6 text-center text-white sm:flex-row sm:p-8 sm:text-left">
              <div className="font-body">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-300">
                  1º Lote Aberto · 15 a 17 de Janeiro de 2027
                </p>
                <h2 className="mt-1 font-display text-lg text-white sm:text-xl">
                  Ainda não garantiu seu passaporte?
                </h2>
                <p className="mt-1 text-sm text-white/80">
                  Confira as modalidades Ouro VIP e Sem Acomodação com 9 refeições inclusas em até 3x sem juros.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:shrink-0 sm:flex-row">
                <Link
                  to="/#inscricao"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full gradient-bg px-6 py-3 font-body text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95"
                >
                  <span>Ver Ingressos</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={WHATSAPP_URLS.caravans}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { channel: "caravans" })}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Dúvidas
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer hasMobileStickyBar={false} />

      <StoreReservationDialog
        product={selectedProduct}
        initialSize={selectedProduct ? preselectedSizes[selectedProduct.id] ?? "" : ""}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default Store;
