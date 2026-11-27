import { beforeEach, describe, expect, it } from "vitest";
import { captureAttribution, getActiveAttribution, getFirstTouchAttribution } from "@/lib/attribution";
import { buildCheckoutUrl, CHECKOUT_BASE_URL } from "@/lib/checkout";

describe("attribution & checkout UTM propagation", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  });

  it("returns clean checkout URL when no campaign params exist", () => {
    expect(buildCheckoutUrl()).toBe(CHECKOUT_BASE_URL);
  });

  it("captures UTM and fbclid parameters and propagates them to eisme checkout", () => {
    captureAttribution("?utm_source=meta&utm_campaign=lote1&fbclid=fb_123", "/", "");
    const active = getActiveAttribution();
    expect(active?.utm_source).toBe("meta");
    expect(active?.utm_campaign).toBe("lote1");
    expect(active?.fbclid).toBe("fb_123");

    const url = new URL(buildCheckoutUrl());
    expect(url.origin + url.pathname).toBe(CHECKOUT_BASE_URL);
    expect(url.searchParams.get("utm_source")).toBe("meta");
    expect(url.searchParams.get("utm_campaign")).toBe("lote1");
    expect(url.searchParams.get("fbclid")).toBe("fb_123");
  });

  it("cleanly replaces last-touch click ID while preserving first-touch", () => {
    captureAttribution("?utm_source=meta&fbclid=old_fb", "/", "");
    captureAttribution("?utm_source=google&gclid=new_gclid", "/", "");

    const active = getActiveAttribution();
    const first = getFirstTouchAttribution();

    expect(active?.utm_source).toBe("google");
    expect(active?.gclid).toBe("new_gclid");
    expect(active?.fbclid).toBeUndefined();
    expect(first?.utm_source).toBe("meta");
    expect(first?.fbclid).toBe("old_fb");
  });
});
