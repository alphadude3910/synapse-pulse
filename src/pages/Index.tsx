import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import SDKSection from "@/components/SDKSection";
import StatsLedger from "@/components/StatsLedger";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grain">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <ProblemSection />
      <SolutionSection />
      <SDKSection />
      <StatsLedger />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
