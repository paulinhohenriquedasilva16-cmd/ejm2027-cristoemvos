import HeroSection from "@/components/HeroSection";
import LoteBanner from "@/components/LoteBanner";
import AboutSection from "@/components/AboutSection";
import VenueSection from "@/components/VenueSection";
import ObjectionsSection from "@/components/ObjectionsSection";
import IncludedSection from "@/components/IncludedSection";
import AccommodationsSection from "@/components/AccommodationsSection";
import PricingSection from "@/components/PricingSection";
import KidsSection from "@/components/KidsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LoteBanner />
      <HeroSection />
      <AboutSection />
      <VenueSection />
      <ObjectionsSection />
      <IncludedSection />
      <AccommodationsSection />
      <PricingSection />
      <KidsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
