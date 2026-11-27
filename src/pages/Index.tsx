import { lazy, Suspense, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import IncludedSection from "@/components/IncludedSection";
import ScheduleSection from "@/components/ScheduleSection";
import VenueSection from "@/components/VenueSection";
import ObjectionsSection from "@/components/ObjectionsSection";
import PricingSection from "@/components/PricingSection";
import WhatsAppGroupSection from "@/components/WhatsAppGroupSection";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import TickerStrip from "@/components/TickerStrip";
import StatsCounters from "@/components/StatsCounters";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { applyRouteSeo } from "@/lib/seo";

const MemoriesGallerySection = lazy(() => import("@/components/MemoriesGallerySection"));
const AccommodationsSection = lazy(() => import("@/components/AccommodationsSection"));
const SupportTeamSection = lazy(() => import("@/components/SupportTeamSection"));
const StoreSection = lazy(() => import("@/components/StoreSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));

const SectionFallback = () => (
  <div className="section-padding bg-background">
    <div className="mx-auto h-40 max-w-5xl animate-pulse rounded-2xl bg-muted/60" />
  </div>
);

const Index = () => {
  useEffect(() => {
    applyRouteSeo("home");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-full focus:bg-graphite focus:px-4 focus:py-3 focus:font-body focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      <ScrollProgressBar />
      <Navbar />

      <main id="conteudo-principal">
        <HeroSection />
        <TickerStrip />
        <AboutSection />
        <StatsCounters />
        <Suspense fallback={<SectionFallback />}>
          <MemoriesGallerySection />
        </Suspense>
        <IncludedSection />
        <ScheduleSection />
        <VenueSection />
        <ObjectionsSection />
        <Suspense fallback={<SectionFallback />}>
          <AccommodationsSection />
        </Suspense>
        <PricingSection />
        <WhatsAppGroupSection />
        <Suspense fallback={<SectionFallback />}>
          <SupportTeamSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <StoreSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FAQSection />
        </Suspense>
      </main>

      <Footer hasMobileStickyBar />
      <MobileStickyCTA />
    </div>
  );
};

export default Index;


