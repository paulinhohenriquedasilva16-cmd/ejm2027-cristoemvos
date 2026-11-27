import { ANALYTICS_CONFIG } from "@/lib/analytics/config";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

let initialized = false;

export function initClarity(granted: boolean): void {
  const projectId = ANALYTICS_CONFIG.clarityProjectId;
  if (typeof window === "undefined" || !projectId || !granted) return;

  if (!initialized) {
    initialized = true;
    if (!window.clarity) {
      const fn: ClarityFn = (...args: unknown[]) => {
        (fn.q = fn.q || []).push(args);
      };
      window.clarity = fn;
    }

    if (!document.getElementById("ejm-clarity-script")) {
      const script = document.createElement("script");
      script.id = "ejm-clarity-script";
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
      document.head.appendChild(script);
    }
  }

  window.clarity?.("consentv2", {
    ad_Storage: "granted",
    analytics_Storage: "granted",
  });
}

export function revokeClarityConsent(): void {
  if (!initialized || typeof window === "undefined") return;
  window.clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "denied",
  });
}

export function setClarityTag(key: string, value: string): void {
  if (!initialized || typeof window === "undefined" || !value) return;
  window.clarity?.("set", key, value);
}

export function trackClarityEvent(eventName: string): void {
  if (!initialized || typeof window === "undefined") return;
  window.clarity?.("event", eventName);
}

export function resetClarityForTests(): void {
  initialized = false;
}
