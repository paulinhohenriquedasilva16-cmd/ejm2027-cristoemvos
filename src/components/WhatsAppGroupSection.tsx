import { motion } from "framer-motion";
import { Bell, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_URLS } from "@/lib/checkout";

const perks = [
  "Aviso antecipado antes da virada do 1º Lote e últimas camas",
  "Horários oficiais dos cultos, caravanas e chegada à Estância",
  "Grupo silencioso: apenas comunicados oficiais, sem bagunça",
];

const WhatsAppGroupSection = () => {
  return (
    <section id="grupo-whatsapp" className="section-padding scroll-mt-20 bg-muted/40">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border bg-card p-6 text-center sm:p-8 md:p-12"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full gradient-bg text-primary-foreground">
            <Bell className="h-7 w-7" aria-hidden="true" />
          </div>

          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1 font-body text-[11px] font-bold uppercase tracking-wider text-primary-ink">
            <span aria-hidden="true" className="live-dot h-2 w-2 rounded-full bg-primary" />
            Grupo Oficial de Avisos · Gratuito
          </span>

          <h2 className="mb-4 font-display text-xl text-foreground sm:text-2xl md:text-3xl">
            Ainda Vai Combinar com Seus Pais, Caravana ou Esperar o Cartão Virar?
          </h2>

          <p className="mx-auto mb-6 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
            Não saia sem salvar seu lugar na fila de avisos. Entre no Grupo Oficial do EJM 2027 no WhatsApp para receber o aviso de virada de lote e todas as novidades em primeira mão.
          </p>

          <ul className="mx-auto mb-8 max-w-xl space-y-2.5 text-left font-body text-xs text-muted-foreground sm:text-sm">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary-ink" strokeWidth={3} aria-hidden="true" />
                </span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <Button
            asChild
            size="lg"
            className="min-h-[52px] w-full rounded-full gradient-bg px-8 py-4 font-body text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95 sm:w-auto sm:text-base"
          >
            <a
              href={WHATSAPP_URLS.officialGroup}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { channel: "official_group" })}
            >
              <MessageCircle className="mr-2 h-5 w-5 fill-current" aria-hidden="true" />
              Entrar no Grupo Oficial no WhatsApp
            </a>
          </Button>

          <p className="mt-3 font-body text-xs text-muted-foreground">
            Entrada gratuita e sem compromisso • Saia quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppGroupSection;
