import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import SDKSection from "@/components/SDKSection";
import StatsLedger from "@/components/StatsLedger";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grain">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <SDKSection />
      <StatsLedger />
      <FooterSection />
    </div>
  );
};

export default Index;
