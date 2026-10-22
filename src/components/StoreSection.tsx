import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Copy, Check, ShoppingBag, Minus, Plus } from "lucide-react";
import camiseta from "@/assets/camiseta-ejm.jpg.asset.json";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const PRICE = 70;
const SIZES = ["PP", "P", "M", "G", "GG", "XG"];
const PIX_KEY = "177.965.118.09";
const PIX_NAME = "Pedro Vitorino";
const WHATSAPP = "5515997624048";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  size: z.enum(SIZES as [string, ...string[]], { errorMap: () => ({ message: "Escolha o tamanho" }) }),
  qty: z.number().int().min(1).max(50),
});

const StoreSection = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"form" | "pix">("form");
  const [copied, setCopied] = useState(false);

  const total = (PRICE * qty).toFixed(2).replace(".", ",");

  const reset = (o: boolean) => {
    setOpen(o);
    if (!o) { setStep("form"); setError(""); setCopied(false); }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ name, size, qty });
    if (!r.success) { setError(r.error.issues[0].message); return; }
    setError("");
    const msg = `Olá! Meu nome é ${r.data.name}. Quero reservar ${r.data.qty} camisa(s) do EJM no tamanho ${r.data.size}. Total: R$ ${total}.`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setStep("pix");
  };

  const copyPix = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="loja" className="section-padding bg-muted">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-3">
            <span className="gradient-text">Loja EJM</span>
          </h2>
          <p className="font-body text-muted-foreground">Leve o EJM 2027 com você</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6 md:gap-10 items-center rounded-3xl border-2 border-primary/30 bg-background p-4 sm:p-6 md:p-8"
          style={{ boxShadow: "var(--shadow-warm)" }}>
          <div className="relative rounded-2xl overflow-hidden bg-background">
            <span className="absolute top-3 left-3 gradient-bg text-primary-foreground text-[10px] sm:text-xs font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full">Novidade</span>
            <img src={camiseta.url} alt="Camiseta oficial EJM 2027 - frente e costas" className="w-full h-auto object-contain" loading="lazy" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl sm:text-2xl text-foreground mb-2">Camiseta Oficial EJM 2027</h3>
            <p className="font-body text-sm text-muted-foreground mb-5">"Enchei-vos do Espírito Santo" — Efésios 5:18. Camiseta preta com estampa frontal e nas costas.</p>
            <div className="flex items-baseline gap-1 justify-center md:justify-start mb-6">
              <span className="font-body text-xl font-medium text-foreground">R$</span>
              <span className="font-display text-5xl text-foreground">70<span className="text-2xl text-muted-foreground">,00</span></span>
            </div>
            <button onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto gradient-bg text-primary-foreground font-body font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity">
              <ShoppingBag className="w-5 h-5" /> Comprar
            </button>
          </div>
        </motion.div>
      </div>

      <Dialog open={open} onOpenChange={reset}>
        <DialogContent className="max-w-md">
          {step === "form" ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-lg">Reservar camiseta</DialogTitle>
                <DialogDescription>Preencha os dados e envie sua reserva pelo WhatsApp.</DialogDescription>
              </DialogHeader>
              <form onSubmit={submit} className="space-y-5 font-body">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Seu nome</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Nome completo" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Tamanho</label>
                  <div className="grid grid-cols-6 gap-2">
                    {SIZES.map((s) => (
                      <button type="button" key={s} onClick={() => setSize(s)}
                        className={`rounded-lg border py-2 text-sm font-semibold transition-colors ${size === s ? "gradient-bg text-primary-foreground border-transparent" : "border-input text-foreground hover:border-primary"}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Quantidade</label>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 rounded-full border border-input flex items-center justify-center hover:border-primary"><Minus className="w-4 h-4" /></button>
                    <span className="font-display text-xl w-8 text-center">{qty}</span>
                    <button type="button" onClick={() => setQty((q) => Math.min(50, q + 1))} className="w-10 h-10 rounded-full border border-input flex items-center justify-center hover:border-primary"><Plus className="w-4 h-4" /></button>
                    <span className="ml-auto text-sm text-muted-foreground">Total: <strong className="text-foreground">R$ {total}</strong></span>
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button type="submit" className="w-full gradient-bg text-primary-foreground font-bold py-3.5 rounded-full hover:opacity-90">Enviar reserva pelo WhatsApp</button>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-lg">Pagamento via Pix</DialogTitle>
                <DialogDescription>Faça o Pix de <strong>R$ {total}</strong> e envie o comprovante no WhatsApp.</DialogDescription>
              </DialogHeader>
              <div className="font-body space-y-4">
                <div className="rounded-2xl border-2 border-primary/30 bg-muted p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Chave Pix (CPF)</p>
                  <p className="font-display text-lg text-foreground mb-1">{PIX_KEY}</p>
                  <p className="text-sm text-muted-foreground">{PIX_NAME}</p>
                </div>
                <button onClick={copyPix} className="w-full inline-flex items-center justify-center gap-2 gradient-bg text-primary-foreground font-bold py-3.5 rounded-full hover:opacity-90">
                  {copied ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar chave Pix</>}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default StoreSection;
