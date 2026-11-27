// Compatibility facade re-exporting from the unified consent & analytics modules.
export {
  NOTICE_VERSION,
  getRegion,
  readConsent,
  isTrackingAllowed as isAllowed,
} from "@/lib/consent";
export type { ConsentRecord } from "@/lib/analytics/types";
export {
  initAnalytics as startPixel,
  saveConsentAndSync as saveConsent,
  trackPageView,
  trackCheckoutClick,
} from "@/lib/analytics";
