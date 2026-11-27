import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  initAnalytics,
  resetAnalyticsForTests,
  saveConsentAndSync,
  trackCheckoutClick,
  trackEvent,
} from "@/lib/analytics";
import { resetConsentCacheForTests } from "@/lib/consent";

describe("unified analytics dispatcher", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    resetConsentCacheForTests();
    resetAnalyticsForTests();
    delete window.fbq;
    delete window._fbq;
    delete window.clarity;
    delete window.dataLayer;
    delete window.gtag;
    document.getElementById("ejm-meta-pixel-script")?.remove();
    document.getElementById("ejm-gtm-script")?.remove();
    document.getElementById("ejm-ga4-script")?.remove();
    document.getElementById("ejm-clarity-script")?.remove();
    Object.defineProperty(navigator, "globalPrivacyControl", {
      value: false,
      configurable: true,
    });

    vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockReturnValue({
      timeZone: "America/Sao_Paulo",
    } as Intl.ResolvedDateTimeFormatOptions);

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ "content-type": "text/plain" }),
      text: async () => "loc=BR\n",
    } as Response);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("dispatches real SKU value, GA4 ecommerce items, custom JoinWhatsAppGroup, and dynamic product_id", async () => {
    await initAnalytics();
    const fbqSpy = vi.fn();
    window.fbq = Object.assign(fbqSpy, {
      callMethod: fbqSpy,
      queue: [],
      push: fbqSpy as unknown as NonNullable<Window["fbq"]>,
      loaded: true,
      version: "2.0",
    });

    trackCheckoutClick({
      source: "pricing_card",
      ticketId: "ouro-sem-acomodacao",
    });

    expect(fbqSpy).toHaveBeenCalledWith(
      "track",
      "InitiateCheckout",
      expect.objectContaining({
        content_ids: ["ouro-sem-acomodacao"],
        value: 480,
        currency: "BRL",
        cta_source: "pricing_card",
      }),
      expect.objectContaining({ eventID: expect.stringMatching(/^ic_/) })
    );

    // Official group uses custom Meta event (not standard Lead)
    trackEvent("whatsapp_click", { channel: "official_group" });
    expect(fbqSpy).toHaveBeenCalledWith("trackCustom", "JoinWhatsAppGroup", {
      channel: "official_group",
    });

    // Dynamic product_id & product_name on future store SKUs
    trackEvent("store_modal_open", {
      product_id: "caneca-ejm-2027",
      product_name: "Caneca Oficial EJM 2027",
      value: 45,
    });
    expect(fbqSpy).toHaveBeenCalledWith(
      "track",
      "ViewContent",
      expect.objectContaining({
        content_ids: ["caneca-ejm-2027"],
        content_name: "Caneca Oficial EJM 2027",
        value: 45,
      })
    );

    // GA4 accommodation view_item uses items array
    trackEvent("view_accommodation", {
      accommodation_id: "alojamento-jundiai",
      accommodation_name: "Alojamento Jundiaí",
      accommodation_type: "Inclusa no ingresso",
      sold_out: false,
    });
    expect(window.dataLayer).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          event: "view_item",
          items: [
            expect.objectContaining({
              item_id: "alojamento-jundiai",
              item_name: "Alojamento Jundiaí",
            }),
          ],
        }),
      ])
    );
  });

  it("never activates tracking when Global Privacy Control is enabled, even if saveConsentAndSync('granted') is called", async () => {
    Object.defineProperty(navigator, "globalPrivacyControl", {
      value: true,
      configurable: true,
    });

    const { needsBanner } = await initAnalytics();
    expect(needsBanner).toBe(false);
    expect(document.getElementById("ejm-gtm-script")).toBeNull();
    expect(document.getElementById("ejm-meta-pixel-script")).toBeNull();
    expect(document.getElementById("ejm-clarity-script")).toBeNull();

    await saveConsentAndSync("granted");
    expect(document.getElementById("ejm-gtm-script")).toBeNull();
    expect(document.getElementById("ejm-meta-pixel-script")).toBeNull();
    expect(document.getElementById("ejm-clarity-script")).toBeNull();
  });
});
