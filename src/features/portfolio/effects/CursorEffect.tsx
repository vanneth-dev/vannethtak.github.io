import { useEffect, useRef } from "react";

export type CursorEffectStyle =
  | "none"
  | "sparkles"
  | "bubbles"
  | "fireflies"
  | "snow"
  | "confetti"
  | "stars"
  | "hearts"
  | "embers"
  | "trail";

/** Decorative effects behind the cursor; never intercept clicks. */
export default function CursorEffect({ effect = "sparkles" }: { effect?: CursorEffectStyle }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (effect === "none") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let width = 0;
    let height = 0;
    let particles: { x: number; y: number; born: number; seed: number; size: number }[] = [];
    let lastEmission = 0;

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      particles = [];
      ctx.clearRect(0, 0, width, height);
    };
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      clear();
    };
    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      particles = particles.filter((point) => now - point.born < 1000);
      for (const point of particles) {
        const age = (now - point.born) / 1000;
        const drift = Math.sin(age * 5 + point.seed) * 12;
        const x = point.x + drift;
        const falls = effect === "snow" || effect === "confetti" || effect === "hearts";
        const y = point.y + (falls ? age * 55 : -age * 35);
        ctx.save();
        ctx.translate(x, y);
        ctx.globalAlpha = (1 - age) * .8;
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#93c5fd";
        ctx.fillStyle = "#bfdbfe";
        ctx.beginPath();
        if (effect === "sparkles") {
          const r = point.size * (1 - age);
          ctx.rotate(point.seed + age);
          ctx.moveTo(0, -r);
          ctx.lineTo(r * .25, -r * .25);
          ctx.lineTo(r, 0);
          ctx.lineTo(r * .25, r * .25);
          ctx.lineTo(0, r);
          ctx.lineTo(-r * .25, r * .25);
          ctx.lineTo(-r, 0);
          ctx.lineTo(-r * .25, -r * .25);
          ctx.closePath();
          ctx.fill();
        } else if (effect === "bubbles") {
          const r = point.size * (.5 + age);
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(-r * .3, -r * .3, r * .18, 0, Math.PI * 2);
          ctx.fill();
        } else if (effect === "fireflies") {
          ctx.globalAlpha *= .5 + .5 * Math.sin(age * 10 + point.seed) ** 2;
          ctx.fillStyle = "#bef264";
          ctx.shadowColor = "#a3e635";
          ctx.shadowBlur = 12;
          ctx.arc(0, 0, point.size * .35, 0, Math.PI * 2);
          ctx.fill();
        } else if (effect === "snow") {
          ctx.rotate(point.seed + age);
          for (let arm = 0; arm < 6; arm++) {
            ctx.moveTo(0, 0);
            ctx.lineTo(point.size, 0);
            ctx.moveTo(point.size * .6, 0);
            ctx.lineTo(point.size * .4, -point.size * .25);
            ctx.rotate(Math.PI / 3);
          }
          ctx.strokeStyle = "#e0f2fe";
          ctx.stroke();
        } else if (effect === "confetti") {
          ctx.rotate(point.seed + age * 5);
          const colors = ["#60a5fa", "#f472b6", "#fbbf24", "#a78bfa", "#34d399"];
          ctx.fillStyle = colors[Math.floor(point.seed) % colors.length];
          ctx.scale(Math.cos(age * 8), 1);
          ctx.fillRect(-point.size / 2, -point.size / 3, point.size, point.size * .65);
        } else if (effect === "stars") {
          const r = point.size * (1 - age);
          ctx.rotate(point.seed + age * 2);
          ctx.fillStyle = "#fde68a";
          for (let tip = 0; tip < 5; tip++) {
            ctx.lineTo(0, -r);
            ctx.rotate(Math.PI / 5);
            ctx.lineTo(0, -r * .45);
            ctx.rotate(Math.PI / 5);
          }
          ctx.closePath();
          ctx.fill();
        } else if (effect === "hearts") {
          const r = point.size * .5 * (1 - age * .4);
          ctx.rotate(Math.sin(age * 4 + point.seed) * .3);
          ctx.fillStyle = "#fb7185";
          ctx.moveTo(0, r * .9);
          ctx.bezierCurveTo(r * 1.4, -r * .4, r * .5, -r * 1.3, 0, -r * .5);
          ctx.bezierCurveTo(-r * .5, -r * 1.3, -r * 1.4, -r * .4, 0, r * .9);
          ctx.closePath();
          ctx.fill();
        } else if (effect === "embers") {
          ctx.globalAlpha *= .5 + .5 * Math.sin(age * 12 + point.seed) ** 2;
          const r = point.size * .4 * (1 - age);
          const colors = ["#fb923c", "#f97316", "#fbbf24"];
          ctx.fillStyle = colors[Math.floor(point.seed) % colors.length];
          ctx.shadowColor = "#f97316";
          ctx.shadowBlur = 10;
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
        } else if (effect === "trail") {
          const r = point.size * (1 - age) * .9;
          ctx.fillStyle = "#93c5fd";
          ctx.shadowColor = "#60a5fa";
          ctx.shadowBlur = 8;
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      frame = particles.length ? requestAnimationFrame(draw) : 0;
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === "touch" || document.hidden ||
        (event.target instanceof Element && event.target.closest("dialog"))) {
        clear();
        return;
      }
      const now = performance.now();
      if (now - lastEmission > 28) {
        particles.push({ x: event.clientX, y: event.clientY, born: now, seed: Math.random() * 20, size: 3 + Math.random() * 5 });
        if (particles.length > 48) particles.shift();
        lastEmission = now;
      }
      if (!frame) frame = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("blur", clear);
    document.documentElement.addEventListener("pointerleave", clear);
    document.addEventListener("visibilitychange", clear);
    media.addEventListener("change", clear);
    return () => {
      clear();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      window.removeEventListener("blur", clear);
      document.documentElement.removeEventListener("pointerleave", clear);
      document.removeEventListener("visibilitychange", clear);
      media.removeEventListener("change", clear);
    };
  }, [effect]);

  return effect === "none" ? null : (
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9998] h-full w-full" />
  );
}
