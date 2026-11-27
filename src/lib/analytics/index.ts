import { ANALYTICS_CONFIG } from "@/lib/analytics/config";
import type {
  AnalyticsEventMap,
  AnalyticsEventName,
  CheckoutSource,
  ConsentChoice,
  ConsentState,
  TicketSkuId,
} from "@/lib/analytics/types";
import { clearPersistentAttribution, getActiveAttribution } from "@/lib/attribution";
import {
  canTrackSync,
  getSyncConsentState,
  persistConsentChoice,
  resolveConsentState,
} from "@/lib/consent";
import {
  initClarity,
  resetClarityForTests,
  revokeClarityConsent,
  setClarityTag,
  trackClarityEvent,
} from "@/lib/analytics/providers/clarity";
import {
  initGa4,
  resetGa4ForTests,
  trackGa4Event,
  updateGa4Consent,
} from "@/lib/analytics/providers/ga4";
import {
  initMetaPixel,
  isMetaPixelInitialized,
  resetMetaPixelForTests,
  revokeMetaPixelConsent,
  trackMetaCustom,
  trackMetaStandard,
} from "@/lib/analytics/providers/metaPixel";
import { TICKET_CATALOG } from "@/lib/checkout";

interface QueuedEvent {
  name: AnalyticsEventName;
  payload: AnalyticsEventMap[AnalyticsEventName];
  enqueuedAt: number;
}

const MAX_QUEUE = 20;
const QUEUE_TTL_MS = 10_000;

const ROUTE_TITLES: Record<string, string> = {
  "/": "EJM 2027 | 15 a 17 Jan em Sumaré-SP | 1º Lote Aberto",
  "/loja": "Loja Oficial | EJM 2027",
  "/privacidade": "Política de Privacidade | EJM 2027",
};

let bootstrapped = false;
let lastTrackedPath = "";
let queue: QueuedEvent[] = [];

export function generateEventId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function getRouteTitle(path: string): string {
  return (
    ROUTE_TITLES[path] ??
    (typeof document !== "undefined" ? document.title : "EJM 2027") ??
    "EJM 2027"
  );
}

function applyClarityContextTags(country: string): void {
  const attr = getActiveAttribution();
  if (attr?.utm_source) setClarityTag("utm_source", attr.utm_source);
  if (attr?.utm_campaign) setClarityTag("utm_campaign", attr.utm_campaign);
  if (attr?.utm_medium) setClarityTag("utm_medium", attr.utm_medium);
  if (country) setClarityTag("country", country);
  if (typeof document !== "undefined" && document.documentElement.lang) {
    setClarityTag("language", document.documentElement.lang);
  }
}

