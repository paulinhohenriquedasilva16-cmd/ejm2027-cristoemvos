import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureAttribution } from "@/lib/attribution";
import { canTrackSync } from "@/lib/consent";

// Capture UTMs / click IDs synchronously before first React render so CheckoutLink has them immediately
captureAttribution(
  window.location.search,
  window.location.pathname,
  document.referrer,
  canTrackSync()
);

createRoot(document.getElementById("root")!).render(<App />);
