import ContactForm from "../sections/ContactForm";
import CursorBackground from "../effects/CursorBackground";
import CursorEffect, { type CursorEffectStyle } from "../effects/CursorEffect";
import CursorIcon, { type CursorVariant, type CursorAnimation } from "../effects/CursorIcon";
import Experience from "../sections/Experience";
import NavigationHeader from "../layout/NavigationHeader";
import Profile from "../sections/Profile";
import Projects from "../sections/Projects";
import Services from "../sections/Services";
import SiteFooter from "../layout/SiteFooter";
import Sidebar from "../layout/Sidebar";
import { useScrollProgress } from "@/shared/hooks/useScrollProgress";

export default function HomePage() {
  const progress = useScrollProgress();
  // Shape: ring, spark, crosshair, dot, diamond, square, triangle, arrow, hexagon
  const cursorVariant: CursorVariant = "arrow";
  // Animation: pulse, spin, bounce, wobble, breathe, flip, swing, float, tilt, ping, shake
  const cursorAnimation: CursorAnimation = "none";
  // Effect: sparkles, bubbles, fireflies, snow, confetti, stars, hearts, embers, trail
  const cursorEffect: CursorEffectStyle = "none";
  // Size in px — 22 ≈ native desktop cursor; raise for a larger custom cursor.
  const cursorSize = 30;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink font-body text-paper">
      <div className="noise-layer" aria-hidden />
      <CursorEffect effect={cursorEffect} />
      <CursorIcon variant={cursorVariant} animation={cursorAnimation} size={cursorSize} />
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
