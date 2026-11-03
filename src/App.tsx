import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Portfolio from "./components/Portfolio";
import Resume from "./components/Resume";
import Services from "./components/Services";
import SideNavigation from "./components/SideNavigation";
import { useScrollProgress } from "./hooks";

export default function App() {
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
