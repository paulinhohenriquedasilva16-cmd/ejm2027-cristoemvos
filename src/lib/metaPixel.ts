// Meta Pixel with regional consent. Pixel loads freely outside consent regions;
// inside them (or when region is unknown) only after the visitor accepts.
const PIXEL_ID = "1686838763021905";
const CONSENT_KEY = "ejm_ads_consent";
export const NOTICE_VERSION = "2026-11-07";

const CONSENT_COUNTRIES = new Set([
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE",
  "IS","LI","NO","GB","CH",
]);

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][]; push: Fbq; loaded: boolean; version: string;
};
declare global {
  interface Window { fbq?: Fbq; _fbq?: Fbq }
  interface Navigator { globalPrivacyControl?: boolean }
}

export type ConsentRecord = { choice: "granted" | "denied"; at: string; noticeVersion: string; region: string };

let region: Promise<{ country: string; needsConsent: boolean }> | null = null;
let initialized = false;

export const getRegion = () => {
  if (!region) {
    region = (async () => {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 2000);
        const res = await fetch("/cdn-cgi/trace", { signal: ctrl.signal });
        clearTimeout(t);
        if (!res.ok) throw new Error();
        const txt = await res.text();
        const country = /loc=(\w+)/.exec(txt)?.[1] ?? "XX";
        const host = /h=([^\n]+)/.exec(txt)?.[1]?.trim();
        if (country === "XX" || country === "T1" || (host && host !== location.host)) throw new Error();
        return { country, needsConsent: CONSENT_COUNTRIES.has(country) };
      } catch {
        return { country: "XX", needsConsent: true };
      }
    })();
  }
  return region;
};

export const readConsent = (): ConsentRecord | null => {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || "null"); } catch { return null; }
};

const call = (...args: unknown[]) => {
  const f = window.fbq;
  if (!f) return;
  if (f.callMethod) f.callMethod.apply(f, args); else f.queue.push(args);
};

const loadPixel = () => {
  if (initialized) { call("consent", "grant"); return; }
  initialized = true;
  if (!window.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod.apply(n, args); else n.queue.push(args);
    } as Fbq;
    if (!window._fbq) window._fbq = n;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    window.fbq = n;
    const s = document.createElement("script");
    s.async = true; s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
  }
  call("init", PIXEL_ID, {}, { agent: "lovable" });
  call("track", "PageView");
};

/** Whether advertising tracking is allowed right now (read fresh each time). */
export const isAllowed = async () => {
  if (navigator.globalPrivacyControl) return false;
  const c = readConsent();
  if (c?.choice === "denied") return false;
  if (c?.choice === "granted") return true;
  return !(await getRegion()).needsConsent;
};

export const startPixel = async () => { if (await isAllowed()) loadPixel(); };

export const saveConsent = async (choice: "granted" | "denied") => {
  const { country } = await getRegion();
  const rec: ConsentRecord = { choice, at: new Date().toISOString(), noticeVersion: NOTICE_VERSION, region: country };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(rec));
  window.dispatchEvent(new Event("ejm-consent-change"));
  if (choice === "granted") await startPixel();
  else if (initialized) call("consent", "revoke");
};

let lastPath = "";
export const trackPageView = async (path: string) => {
  if (path === lastPath) return;
  const first = !lastPath;
  lastPath = path;
  if (first || !initialized || !(await isAllowed())) return; // first PageView sent on init
  call("track", "PageView");
};

export const trackCheckoutClick = async (url: string) => {
  if (!initialized || !(await isAllowed())) return;
  const id = `ic_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  call("track", "InitiateCheckout", { content_name: "EJM 2027", content_category: "ingresso", value: 599.99, currency: "BRL" }, { eventID: id });
  void url;
};

// Cross-tab: apply consent changes immediately.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key !== CONSENT_KEY) return;
    const c = readConsent();
    if (c?.choice === "denied" && initialized) call("consent", "revoke");
    else void startPixel();
  });
}
