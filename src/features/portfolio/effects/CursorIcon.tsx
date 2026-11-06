import { useEffect, useRef } from "react";

export type CursorVariant =
  | "none"
  | "ring"
  | "spark"
  | "crosshair"
  | "dot"
  | "diamond"
  | "square"
  | "triangle"
  | "arrow"
  | "hexagon";
export type CursorAnimation =
  | "none"
  | "pulse"
  | "spin"
  | "bounce"
  | "wobble"
  | "breathe"
  | "flip"
  | "swing"
  | "float"
  | "tilt"
  | "ping"
  | "shake";

type CursorDesign = { shape: string; x: number; y: number };

const designs: Record<Exclude<CursorVariant, "none">, CursorDesign> = {
  ring: {
    shape: '<circle cx="16" cy="16" r="9"/><circle cx="16" cy="16" r="2" fill="#edf2f8" stroke="none"/>',
    x: 16, y: 16,
  },
  spark: {
    shape: '<path d="m16 3 3.5 9.5L29 16l-9.5 3.5L16 29l-3.5-9.5L3 16l9.5-3.5Z"/><circle cx="16" cy="16" r="2" fill="#edf2f8" stroke="none"/>',
    x: 16, y: 16,
  },
  crosshair: {
    shape: '<circle cx="16" cy="16" r="7"/><path d="M16 2v8m0 12v8M2 16h8m12 0h8"/><circle cx="16" cy="16" r="1" fill="#edf2f8" stroke="none"/>',
    x: 16, y: 16,
  },
  dot: {
    shape: '<circle cx="16" cy="16" r="5"/><circle cx="16" cy="16" r="11" stroke-opacity=".35"/>',
    x: 16, y: 16,
  },
  diamond: {
    shape: '<path d="M16 4 28 16 16 28 4 16Z"/><circle cx="16" cy="16" r="2" fill="#edf2f8" stroke="none"/>',
    x: 16, y: 16,
  },
  square: {
    shape: '<rect x="8" y="8" width="16" height="16" rx="2.5"/><circle cx="16" cy="16" r="2" fill="#edf2f8" stroke="none"/>',
    x: 16, y: 16,
  },
  triangle: {
    shape: '<path d="M16 5 28 26H4Z"/><circle cx="16" cy="19" r="2" fill="#edf2f8" stroke="none"/>',
    x: 16, y: 16,
  },
  arrow: {
    shape: '<path d="M5 3 5 24 10.5 18.5 14.5 26 17.5 24.5 13.5 17.5 21 17.5Z"/>',
    x: 5, y: 3,
  },
  hexagon: {
    shape: '<path d="M16 3 27 9.5V22.5L16 29 5 22.5V9.5Z"/><circle cx="16" cy="16" r="2" fill="#edf2f8" stroke="none"/>',
    x: 16, y: 16,
  },
};

