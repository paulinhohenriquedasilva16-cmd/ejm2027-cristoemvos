import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getRegion,
  getSyncConsentState,
  persistConsentChoice,
  resetConsentCacheForTests,
  resolveConsentState,
} from "@/lib/consent";

describe("resilient LGPD/GDPR consent resolution", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    resetConsentCacheForTests();
    Object.defineProperty(navigator, "globalPrivacyControl", {
      value: false,
      configurable: true,
    });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("does NOT drop Brazilian traffic when /cdn-cgi/trace returns 404 or SPA HTML", async () => {
    vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockReturnValue({
      timeZone: "America/Sao_Paulo",
    } as Intl.ResolvedDateTimeFormatOptions);

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      headers: new Headers({ "content-type": "text/html" }),
      text: async () => "<!doctype html><html></html>",
    } as Response).mockRejectedValueOnce(new Error("offline"));

    const region = await getRegion();
    expect(region.needsConsent).toBe(false);
    expect(region.country).toBe("BR_FALLBACK");

    const state = await resolveConsentState();
    expect(state.analyticsAllowed).toBe(true);
    expect(state.marketingAllowed).toBe(true);
  });

  it("requires explicit opt-in for EU countries returned by IP API", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      headers: new Headers(),
      text: async () => "",
    } as Response).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ country: "DE" }),
    } as Response);

    const state = await resolveConsentState();
    expect(state.country).toBe("DE");
    expect(state.needsConsent).toBe(true);
    expect(state.marketingAllowed).toBe(false);
  });

  it("honors Global Privacy Control even in Brazil", () => {
    Object.defineProperty(navigator, "globalPrivacyControl", {
      value: true,
      configurable: true,
    });

    const state = getSyncConsentState();
    expect(state.source).toBe("gpc");
    expect(state.marketingAllowed).toBe(false);
    expect(state.analyticsAllowed).toBe(false);
  });

  it("persists user consent choice cleanly", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ "content-type": "text/plain" }),
      text: async () => "loc=BR\n",
    } as Response);

    const denied = await persistConsentChoice("denied");
    expect(denied.marketingAllowed).toBe(false);

    const granted = await persistConsentChoice("granted");
    expect(granted.marketingAllowed).toBe(true);
  });
});
