import { ANALYTICS_CONFIG } from "@/lib/analytics/config";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;
let defaultConsentSet = false;

function ensureGtagStub(): void {
  if (typeof window === "undefined") return;
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  if (!window.gtag) {
    // Must push native `arguments` (IArguments) so GTM/gtag Consent Mode v2 parses reliably
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }
}

export function setGa4DefaultConsent(granted: boolean): void {
  const tagId = ANALYTICS_CONFIG.ga4MeasurementId;
  if (typeof window === "undefined" || !tagId || defaultConsentSet) return;
  defaultConsentSet = true;
  ensureGtagStub();
  const state = granted ? "granted" : "denied";
  window.gtag?.("consent", "default", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
    wait_for_update: 500,
  });
}

export function initGa4(granted: boolean): void {
  const tagId = ANALYTICS_CONFIG.ga4MeasurementId;
  if (typeof window === "undefined" || !tagId) return;

  setGa4DefaultConsent(granted);

  if (!initialized) {
    // When consent is denied (EU/GPC), keep Consent Mode default=denied without downloading gtm.js/gtag.js
    if (!granted) return;

    initialized = true;
    ensureGtagStub();
    updateGa4Consent(true);

    if (ANALYTICS_CONFIG.isGtmContainer) {
      if (!document.getElementById("ejm-gtm-script")) {
        window.dataLayer?.push({
          "gtm.start": Date.now(),
          event: "gtm.js",
        });

        const script = document.createElement("script");
        script.id = "ejm-gtm-script";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tagId)}`;
        document.head.appendChild(script);
      }
    } else {
      window.gtag?.("js", new Date());
      window.gtag?.("config", tagId, {
        send_page_view: false,
        anonymize_ip: true,
      });

      if (!document.getElementById("ejm-ga4-script")) {
        const script = document.createElement("script");
        script.id = "ejm-ga4-script";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
        document.head.appendChild(script);
      }
    }
  } else {
    updateGa4Consent(granted);
  }
}

export function updateGa4Consent(granted: boolean): void {
  const tagId = ANALYTICS_CONFIG.ga4MeasurementId;
  if (typeof window === "undefined" || !tagId) return;
  ensureGtagStub();
  const state = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
}

export function trackGa4Event(name: string, params?: Record<string, unknown>): void {
  const tagId = ANALYTICS_CONFIG.ga4MeasurementId;
  if (typeof window === "undefined" || !tagId || !initialized) return;

  if (ANALYTICS_CONFIG.isGtmContainer) {
    // Clear previous ecommerce object before pushing new ecommerce payload to avoid GTM variable bleed
    if (params && "items" in params) {
      window.dataLayer?.push({ ecommerce: null });
    }
    window.dataLayer?.push({
      event: name,
      attendant_name: undefined,
      attendant_role: undefined,
      ...(params ?? {}),
    });
    return;
  }

  window.gtag?.("event", name, params ?? {});
}

export function resetGa4ForTests(): void {
  initialized = false;
  defaultConsentSet = false;
}
