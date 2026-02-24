import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VenueSection from "@/components/VenueSection";
import ObjectionsSection from "@/components/ObjectionsSection";
import IncludedSection from "@/components/IncludedSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <VenueSection />
      <ObjectionsSection />
      <IncludedSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
