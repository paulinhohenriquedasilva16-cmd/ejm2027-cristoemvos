const rawGoogleTag = (
  import.meta.env.VITE_GTM_ID ||
  import.meta.env.VITE_GA4_MEASUREMENT_ID ||
  "GTM-5Z2X4S64"
).trim();

export const ANALYTICS_CONFIG = {
  metaPixelId: (import.meta.env.VITE_META_PIXEL_ID || "1686838763021905").trim(),
  ga4MeasurementId: rawGoogleTag,
  isGtmContainer: rawGoogleTag.toUpperCase().startsWith("GTM-"),
  clarityProjectId: (import.meta.env.VITE_CLARITY_PROJECT_ID || "zjz366pma7").trim(),
  debug: import.meta.env.VITE_ANALYTICS_DEBUG === "true",
} as const;
