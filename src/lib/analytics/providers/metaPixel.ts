import { ANALYTICS_CONFIG } from "@/lib/analytics/config";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initialized = false;

function callFbq(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  const f = window.fbq;
  if (!f) return;
  if (f.callMethod) {
    f.callMethod(...args);
  } else {
    f.queue.push(args);
  }
}

export function isMetaPixelInitialized(): boolean {
  return initialized;
}

export function initMetaPixel(): void {
  const pixelId = ANALYTICS_CONFIG.metaPixelId;
  if (typeof window === "undefined" || !pixelId) return;

  if (initialized) {
    callFbq("consent", "grant");
    return;
  }

  initialized = true;

  if (!window.fbq) {
    const n = ((...args: unknown[]) => {
      if (n.callMethod) {
        n.callMethod(...args);
      } else {
        n.queue.push(args);
      }
    }) as Fbq;

    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    window.fbq = n;

    const script = document.createElement("script");
    script.id = "ejm-meta-pixel-script";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  callFbq("init", pixelId);
  callFbq("track", "PageView");
}

export function revokeMetaPixelConsent(): void {
  if (!initialized) return;
  callFbq("consent", "revoke");
}

export function trackMetaStandard(
  eventName: string,
  params?: Record<string, unknown>,
  eventID?: string
): void {
  if (!initialized) return;
  if (eventID) {
    callFbq("track", eventName, params ?? {}, { eventID });
  } else if (params) {
    callFbq("track", eventName, params);
  } else {
    callFbq("track", eventName);
  }
}

export function trackMetaCustom(
  eventName: string,
  params?: Record<string, unknown>,
  eventID?: string
): void {
  if (!initialized) return;
  if (eventID) {
    callFbq("trackCustom", eventName, params ?? {}, { eventID });
  } else if (params) {
    callFbq("trackCustom", eventName, params);
  } else {
    callFbq("trackCustom", eventName);
  }
}

export function resetMetaPixelForTests(): void {
  initialized = false;
}
