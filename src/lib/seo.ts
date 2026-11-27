export type RouteSeoKey = "home" | "store" | "privacy" | "not_found";

interface RouteSeoSpec {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  jsonLd: Record<string, unknown> | null;
}

const SITE_ORIGIN = "https://ejm.cristoemvos.com";

export const HOME_JSON_LD: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "@id": `${SITE_ORIGIN}/#event`,
      name: "EJM 2027 - Enchei-vos do Espírito Santo",
      description:
        "Encontro de Jovens da Mensagem de 15 a 17 de janeiro de 2027 na Estância Árvore da Vida, Sumaré-SP. Cultos, louvor, comunhão e 9 refeições inclusas.",
      url: `${SITE_ORIGIN}/`,
      image: [`${SITE_ORIGIN}/og-image.jpg`],
      startDate: "2027-01-15T12:00:00-03:00",
      endDate: "2027-01-17T15:00:00-03:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      inLanguage: "pt-BR",
      performer: {
        "@type": "Organization",
        name: "Igreja Cristo em Vós",
        sameAs: [
          "https://www.instagram.com/cristo.emvos",
          "https://www.youtube.com/@cristo_emvos",
        ],
      },
      location: {
        "@type": "Place",
        name: "Estância Árvore da Vida",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Estr. Estância Árvore da Vida, 01",
          addressLocality: "Sumaré",
          addressRegion: "SP",
          postalCode: "13176-050",
          addressCountry: "BR",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Igreja Cristo em Vós",
        url: `${SITE_ORIGIN}/`,
      },
      offers: [
        {
          "@type": "Offer",
          name: "1º Lote - Ouro VIP",
          description:
            "Acomodação completa de sexta a domingo, 9 refeições inclusas, acesso total aos cultos e programação. Em até 3x de R$ 200,00 sem juros.",
          price: "599.99",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          validFrom: "2026-10-01T00:00:00-03:00",
          url: "https://eisme.com.br/evento/ejm2027",
        },
        {
          "@type": "Offer",
          name: "1º Lote - Ouro SEM ACOMODAÇÃO",
          description:
            "9 refeições inclusas, acesso total aos cultos e programação (não inclui hospedagem/pernoite). Em até 3x de R$ 160,00 sem juros.",
          price: "480.00",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          validFrom: "2026-10-01T00:00:00-03:00",
          url: "https://eisme.com.br/evento/ejm2027",
        },
        {
          "@type": "Offer",
          name: "1º Lote - Infantil (5 a 10 anos)",
          description:
            "Entrada nos 3 dias, 9 refeições e hospedagem em alojamento compartilhado para famílias. Desconto automático no checkout.",
          price: "359.99",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          validFrom: "2026-10-01T00:00:00-03:00",
          url: "https://eisme.com.br/evento/ejm2027",
        },
        {
          "@type": "Offer",
          name: "1º Lote - Infantil (0 a 4 anos)",
          description:
            "Gratuito para crianças de 0 a 4 anos acompanhadas de responsável pagante, com desconto integral automático no checkout.",
          price: "0.00",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          validFrom: "2026-10-01T00:00:00-03:00",
          url: "https://eisme.com.br/evento/ejm2027",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_ORIGIN}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Qual a diferença entre os dois Passaportes do 1º Lote (Ouro VIP e Sem Acomodação)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "O 1º Lote Ouro VIP (R$ 599,99 ou até 3x de R$ 200,00 sem juros) inclui entrada nos 3 dias, 9 refeições e cama em alojamento compartilhado. O 1º Lote Ouro SEM ACOMODAÇÃO (R$ 480,00 ou até 3x de R$ 160,00 sem juros) inclui entrada nos 3 dias e todas as 9 refeições, sem pernoite no local.",
          },
        },
        {
          "@type": "Question",
          name: "Crianças pagam ingresso? Preciso pedir cupom?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Não precisa pedir cupom. O desconto infantil é aplicado automaticamente no checkout pela data de nascimento: 0 a 4 anos gratuito (com responsável pagante) e 5 a 10 anos por R$ 359,99 no 1º Lote.",
          },
        },
        {
          "@type": "Question",
          name: "A alimentação está inclusa nos dois ingressos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. Todas as 9 refeições (3 na sexta, 4 no sábado e 2 no domingo) estão inclusas tanto no Ouro VIP quanto no Ouro Sem Acomodação.",
          },
        },
        {
          "@type": "Question",
          name: "Quais as formas de pagamento e parcelamento?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cartão de crédito em até 3x sem juros (ou em até 12x), Pix à vista e Boleto bancário direto no checkout oficial.",
          },
        },
        {
          "@type": "Question",
          name: "Posso cancelar minha inscrição se houver algum imprevisto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. Seguimos o prazo padrão de compras online previsto no Código de Defesa do Consumidor: cancelamento com reembolso integral em até 7 dias corridos após a compra.",
          },
        },
      ],
    },
  ],
};

