import type { AttributionData } from "@/lib/analytics/types";

export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "ttclid",
] as const;

type AttributionParamKey = (typeof ATTRIBUTION_PARAMS)[number];

const SESSION_KEY = "ejm_attr_session_v1";
const LAST_TOUCH_KEY = "ejm_attr_last_v1";
const FIRST_TOUCH_KEY = "ejm_attr_first_v1";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function safeGet(storage: Storage | undefined, key: string): AttributionData | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AttributionData;
    if (!parsed || typeof parsed.captured_at !== "string") return null;
    const age = Date.now() - Date.parse(parsed.captured_at);
    if (Number.isNaN(age) || age > TTL_MS) {
      storage.removeItem(key);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function safeSet(storage: Storage | undefined, key: string, data: AttributionData): void {
  if (!storage) return;
  try {
    storage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage unavailable
  }
}

export function extractAttributionFromSearch(
  search: string,
  pathname = "/",
  referrer = ""
): AttributionData | null {
  const params = new URLSearchParams(search);
  const collected: Partial<Record<AttributionParamKey, string>> = {};
  let hasAny = false;

  for (const key of ATTRIBUTION_PARAMS) {
    const val = params.get(key)?.trim();
    if (val) {
      collected[key] = val;
      hasAny = true;
    }
  }

  if (!hasAny) return null;

  return {
    ...collected,
    landing_page: pathname,
    referrer: referrer || undefined,
    captured_at: new Date().toISOString(),
  };
}

export function captureAttribution(
  search = typeof window !== "undefined" ? window.location.search : "",
  pathname = typeof window !== "undefined" ? window.location.pathname : "/",
  referrer = typeof document !== "undefined" ? document.referrer : "",
  allowPersistentStorage = true
): AttributionData | null {
  if (typeof window === "undefined") return null;

  const incoming = extractAttributionFromSearch(search, pathname, referrer);
  if (incoming) {
    safeSet(window.sessionStorage, SESSION_KEY, incoming);
    if (allowPersistentStorage) {
      safeSet(window.localStorage, LAST_TOUCH_KEY, incoming);
      const existingFirst = safeGet(window.localStorage, FIRST_TOUCH_KEY);
      if (!existingFirst) {
        safeSet(window.localStorage, FIRST_TOUCH_KEY, incoming);
      }
    }
    window.dispatchEvent(new Event("ejm-attribution-updated"));
    return incoming;
  }

  return getActiveAttribution();
}

export function getActiveAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;
  return (
    safeGet(window.sessionStorage, SESSION_KEY) ??
    safeGet(window.localStorage, LAST_TOUCH_KEY) ??
    safeGet(window.localStorage, FIRST_TOUCH_KEY)
  );
}

export function getFirstTouchAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;
  return safeGet(window.localStorage, FIRST_TOUCH_KEY);
}

export function clearPersistentAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LAST_TOUCH_KEY);
    window.localStorage.removeItem(FIRST_TOUCH_KEY);
  } catch {
    // ignore
  }
}
