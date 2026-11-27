import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

function prerenderStoreRouteHtml(): Plugin {
  return {
    name: "ejm-prerender-store-html",
    closeBundle() {
      const distIndexPath = path.resolve(__dirname, "dist/index.html");
      if (!fs.existsSync(distIndexPath)) return;

      const storeJsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: "https://ejm.cristoemvos.com/" },
              { "@type": "ListItem", position: 2, name: "Loja Oficial", item: "https://ejm.cristoemvos.com/loja" },
            ],
          },
          {
            "@type": "Product",
            name: "Camiseta Oficial EJM 2027",
            image: ["https://ejm.cristoemvos.com/camiseta-ejm.jpg"],
            description:
              "Modelagem unissex preta (PP ao XG) com estampa frente e costas (Efésios 5:18). Retirada presencial no credenciamento do EJM 2027 sem frete.",
            brand: { "@type": "Brand", name: "EJM 2027 - Igreja Cristo em Vós" },
            sku: "camiseta-ejm-2027",
            offers: {
              "@type": "Offer",
              url: "https://ejm.cristoemvos.com/loja",
              priceCurrency: "BRL",
              price: "70.00",
              priceValidUntil: "2027-01-17",
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
            },
          },
        ],
      });

      const homeHtml = fs.readFileSync(distIndexPath, "utf-8");
      const storeHtml = homeHtml
        .replace(
          /<title>.*?<\/title>/s,
          "<title>Loja Oficial | EJM 2027</title>"
        )
        .replace(
          /<meta\s+name="description"[\s\S]*?\/>/,
          '<meta name="description" content="Reserve a Camiseta Oficial EJM 2027 (PP ao XG) por R$ 70,00 via Pix sem taxa com retirada no credenciamento do evento." />'
        )
        .replace(
          /<link rel="canonical" href="https:\/\/ejm\.cristoemvos\.com\/" \/>/,
          '<link rel="canonical" href="https://ejm.cristoemvos.com/loja" />'
        )
        .replace(
          /<meta property="og:url" content="https:\/\/ejm\.cristoemvos\.com\/" \/>/,
          '<meta property="og:url" content="https://ejm.cristoemvos.com/loja" />'
        )
        .replace(
          /<meta property="og:title" content="[^"]*" \/>/,
          '<meta property="og:title" content="Loja Oficial EJM 2027 | Camiseta Oficial Efésios 5:18" />'
        )
        .replace(
          /<meta\s+property="og:description"[\s\S]*?\/>/,
          '<meta property="og:description" content="Reserve a Camiseta Oficial do EJM 2027 por R$ 70,00 via Pix sem taxa e retire presencialmente no evento sem frete." />'
        )
        .replace(
          /<meta name="twitter:title" content="[^"]*" \/>/,
          '<meta name="twitter:title" content="Loja Oficial EJM 2027 | Camiseta Oficial Efésios 5:18" />'
        )
        .replace(
          /<meta\s+name="twitter:description"[\s\S]*?\/>/,
          '<meta name="twitter:description" content="Reserve a Camiseta Oficial do EJM 2027 por R$ 70,00 via Pix sem taxa e retire no credenciamento." />'
        )
        .replace(
          /<!-- Structured Data \(Event \+ Offers \+ FAQPage\) -->/,
          "<!-- Structured Data (BreadcrumbList + Product) -->"
        )
        .replace(
          /<script id="ejm-route-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/,
          `<script id="ejm-route-jsonld" type="application/ld+json">${storeJsonLd}</script>`
        );

      const storeDir = path.resolve(__dirname, "dist/loja");
      fs.mkdirSync(storeDir, { recursive: true });
      fs.writeFileSync(path.join(storeDir, "index.html"), storeHtml, "utf-8");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    prerenderStoreRouteHtml(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          "ui-vendor": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-slot",
            "lucide-react",
          ],
        },
      },
    },
  },
}));
