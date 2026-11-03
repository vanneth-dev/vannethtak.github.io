import { useScrollProgress } from "./hooks";
import Header from "./components/Header";
import About from "./components/About";
import Resume from "./components/Resume";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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
