import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ArrowLeft, Check, Copy, MessageCircle, Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  STORE_PIX_KEY,
  STORE_PIX_NAME,
  STORE_WHATSAPP,
  type StoreProduct,
} from "@/data/storeProducts";
import { generateEventId, trackEvent } from "@/lib/analytics";

interface StoreReservationDialogProps {
  product: StoreProduct | null;
  initialSize?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FieldError = { field: "name" | "size" | "qty"; message: string } | null;

async function copyTextSafely(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below for Instagram/WhatsApp WebViews
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return ok;
  } catch {
    return false;
  }
}

const StoreReservationDialog = ({
  product,
  initialSize = "",
  open,
  onOpenChange,
}: StoreReservationDialogProps) => {
  const [name, setName] = useState("");
  const [size, setSize] = useState(initialSize);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<FieldError>(null);
  const [step, setStep] = useState<"form" | "pix">("form");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "manual">("idle");
  const pixHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (open) {
      setSize(initialSize);
      setQty(1);
      setStep("form");
      setError(null);
      setCopyStatus("idle");
    } else {
      setStep("form");
      setError(null);
      setCopyStatus("idle");
    }
  }, [open, product?.id, initialSize]);

  useEffect(() => {
    if (step === "pix") {
      pixHeadingRef.current?.focus();
    }
  }, [step]);

  if (!product) return null;

  const hasSizes = Boolean(product.sizes && product.sizes.length > 0);
  const numericTotal = product.price * qty;
  const total = numericTotal.toFixed(2).replace(".", ",");

  const sizePart = hasSizes ? ` no tamanho ${size}` : "";
  const whatsMsg = `Olá! Meu nome é ${name.trim()}. Quero reservar ${qty} unidade(s) de "${product.name}"${sizePart}. Total: R$ ${total}. Segue o comprovante do Pix!`;
  const whatsHref = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(whatsMsg)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const schema = z.object({
      name: z.string().trim().min(2, "Informe seu nome").max(100),
      size: hasSizes
        ? z.string().refine((v) => product.sizes!.includes(v), {
            message: "Escolha o tamanho",
          })
        : z.string().optional(),
      qty: z.number().int().min(1).max(50),
    });

    const parsed = schema.safeParse({ name, size, qty });
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const field = (issue.path[0] as "name" | "size" | "qty") || "name";
      setError({ field, message: issue.message });
      return;
    }

    setError(null);
    trackEvent("store_reserve_submit", {
      event_id: generateEventId("store"),
      product_id: product.id,
      product_name: product.name,
      size: hasSizes ? size : "unico",
      quantity: parsed.data.qty,
      value: numericTotal,
      currency: "BRL",
    });
    setStep("pix");
  };

  const copyPix = async () => {
    const ok = await copyTextSafely(STORE_PIX_KEY);
    setCopyStatus(ok ? "copied" : "manual");
    trackEvent("store_pix_copy", {
      product_id: product.id,
      product_name: product.name,
      value: numericTotal,
    });
    if (ok) {
      setTimeout(() => setCopyStatus("idle"), 2500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-md overflow-y-auto">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-lg">
                Reservar {product.name}
              </DialogTitle>
              <DialogDescription>
                1º passo: preencha os dados abaixo para gerar a chave Pix e confirmar sua reserva.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 font-body">
              <div>
                <label
                  htmlFor="store-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Seu nome
                </label>
                <input
                  id="store-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error?.field === "name") setError(null);
                  }}
                  maxLength={100}
                  aria-invalid={error?.field === "name"}
                  aria-describedby={error?.field === "name" ? "store-form-error" : undefined}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Nome completo"
                />
              </div>

              {hasSizes && product.sizes && (
                <fieldset
                  aria-invalid={error?.field === "size"}
                  aria-describedby={error?.field === "size" ? "store-form-error" : undefined}
                >
                  <legend className="mb-1.5 block text-sm font-medium text-foreground">
                    Tamanho
                  </legend>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {product.sizes.map((s) => (
                      <button
                        type="button"
                        key={s}
                        aria-pressed={size === s}
                        onClick={() => {
                          setSize(s);
                          if (error?.field === "size") setError(null);
                        }}
                        className={`min-h-[44px] rounded-lg border py-2 text-sm font-semibold transition-colors ${
                          size === s
                            ? "border-transparent gradient-bg text-primary-foreground"
                            : "border-input text-foreground hover:border-primary"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <div>
                <span
                  id="store-qty-label"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Quantidade
                </span>
                <div
                  role="group"
                  aria-labelledby="store-qty-label"
                  className="flex items-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label="Diminuir quantidade"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-input transition-colors hover:border-primary disabled:opacity-40"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span
                    aria-live="polite"
                    aria-atomic="true"
                    className="w-8 text-center font-display text-xl"
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(50, q + 1))}
                    disabled={qty >= 50}
                    aria-label="Aumentar quantidade"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-input transition-colors hover:border-primary disabled:opacity-40"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="ml-auto text-sm text-muted-foreground">
                    Total: <strong className="text-foreground">R$ {total}</strong>
                  </span>
                </div>
              </div>

              {error && (
                <p
                  id="store-form-error"
                  role="alert"
                  className="text-sm font-medium text-destructive"
                >
                  {error.message}
                </p>
              )}

              <button
                type="submit"
                className="min-h-[48px] w-full rounded-full gradient-bg py-3.5 font-bold text-primary-foreground transition-opacity hover:opacity-95"
              >
                Continuar para o Pix (R$ {total})
              </button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle
                ref={pixHeadingRef}
                tabIndex={-1}
                className="font-display text-lg focus:outline-none"
              >
                Pagamento via Pix
              </DialogTitle>
              <DialogDescription>
                2º passo: faça o Pix de <strong>R$ {total}</strong> ({qty}x{hasSizes ? ` tam. ${size}` : ""}) e clique abaixo para enviar o comprovante no WhatsApp.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 font-body">
              <div className="rounded-2xl border-2 border-primary/30 bg-muted p-4 text-center">
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                  Chave Pix (CPF)
                </p>
                <p className="mb-1 select-all font-display text-lg text-foreground">
                  {STORE_PIX_KEY}
                </p>
                <p className="text-sm text-muted-foreground">{STORE_PIX_NAME}</p>
              </div>

              <button
                type="button"
                onClick={() => void copyPix()}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-card py-3 font-bold text-primary-ink transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {copyStatus === "copied" ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" /> Chave Pix copiada!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" /> 1. Copiar chave Pix
                  </>
                )}
              </button>

              <p role="status" aria-live="polite" className="min-h-[1rem] text-center text-xs text-muted-foreground">
                {copyStatus === "copied" && "Chave Pix copiada para a área de transferência."}
                {copyStatus === "manual" && "Toque sobre a chave CPF acima para selecionar e copiar."}
              </p>

              <a
                href={whatsHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { channel: "store" })}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full gradient-bg py-3.5 font-bold text-primary-foreground transition-opacity hover:opacity-95"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                2. Enviar reserva e comprovante no WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Voltar e editar dados da reserva
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StoreReservationDialog;
