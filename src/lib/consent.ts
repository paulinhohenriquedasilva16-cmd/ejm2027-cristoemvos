import type {
  ConsentChoice,
  ConsentRecord,
  ConsentState,
  RegionInfo,
} from "@/lib/analytics/types";

export const CONSENT_KEY = "ejm_ads_consent";
export const GEO_SESSION_KEY = "ejm_geo_v1";
export const NOTICE_VERSION = "2026-11-26";

export const CONSENT_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "GB", "CH",
]);

const BRAZIL_TIMEZONES = new Set([
  "America/Sao_Paulo",
  "America/Fortaleza",
  "America/Recife",
  "America/Bahia",
  "America/Belem",
  "America/Manaus",
  "America/Cuiaba",
  "America/Porto_Velho",
  "America/Boa_Vista",
  "America/Rio_Branco",
  "America/Noronha",
  "America/Maceio",
  "America/Araguaina",
  "America/Santarem",
  "America/Campo_Grande",
  "America/Eirunepe",
]);

const EEA_EXTRA_TIMEZONES = new Set([
  "Atlantic/Azores",
  "Atlantic/Madeira",
  "Atlantic/Canary",
  "Atlantic/Reykjavik",
  "Atlantic/Faroe",
]);

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

let cachedRegion: RegionInfo | null = null;
let pendingRegionPromise: Promise<RegionInfo> | null = null;

export function resetConsentCacheForTests(): void {
  cachedRegion = null;
  pendingRegionPromise = null;
}

export function isGlobalPrivacyControlEnabled(): boolean {
  return typeof navigator !== "undefined" && Boolean(navigator.globalPrivacyControl);
}

export function inferLocalGeo(): RegionInfo {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (typeof navigator !== "undefined" ? navigator.language : "") || "";

    if (lang.toLowerCase() === "pt-pt" || tz.startsWith("Europe/") || EEA_EXTRA_TIMEZONES.has(tz)) {
      return { country: "EU_FALLBACK", needsConsent: true, source: "tz_fallback" };
    }

    if (BRAZIL_TIMEZONES.has(tz) || (tz.startsWith("America/") && lang.toLowerCase().startsWith("pt"))) {
      return { country: "BR_FALLBACK", needsConsent: false, source: "tz_fallback" };
    }
  } catch {
    // Intl unavailable
  }

  return { country: "XX", needsConsent: true, source: "safe_fallback" };
}

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed?.choice === "granted" || parsed?.choice === "denied") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function readCachedSessionRegion(): RegionInfo | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(GEO_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RegionInfo;
    if (parsed && typeof parsed.country === "string" && typeof parsed.needsConsent === "boolean") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeCachedSessionRegion(info: RegionInfo): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(GEO_SESSION_KEY, JSON.stringify(info));
  } catch {
    // ignore
  }
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function tryCloudflareTrace(): Promise<RegionInfo | null> {
  try {
    const res = await fetchWithTimeout("/cdn-cgi/trace", 1200);
    if (!res.ok) return null;
    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    if (contentType.includes("text/html")) return null;

    const txt = await res.text();
    if (txt.trimStart().startsWith("<")) return null;

    const country = /(?:^|\n)loc=([A-Z]{2})(?:\r?\n|$)/.exec(txt)?.[1];
    const host = /(?:^|\n)h=([^\r\n]+)/.exec(txt)?.[1]?.trim();

    if (!country || country === "XX" || country === "T1") return null;
    if (host && typeof window !== "undefined" && window.location.host && host !== window.location.host) {
      return null;
    }

    return {
      country,
      needsConsent: CONSENT_COUNTRIES.has(country),
      source: "cf_trace",
    };
  } catch {
    return null;
  }
}

