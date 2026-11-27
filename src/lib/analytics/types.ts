export type TicketSkuId =
  | "ouro-vip"
  | "ouro-sem-acomodacao"
  | "infantil-5-10"
  | "infantil-0-4"
  | "geral";

export type CheckoutSource =
  | "navbar"
  | "hero"
  | "pricing_card"
  | "pricing_child"
  | "accommodations_cta"
  | "accommodation_modal"
  | "schedule"
  | "faq"
  | "mobile_sticky"
  | "quiz"
  | "stories";

export type WhatsAppChannel =
  | "caravans"
  | "support_team"
  | "official_group"
  | "share_parents"
  | "share_crew"
  | "store"
  | "footer";

export type ConsentChoice = "granted" | "denied";

export type ConsentRegionSource =
  | "cf_trace"
  | "ip_api"
  | "tz_fallback"
  | "safe_fallback"
  | "stored"
  | "gpc";

export interface ConsentRecord {
  choice: ConsentChoice;
  at: string;
  noticeVersion: string;
  region: string;
}

export interface RegionInfo {
  country: string;
  needsConsent: boolean;
  source: Exclude<ConsentRegionSource, "stored" | "gpc">;
}

export interface ConsentState {
  choice: ConsentChoice | null;
  country: string;
  needsConsent: boolean;
  source: ConsentRegionSource;
  analyticsAllowed: boolean;
  marketingAllowed: boolean;
  noticeVersion: string;
  at?: string;
}

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  fbclid?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  ttclid?: string;
  landing_page?: string;
  referrer?: string;
  captured_at: string;
}

export interface AnalyticsEventMap {
  page_view: { path: string; title: string; language: string; is_initial?: boolean };
  section_view: { section_id: string };
  scroll_depth: { percent: 25 | 50 | 75 | 90 };
  initiate_checkout: {
    event_id: string;
    source: CheckoutSource;
    ticket_id: TicketSkuId;
    ticket_name: string;
    value: number;
    currency: "BRL";
    accommodation_name?: string;
  };
  view_accommodation: {
    accommodation_id: string;
    accommodation_name: string;
    accommodation_type: "Inclusa no ingresso" | "Privativo · Custo adicional";
    sold_out: boolean;
  };
  schedule_day_select: { day_id: string; day_label: string };
  store_modal_open: { product_id: string; product_name: string; value: number };
  store_reserve_submit: {
    event_id: string;
    product_id: string;
    product_name: string;
    size: string;
    quantity: number;
    value: number;
    currency: "BRL";
  };
  store_pix_copy: { product_id: string; product_name: string; value: number };
  whatsapp_click: {
    channel: WhatsAppChannel;
    attendant_name?: string;
    attendant_role?: string;
  };
  accordion_toggle: {
    scope: "pricing_meals" | "faq";
    item_id: string;
    label: string;
    open: boolean;
  };
  map_directions_click: { destination: string };
  language_change: { from_lang: string; to_lang: string };
  gallery_filter_select: { filter: string };
  gallery_like: { photo_id: string };
  stories_open: { slides: number };
  stories_complete: { slides: number };
  quiz_complete: { stay: string; who: string; recommended: TicketSkuId };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;
