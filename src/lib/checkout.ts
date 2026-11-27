import type { AttributionData, TicketSkuId } from "@/lib/analytics/types";
import { ATTRIBUTION_PARAMS, getActiveAttribution } from "@/lib/attribution";

export const CHECKOUT_BASE_URL = "https://eisme.com.br/evento/ejm2027";

export const WHATSAPP_URLS = {
  caravans:
    "https://wa.me/5515998162393?text=" +
    encodeURIComponent(
      "Olá! Estou organizando uma caravana / tenho dúvidas sobre os ingressos do EJM 2027 (1º Lote) e gostaria de falar com a equipe."
    ),
  caravansRaw: "https://wa.me/5515998162393",
  store: "https://wa.me/5515996183439",
  officialGroup: "https://chat.whatsapp.com/K05xBp2nu1x2AiazbsoHLa?mode=gi_t",
  parentsShare:
    "https://wa.me/?text=" +
    encodeURIComponent(
      "Oi! Quero muito ir ao EJM 2027 (Encontro de Jovens da Mensagem) de 15 a 17 de janeiro na Estância Árvore da Vida (Sumaré-SP). Já inclui 9 refeições e opção com alojamento (segurança 24h) por R$ 599,99 ou sem acomodação por R$ 480,00, em até 3x sem juros. Dá uma olhada no site oficial: https://ejm.cristoemvos.com/?utm_source=whatsapp&utm_medium=share_parents&utm_campaign=ejm2027_1lote#inscricao"
    ),
} as const;

export interface TicketSkuMeta {
  id: TicketSkuId;
  name: string;
  price: number;
  category: "ingresso" | "ingresso_infantil";
}

export const TICKET_CATALOG: Record<TicketSkuId, TicketSkuMeta> = {
  "ouro-vip": {
    id: "ouro-vip",
    name: "1º Lote - Ouro VIP",
    price: 599.99,
    category: "ingresso",
  },
  "ouro-sem-acomodacao": {
    id: "ouro-sem-acomodacao",
    name: "1º Lote - Ouro SEM ACOMODAÇÃO",
    price: 480.0,
    category: "ingresso",
  },
  "infantil-5-10": {
    id: "infantil-5-10",
    name: "Passaporte Infantil (5 a 10 anos)",
    price: 359.99,
    category: "ingresso_infantil",
  },
  "infantil-0-4": {
    id: "infantil-0-4",
    name: "Passaporte Infantil (0 a 4 anos)",
    price: 0,
    category: "ingresso_infantil",
  },
  geral: {
    id: "geral",
    name: "Passaporte EJM 2027",
    price: 599.99,
    category: "ingresso",
  },
};

export function buildCheckoutUrl(options?: {
  baseUrl?: string;
  attribution?: AttributionData | null;
}): string {
  const baseUrl = options?.baseUrl ?? CHECKOUT_BASE_URL;
  const attribution =
    options && "attribution" in options ? options.attribution : getActiveAttribution();

  if (!attribution) return baseUrl;

  try {
    const url = new URL(baseUrl);
    let appended = false;

    for (const key of ATTRIBUTION_PARAMS) {
      const value = attribution[key];
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
        appended = true;
      }
    }

    return appended ? url.toString() : baseUrl;
  } catch {
    return baseUrl;
  }
}
