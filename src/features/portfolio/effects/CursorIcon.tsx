import { useEffect, useRef } from "react";

export type CursorVariant = "none" | "ring" | "spark" | "crosshair";
export type CursorAnimation = "none" | "pulse" | "spin" | "bounce" | "wobble" | "breathe" | "flip" | "swing";

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
};

function cursorImage(design: CursorDesign, interactive: boolean) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="${interactive ? "#1e3a5f" : "#121417"}" fill-opacity=".85" stroke="${interactive ? "#93c5fd" : "#60a5fa"}" stroke-width="${interactive ? 2.5 : 1.5}" stroke-linejoin="round" stroke-linecap="round">${design.shape}</g></svg>`;
  const data = encodeURIComponent(svg).replace(/'/g, "%27");
  return `url("data:image/svg+xml,${data}") ${design.x} ${design.y}`;
}

/** Choose a variant in HomePage; "none" restores native cursors. */
export default function CursorIcon({ variant = "ring", animation = "none" }: {
  variant?: CursorVariant;
  animation?: CursorAnimation;
}) {
  const design = variant === "none" ? undefined : designs[variant];
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!design || animation === "none") return;
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const hide = () => {
      document.body.removeAttribute("data-animated-cursor");
      if (cursorRef.current) cursorRef.current.style.display = "none";
    };
    const move = (event: PointerEvent) => {
      const cursor = cursorRef.current;
      const target = event.target;
      // Keep native text/disabled cursors and let modal dialogs use static cursors.
      if (!media.matches || event.pointerType === "touch" || !(target instanceof Element) ||
        target.closest('input, textarea, [contenteditable], :disabled, [aria-disabled="true"], dialog')) {
        hide();
        return;
      }
      if (!cursor) return;
      cursor.style.display = "block";
      cursor.style.transform = `translate3d(${event.clientX - design.x}px, ${event.clientY - design.y}px, 0)`;
      cursor.dataset.interactive = String(!!target.closest('a[href], button, [role="button"], summary, .cursor-pointer'));
      document.body.setAttribute("data-animated-cursor", "true");
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
  }, [animation, design]);

  if (!design) return null;

  return <>
    {animation !== "none" && <div ref={cursorRef} className="animated-cursor" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ transformOrigin: `${design.x}px ${design.y}px` }}
        className={`cursor-motion-${animation}`}>
        <g fill="#121417" fillOpacity=".85" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"
          dangerouslySetInnerHTML={{ __html: design.shape }} />
      </svg>
    </div>}
    <style>{`
.animated-cursor { display: none; position: fixed; top: 0; left: 0; width: 32px; height: 32px; pointer-events: none; z-index: 9999; color: #60a5fa; }
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
}
@keyframes cursor-pulse { 50% { transform: scale(1.2); } }
@keyframes cursor-spin { to { transform: rotate(360deg); } }
@keyframes cursor-bounce { 50% { transform: translateY(-4px); } }
@keyframes cursor-wobble { 0%, 100% { transform: rotate(-12deg); } 50% { transform: rotate(12deg); } }
@keyframes cursor-breathe { 0%, 100% { filter: drop-shadow(0 0 1px #60a5fa); } 50% { filter: drop-shadow(0 0 5px #60a5fa); } }
@keyframes cursor-flip { 0%, 15% { transform: rotateY(0deg); } 65%, 100% { transform: rotateY(360deg); } }
@keyframes cursor-swing { 0%, 100% { transform: translateX(-3px) rotate(-8deg); } 50% { transform: translateX(3px) rotate(8deg); } }

@media (pointer: fine) {
  body {
    cursor: ${cursorImage(design, false)}, auto;
  }

  a[href],
  button:enabled,
  [role="button"],
  summary,
  .cursor-pointer {
    cursor: ${cursorImage(design, true)}, pointer;
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
