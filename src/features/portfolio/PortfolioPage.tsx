import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Portfolio from "./Portfolio";
import Resume from "./Resume";
import Services from "./Services";
import SideNavigation from "./SideNavigation";
import { useScrollProgress } from "@/shared/hooks";

export default function PortfolioPage() {
  const progress = useScrollProgress();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink font-body text-paper">
      <div className="noise-layer" aria-hidden />
      <div
        className="fixed top-0 left-0 z-[90] h-0.5 bg-accent"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
      <Header />
      <SideNavigation />
      <main>
        <About />
        <Resume />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