function dispatchToProviders<K extends AnalyticsEventName>(
  name: K,
  payload: AnalyticsEventMap[K]
): void {
  if (ANALYTICS_CONFIG.debug && typeof console !== "undefined") {
    console.debug(`[EJM Analytics] ${name}`, payload);
  }

  const attr = getActiveAttribution();
  const attrProps = attr
    ? {
        ...(attr.utm_source ? { utm_source: attr.utm_source } : {}),
        ...(attr.utm_medium ? { utm_medium: attr.utm_medium } : {}),
        ...(attr.utm_campaign ? { utm_campaign: attr.utm_campaign } : {}),
        ...(attr.utm_content ? { utm_content: attr.utm_content } : {}),
      }
    : {};

  switch (name) {
    case "page_view": {
      const p = payload as AnalyticsEventMap["page_view"];
      trackGa4Event("page_view", {
        page_path: p.path,
        page_title: p.title,
        language: p.language,
        ...attrProps,
      });
      // Initial Meta PageView is sent during initMetaPixel(); fire on subsequent SPA route changes only
      if (isMetaPixelInitialized() && !p.is_initial) {
        trackMetaStandard("PageView");
      }
      break;
    }

    case "initiate_checkout": {
      const p = payload as AnalyticsEventMap["initiate_checkout"];
      trackMetaStandard(
        "InitiateCheckout",
        {
          content_ids: [p.ticket_id],
          content_name: p.ticket_name,
          content_category: TICKET_CATALOG[p.ticket_id]?.category ?? "ingresso",
          value: p.value,
          currency: p.currency,
          cta_source: p.source,
          ...(p.accommodation_name ? { accommodation_name: p.accommodation_name } : {}),
        },
        p.event_id
      );
      trackGa4Event("begin_checkout", {
        currency: p.currency,
        value: p.value,
        cta_source: p.source,
        items: [
          {
            item_id: p.ticket_id,
            item_name: p.ticket_name,
            item_category: TICKET_CATALOG[p.ticket_id]?.category ?? "ingresso",
            price: p.value,
            quantity: 1,
          },
        ],
        ...attrProps,
      });
      setClarityTag("checkout_ticket", p.ticket_id);
      trackClarityEvent(`checkout_${p.ticket_id}`);
      break;
    }

    case "view_accommodation": {
      const p = payload as AnalyticsEventMap["view_accommodation"];
      trackMetaStandard("ViewContent", {
        content_type: "accommodation",
        content_ids: [p.accommodation_id],
        content_name: p.accommodation_name,
        content_category: p.accommodation_type,
      });
      trackGa4Event("view_item", {
        items: [
          {
            item_id: p.accommodation_id,
            item_name: p.accommodation_name,
            item_category: p.accommodation_type,
            quantity: 1,
          },
        ],
        sold_out: p.sold_out,
      });
      trackClarityEvent("view_accommodation");
      break;
    }

    case "section_view": {
      const p = payload as AnalyticsEventMap["section_view"];
      if (p.section_id === "inscricao") {
        trackMetaStandard("ViewContent", {
          content_type: "pricing",
          content_name: "Tabela de Ingressos EJM 2027",
        });
      }
      trackGa4Event("section_view", { section_id: p.section_id, ...attrProps });
      trackClarityEvent(`section_${p.section_id}`);
      break;
    }

    case "scroll_depth": {
      const p = payload as AnalyticsEventMap["scroll_depth"];
      trackGa4Event("scroll_depth", { percent_scrolled: p.percent, ...attrProps });
      break;
    }

    case "whatsapp_click": {
      const p = payload as AnalyticsEventMap["whatsapp_click"];
      if (p.channel === "share_parents") {
        trackMetaCustom("ShareParentsWhatsApp", { channel: p.channel });
      } else if (p.channel === "share_crew") {
        trackMetaCustom("ShareCrewWhatsApp", { channel: p.channel });
      } else if (p.channel === "official_group") {
        // Keep standard Meta Lead strictly for warm 1-on-1 commercial contacts
        trackMetaCustom("JoinWhatsAppGroup", { channel: p.channel });
      } else {
        trackMetaStandard("Lead", {
          content_name: `whatsapp_${p.channel}`,
          content_category: p.attendant_role ?? p.channel,
        });
      }
      const ga4Event =
        p.channel === "share_parents" || p.channel === "share_crew"
          ? "share"
          : p.channel === "official_group"
            ? "join_whatsapp_group"
            : "generate_lead";
      trackGa4Event(ga4Event, {
        method: "whatsapp",
        channel: p.channel,
        ...(p.attendant_name ? { attendant_name: p.attendant_name } : {}),
        ...(p.attendant_role ? { attendant_role: p.attendant_role } : {}),
        ...attrProps,
      });
      trackClarityEvent(`whatsapp_${p.channel}`);
      break;
    }

    case "store_modal_open": {
      const p = payload as AnalyticsEventMap["store_modal_open"];
      trackMetaStandard("ViewContent", {
        content_type: "product",
        content_ids: [p.product_id],
        content_name: p.product_name,
        value: p.value,
        currency: "BRL",
      });
      trackGa4Event("view_item", {
        currency: "BRL",
        value: p.value,
        items: [{ item_id: p.product_id, item_name: p.product_name, price: p.value, quantity: 1 }],
      });
      break;
    }

    case "store_reserve_submit": {
      const p = payload as AnalyticsEventMap["store_reserve_submit"];
      trackMetaStandard(
        "AddToCart",
        {
          content_type: "product",
          content_ids: [p.product_id],
          content_name: p.product_name,
          value: p.value,
          currency: p.currency,
          num_items: p.quantity,
        },
        p.event_id
      );
      trackGa4Event("add_to_cart", {
        currency: p.currency,
        value: p.value,
        items: [
          {
            item_id: p.product_id,
            item_name: p.product_name,
            item_variant: p.size,
            price: p.value / Math.max(1, p.quantity),
            quantity: p.quantity,
          },
        ],
      });
      trackClarityEvent("store_reserve");
      break;
    }

    case "store_pix_copy": {
      const p = payload as AnalyticsEventMap["store_pix_copy"];
      trackMetaCustom("StorePixCopied", {
        product_id: p.product_id,
        product_name: p.product_name,
        value: p.value,
        currency: "BRL",
      });
      trackGa4Event("store_pix_copy", {
        product_id: p.product_id,
        product_name: p.product_name,
        value: p.value,
        currency: "BRL",
      });
      break;
    }

    case "accordion_toggle": {
      const p = payload as AnalyticsEventMap["accordion_toggle"];
      if (p.open) {
        trackMetaCustom(
          p.scope === "pricing_meals" ? "MealsAccordionOpened" : "FAQItemOpened",
          { item_id: p.item_id, label: p.label }
        );
        trackGa4Event("accordion_toggle", { ...p });
      }
      break;
    }

    case "schedule_day_select": {
      const p = payload as AnalyticsEventMap["schedule_day_select"];
      trackGa4Event("schedule_day_select", { ...p });
      break;
    }

    case "map_directions_click": {
      const p = payload as AnalyticsEventMap["map_directions_click"];
      trackGa4Event("map_directions_click", { ...p });
      break;
    }

    case "language_change": {
      const p = payload as AnalyticsEventMap["language_change"];
      trackGa4Event("language_change", { ...p });
      break;
    }

    case "gallery_filter_select":
    case "gallery_like":
    case "stories_open":
    case "stories_complete":
    case "quiz_complete": {
      trackGa4Event(name, { ...(payload as Record<string, unknown>) });
      if (name === "stories_open" || name === "stories_complete" || name === "quiz_complete") {
        trackClarityEvent(name);
      }
      break;
    }
  }
}

