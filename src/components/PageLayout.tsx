import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background grain">
      <Navbar />
      <main className="pt-16">{children}</main>
      <FooterSection />
    </div>
  );
};

export default PageLayout;
