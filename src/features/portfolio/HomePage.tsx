import ContactForm from "./ContactForm";
import CursorBackground from "./CursorBackground";
import Experience from "./Experience";
import NavigationHeader from "./NavigationHeader";
import Profile from "./Profile";
import Projects from "./Projects";
import Services from "./Services";
import SiteFooter from "./SiteFooter";
import Sidebar from "./Sidebar";
import { useScrollProgress } from "@/hooks/use-hooks";

export default function HomePage() {
  const progress = useScrollProgress();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink font-body text-paper">
      <div className="noise-layer" aria-hidden />
      <CursorBackground />
      <div
        className="fixed top-0 left-0 z-[90] h-0.5 bg-accent"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
      <NavigationHeader />
      <Sidebar />
      <main>
        <Profile />
        <Experience />
        <Services />
        <Projects />
        <ContactForm />
      </main>
      <SiteFooter />
    </div>
  );
}