function cursorImage(design: CursorDesign, interactive: boolean, size: number) {
  const scale = size / 32;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><g fill="${interactive ? "#1e3a5f" : "#121417"}" fill-opacity=".85" stroke="${interactive ? "#93c5fd" : "#60a5fa"}" stroke-width="${interactive ? 2.5 : 1.5}" stroke-linejoin="round" stroke-linecap="round">${design.shape}</g></svg>`;
  const data = encodeURIComponent(svg).replace(/'/g, "%27");
  // Hotspot is authored in the 32-unit viewBox, so scale it to the rendered size.
  return `url("data:image/svg+xml,${data}") ${design.x * scale} ${design.y * scale}`;
}

/**
 * Choose a variant in HomePage; "none" restores native cursors.
 * `size` is the rendered cursor size in px. The default (22) matches a
 * typical desktop mouse cursor; raise it for a larger custom cursor.
 */
export default function CursorIcon({ variant = "ring", animation = "none", size = 22 }: {
  variant?: CursorVariant;
  animation?: CursorAnimation;
  size?: number;
}) {
  const design = variant === "none" ? undefined : designs[variant];
  const cursorRef = useRef<HTMLDivElement>(null);
  // Hotspot scaled from the 32-unit viewBox to the rendered size.
  const scale = size / 32;
  const hotspotX = design ? design.x * scale : 0;
  const hotspotY = design ? design.y * scale : 0;

  useEffect(() => {
    if (!design || animation === "none") return;
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    let x = 0;
    let y = 0;
    let target: Element | null = null;
    const hide = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      target = null;
      document.body.removeAttribute("data-animated-cursor");
      if (cursorRef.current) cursorRef.current.style.display = "none";
    };
    // Position and interactive-state checks run once per frame, paint-aligned,
    // so pointermove stays cheap and the cursor tracks without lagging behind.
    const render = () => {
      raf = 0;
      const cursor = cursorRef.current;
      // Keep native text/disabled cursors and let modal dialogs use static cursors.
      if (!cursor || !media.matches || !target ||
        target.closest('input, textarea, [contenteditable], :disabled, [aria-disabled="true"], dialog')) {
        hide();
        return;
      }
      cursor.style.display = "block";
      cursor.style.transform = `translate3d(${x - hotspotX}px, ${y - hotspotY}px, 0)`;
      cursor.dataset.interactive = String(!!target.closest('a[href], button, [role="button"], summary, .cursor-pointer'));
      document.body.setAttribute("data-animated-cursor", "true");
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        hide();
        return;
      }
      x = event.clientX;
      y = event.clientY;
      target = event.target instanceof Element ? event.target : null;
      if (!raf) raf = requestAnimationFrame(render);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", hide);
    media.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", hide);
      media.removeEventListener("change", hide);
    };
  }, [animation, design, hotspotX, hotspotY]);

  if (!design) return null;

  return <>
    {animation !== "none" && <div ref={cursorRef} className="animated-cursor" aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 32 32" style={{ transformOrigin: `${design.x}px ${design.y}px` }}
        className={`cursor-motion-${animation}`}>
        <g fill="#121417" fillOpacity=".85" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"
          dangerouslySetInnerHTML={{ __html: design.shape }} />
      </svg>
    </div>}
    <style>{`
.animated-cursor { display: none; position: fixed; top: 0; left: 0; width: ${size}px; height: ${size}px; pointer-events: none; z-index: 9999; color: #60a5fa; will-change: transform; }
.animated-cursor[data-interactive="true"] { color: #bfdbfe; }
.animated-cursor[data-interactive="true"] g { stroke-width: 2.5; }
@media (pointer: fine) and (prefers-reduced-motion: no-preference) {
  body[data-animated-cursor="true"], body[data-animated-cursor="true"] * { cursor: none !important; }
  .cursor-motion-pulse { animation: cursor-pulse 1.6s ease-in-out infinite; }
  .cursor-motion-spin { animation: cursor-spin 5s linear infinite; }
  .cursor-motion-bounce { animation: cursor-bounce 1.2s ease-in-out infinite; }
  .cursor-motion-wobble { animation: cursor-wobble 1.8s ease-in-out infinite; }
  .cursor-motion-breathe { animation: cursor-breathe 2.4s ease-in-out infinite; }
  .cursor-motion-flip { animation: cursor-flip 3s ease-in-out infinite; }
  .cursor-motion-swing { animation: cursor-swing 2s ease-in-out infinite; }
  .cursor-motion-float { animation: cursor-float 2.6s ease-in-out infinite; }
  .cursor-motion-tilt { animation: cursor-tilt 2.2s ease-in-out infinite; }
  .cursor-motion-ping { animation: cursor-ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite; }
  .cursor-motion-shake { animation: cursor-shake 0.9s ease-in-out infinite; }
}
@keyframes cursor-pulse { 50% { transform: scale(1.2); } }
@keyframes cursor-spin { to { transform: rotate(360deg); } }
@keyframes cursor-bounce { 50% { transform: translateY(-4px); } }
@keyframes cursor-wobble { 0%, 100% { transform: rotate(-12deg); } 50% { transform: rotate(12deg); } }
@keyframes cursor-breathe { 0%, 100% { filter: drop-shadow(0 0 1px #60a5fa); } 50% { filter: drop-shadow(0 0 5px #60a5fa); } }
@keyframes cursor-flip { 0%, 15% { transform: rotateY(0deg); } 65%, 100% { transform: rotateY(360deg); } }
@keyframes cursor-swing { 0%, 100% { transform: translateX(-3px) rotate(-8deg); } 50% { transform: translateX(3px) rotate(8deg); } }
@keyframes cursor-float { 0%, 100% { transform: translateY(-3px) rotate(-4deg); } 50% { transform: translateY(3px) rotate(4deg); } }
@keyframes cursor-tilt { 0%, 100% { transform: perspective(120px) rotateX(0deg) rotateY(-18deg); } 50% { transform: perspective(120px) rotateX(0deg) rotateY(18deg); } }
@keyframes cursor-ping { 0% { transform: scale(0.85); opacity: 1; } 75%, 100% { transform: scale(1.5); opacity: 0; } }
@keyframes cursor-shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-2px) rotate(-4deg); } 40% { transform: translateX(2px) rotate(4deg); } 60% { transform: translateX(-1.5px) rotate(-2deg); } 80% { transform: translateX(1.5px) rotate(2deg); } }

@media (pointer: fine) {
  body {
    cursor: ${cursorImage(design, false, size)}, auto;
  }

  a[href],
  button:enabled,
  [role="button"],
  summary,
  .cursor-pointer {
    cursor: ${cursorImage(design, true, size)}, pointer;
  }

  input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="color"]):not([type="file"]),
  textarea,
  [contenteditable="true"] {
    cursor: text;
  }

  button:disabled,
  input:disabled,
  [aria-disabled="true"] {
    cursor: not-allowed;
  }
}
`}</style>
  </>;
}