function flushQueue(): void {
  const now = Date.now();
  const valid = queue.filter((item) => now - item.enqueuedAt <= QUEUE_TTL_MS);
  queue = [];
  for (const item of valid) {
    dispatchToProviders(item.name, item.payload);
  }
}

function activateProviders(country: string): void {
  const wasBootstrapped = bootstrapped;
  initMetaPixel();
  initGa4(true);
  initClarity(true);
  applyClarityContextTags(country);
  bootstrapped = true;
  flushQueue();

  // Ensure initial GA4/GTM page_view is recorded once providers activate (e.g., after IP confirmation or consent accept)
  if (!wasBootstrapped && typeof window !== "undefined" && !lastTrackedPath) {
    trackPageView(window.location.pathname);
  }
}

function deactivateProviders(): void {
  revokeMetaPixelConsent();
  updateGa4Consent(false);
  revokeClarityConsent();
  clearPersistentAttribution();
  queue = [];
}

export function syncProvidersWithState(state: ConsentState): void {
  if (state.analyticsAllowed && state.marketingAllowed) {
    activateProviders(state.country);
  } else {
    deactivateProviders();
  }
}

export async function initAnalytics(): Promise<{ needsBanner: boolean }> {
  const syncState = getSyncConsentState();

  // Only bootstrap synchronously when backed by explicit stored consent or cached IP region (prevents EU traveler leak)
  const canBootstrapSynchronously =
    syncState.analyticsAllowed &&
    syncState.marketingAllowed &&
    (syncState.source === "stored" ||
      syncState.source === "cf_trace" ||
      syncState.source === "ip_api");

  if (canBootstrapSynchronously) {
    activateProviders(syncState.country);
  } else {
    // Establish denied Consent Mode default without injecting external scripts yet
    initGa4(false);
  }

  const resolved = await resolveConsentState();

  if (resolved.analyticsAllowed && resolved.marketingAllowed) {
    activateProviders(resolved.country);
    return { needsBanner: false };
  }

  if (bootstrapped) {
    deactivateProviders();
  } else {
    clearPersistentAttribution();
  }

  const needsBanner = resolved.choice === null && resolved.needsConsent && resolved.source !== "gpc";
  return { needsBanner };
}

export async function saveConsentAndSync(choice: ConsentChoice): Promise<void> {
  const state = persistConsentChoice(choice);
  // Respect computed state (so GPC is never bypassed even if user clicks Accept)
  syncProvidersWithState(state);
}

export function trackEvent<K extends AnalyticsEventName>(
  name: K,
  payload: AnalyticsEventMap[K]
): void {
  if (!canTrackSync()) return;

  if (!bootstrapped) {
    if (queue.length < MAX_QUEUE) {
      queue.push({ name, payload, enqueuedAt: Date.now() });
    }
    return;
  }

  dispatchToProviders(name, payload);
}

export function trackPageView(path: string): void {
  if (!path || !canTrackSync()) return;
  if (path === lastTrackedPath) return;

  const isInitial = !lastTrackedPath;
  const language =
    (typeof document !== "undefined" ? document.documentElement.lang : "pt-BR") || "pt-BR";
  const title = getRouteTitle(path);

  lastTrackedPath = path;
  trackEvent("page_view", { path, title, language, is_initial: isInitial });
}

export function trackCheckoutClick(options: {
  source: CheckoutSource;
  ticketId?: TicketSkuId;
  url?: string;
  accommodationName?: string;
}): void {
  const ticketId: TicketSkuId = options.ticketId ?? "geral";
  const sku = TICKET_CATALOG[ticketId] ?? TICKET_CATALOG.geral;

  trackEvent("initiate_checkout", {
    event_id: generateEventId("ic"),
    source: options.source,
    ticket_id: ticketId,
    ticket_name: sku.name,
    value: sku.price,
    currency: "BRL",
    accommodation_name: options.accommodationName,
  });
}

export function resetAnalyticsForTests(): void {
  bootstrapped = false;
  lastTrackedPath = "";
  queue = [];
  resetMetaPixelForTests();
  resetGa4ForTests();
  resetClarityForTests();
}