export const STORE_JSON_LD: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: "Loja Oficial", item: `${SITE_ORIGIN}/loja` },
      ],
    },
    {
      "@type": "Product",
      name: "Camiseta Oficial EJM 2027",
      image: [`${SITE_ORIGIN}/camiseta-ejm.jpg`],
      description:
        "Modelagem unissex preta (PP ao XG) com estampa frente e costas (Efésios 5:18). Retirada presencial no credenciamento do EJM 2027 sem frete.",
      brand: {
        "@type": "Brand",
        name: "EJM 2027 - Igreja Cristo em Vós",
      },
      sku: "camiseta-ejm-2027",
      offers: {
        "@type": "Offer",
        url: `${SITE_ORIGIN}/loja`,
        priceCurrency: "BRL",
        price: "70.00",
        priceValidUntil: "2027-01-17",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
  ],
};

const ROUTE_SEO: Record<RouteSeoKey, RouteSeoSpec> = {
  home: {
    title: "EJM 2027 | 15 a 17 Jan em Sumaré-SP | 1º Lote Aberto",
    description:
      "EJM 2027 na Estância Árvore da Vida (15 a 17/01, Sumaré-SP). Ouro VIP R$ 599,99 ou Sem Acomodação R$ 480,00 com 9 refeições em até 3x sem juros!",
    canonical: `${SITE_ORIGIN}/`,
    robots: "index, follow, max-image-preview:large",
    ogTitle: "EJM 2027 • 15 a 17/Jan | 1º Lote: Ouro VIP e Sem Acomodação",
    ogDescription:
      "Estância Árvore da Vida (Sumaré-SP). 1º Lote a partir de R$ 480,00 ou R$ 599,99 (Ouro VIP completo) com 9 refeições em até 3x sem juros!",
    jsonLd: HOME_JSON_LD,
  },
  store: {
    title: "Loja Oficial | EJM 2027",
    description:
      "Reserve a Camiseta Oficial EJM 2027 (PP ao XG) por R$ 70,00 via Pix sem taxa com retirada no credenciamento do evento.",
    canonical: `${SITE_ORIGIN}/loja`,
    robots: "index, follow, max-image-preview:large",
    ogTitle: "Loja Oficial EJM 2027 | Camiseta Oficial Efésios 5:18",
    ogDescription:
      "Reserve a Camiseta Oficial do EJM 2027 por R$ 70,00 via Pix sem taxa e retire presencialmente no evento sem frete.",
    jsonLd: STORE_JSON_LD,
  },
  privacy: {
    title: "Política de Privacidade | EJM 2027",
    description:
      "Política de Privacidade e preferências de cookies do site oficial do EJM 2027 (Igreja Cristo em Vós).",
    canonical: `${SITE_ORIGIN}/privacidade`,
    robots: "noindex, follow",
    ogTitle: "Política de Privacidade | EJM 2027",
    ogDescription:
      "Transparência sobre ferramentas de medição, cookies e seus direitos LGPD/GDPR no site do EJM 2027.",
    jsonLd: null,
  },
  not_found: {
    title: "Página não encontrada | EJM 2027",
    description: "O endereço acessado não foi encontrado no site oficial do EJM 2027.",
    canonical: `${SITE_ORIGIN}/`,
    robots: "noindex, nofollow",
    ogTitle: "Página não encontrada | EJM 2027",
    ogDescription: "Volte para a página oficial do EJM 2027.",
    jsonLd: null,
  },
};

function upsertMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string): void {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

function upsertJsonLd(data: Record<string, unknown> | null): void {
  const existing = document.getElementById("ejm-route-jsonld");
  if (!data) {
    existing?.remove();
    return;
  }
  const script = existing ?? document.createElement("script");
  script.id = "ejm-route-jsonld";
  script.setAttribute("type", "application/ld+json");
  script.textContent = JSON.stringify(data);
  if (!existing) {
    document.head.appendChild(script);
  }
}

export function applyRouteSeo(route: RouteSeoKey): void {
  if (typeof document === "undefined") return;
  const spec = ROUTE_SEO[route];
  document.title = spec.title;
  upsertMeta("name", "description", spec.description);
  upsertMeta("name", "robots", spec.robots);
  upsertCanonical(spec.canonical);
  upsertMeta("property", "og:url", spec.canonical);
  upsertMeta("property", "og:title", spec.ogTitle);
  upsertMeta("property", "og:description", spec.ogDescription);
  upsertMeta("name", "twitter:title", spec.ogTitle);
  upsertMeta("name", "twitter:description", spec.ogDescription);
  upsertJsonLd(spec.jsonLd);
}