async function tryCountryIsApi(): Promise<RegionInfo | null> {
  try {
    const res = await fetchWithTimeout("https://api.country.is/", 1500);
    if (!res.ok) return null;
    const data = (await res.json()) as { country?: string };
    const country = data?.country?.toUpperCase();
    if (!country || !/^[A-Z]{2}$/.test(country) || country === "XX" || country === "T1") {
      return null;
    }
    return {
      country,
      needsConsent: CONSENT_COUNTRIES.has(country),
      source: "ip_api",
    };
  } catch {
    return null;
  }
}

export async function getRegion(): Promise<RegionInfo> {
  if (cachedRegion) return cachedRegion;

  const sessionCached = readCachedSessionRegion();
  if (sessionCached) {
    cachedRegion = sessionCached;
    return sessionCached;
  }

  if (!pendingRegionPromise) {
    pendingRegionPromise = (async () => {
      const fromCf = await tryCloudflareTrace();
      if (fromCf) {
        cachedRegion = fromCf;
        writeCachedSessionRegion(fromCf);
        return fromCf;
      }

      const fromApi = await tryCountryIsApi();
      if (fromApi) {
        cachedRegion = fromApi;
        writeCachedSessionRegion(fromApi);
        return fromApi;
      }

      const fallback = inferLocalGeo();
      if (fallback.source === "tz_fallback") {
        cachedRegion = fallback;
        writeCachedSessionRegion(fallback);
      }
      return fallback;
    })().finally(() => {
      pendingRegionPromise = null;
    });
  }

  return pendingRegionPromise;
}

export function getSyncConsentState(): ConsentState {
  if (isGlobalPrivacyControlEnabled()) {
    return {
      choice: "denied",
      country: cachedRegion?.country ?? "GPC",
      needsConsent: false,
      source: "gpc",
      analyticsAllowed: false,
      marketingAllowed: false,
      noticeVersion: NOTICE_VERSION,
    };
  }

  const stored = readConsent();
  if (stored) {
    const allowed = stored.choice === "granted";
    return {
      choice: stored.choice,
      country: stored.region,
      needsConsent: false,
      source: "stored",
      analyticsAllowed: allowed,
      marketingAllowed: allowed,
      noticeVersion: stored.noticeVersion,
      at: stored.at,
    };
  }

  const region = cachedRegion ?? readCachedSessionRegion() ?? inferLocalGeo();
  const allowed = !region.needsConsent;

  return {
    choice: null,
    country: region.country,
    needsConsent: region.needsConsent,
    source: region.source,
    analyticsAllowed: allowed,
    marketingAllowed: allowed,
    noticeVersion: NOTICE_VERSION,
  };
}

export async function resolveConsentState(): Promise<ConsentState> {
  if (isGlobalPrivacyControlEnabled()) {
    return getSyncConsentState();
  }

  const stored = readConsent();
  if (stored) {
    return getSyncConsentState();
  }

  const region = await getRegion();
  const allowed = !region.needsConsent;

  return {
    choice: null,
    country: region.country,
    needsConsent: region.needsConsent,
    source: region.source,
    analyticsAllowed: allowed,
    marketingAllowed: allowed,
    noticeVersion: NOTICE_VERSION,
  };
}

export function canTrackSync(): boolean {
  const state = getSyncConsentState();
  return state.analyticsAllowed && state.marketingAllowed;
}

export async function isTrackingAllowed(): Promise<boolean> {
  const state = await resolveConsentState();
  return state.analyticsAllowed && state.marketingAllowed;
}

export function persistConsentChoice(choice: ConsentChoice): ConsentState {
  // Use instant region resolution (no blocking network wait on banner button click)
  const region = cachedRegion ?? readCachedSessionRegion() ?? inferLocalGeo();
  const rec: ConsentRecord = {
    choice,
    at: new Date().toISOString(),
    noticeVersion: NOTICE_VERSION,
    region: region.country,
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(rec));
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("ejm-consent-change"));
  }
  return getSyncConsentState();
}

export function dispatchCookieBannerVisibility(open: boolean): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ejm-cookie-banner-visibility", { detail: { open } }));
}
