import { useEffect, useRef } from "react";

export default function CursorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    let cleanup = () => {};
    const configure = () => {
      cleanup();
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !media.matches) return;
      let width = 0;
      let height = 0;
      let frame = 0;
      let previous = 0;
      const ripples: { x: number; y: number; age: number }[] = [];
      let points: { x: number; y: number; vx: number; vy: number; phase: number }[] = [];
      const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        points = Array.from({ length: Math.min(50, Math.ceil(width * height / 30000)) }, () => ({
          x: Math.random() * width, y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
          phase: Math.random() * Math.PI * 2,
        }));
      };
      const draw = (time: number) => {
        const step = previous ? Math.min((time - previous) / 16.67, 2) : 1;
        previous = time;
        ctx.clearRect(0, 0, width, height);
        for (let i = ripples.length - 1; i >= 0; i--) {
          const ripple = ripples[i];
          ripple.age += step / 40;
          if (ripple.age >= 1) { ripples.splice(i, 1); continue; }
          const radius = 4 + (1 - (1 - ripple.age) ** 3) * 36;
          ctx.strokeStyle = `rgba(96,165,250,${(1 - ripple.age) ** 2 * 0.45})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        for (const point of points) {
          const pulse = (Math.sin(time * 0.0015 + point.phase) + 1) / 2;
          point.x += (point.vx + Math.cos(time * 0.0005 + point.phase) * 0.12) * step;
          point.y += (point.vy + Math.sin(time * 0.0005 + point.phase) * 0.12) * step;
          if (point.x < -10) point.x = width + 10;
          if (point.x > width + 10) point.x = -10;
          if (point.y < -10) point.y = height + 10;
          if (point.y > height + 10) point.y = -10;
          ctx.fillStyle = `rgba(96,165,250,${0.1 + pulse * 0.12})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 1 + pulse * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const a = points[i], b = points[j];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            if (distance > 145) continue;
            ctx.strokeStyle = `rgba(96,165,250,${(1 - distance / 145) * 0.08})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        frame = requestAnimationFrame(draw);
      };
      const click = (event: PointerEvent) => {
        if (event.pointerType === "touch" || event.button !== 0 || !event.isPrimary) return;
        if (event.target instanceof Element && event.target.closest(":disabled, [aria-disabled='true']")) return;
        ripples.push({ x: event.clientX, y: event.clientY, age: 0 });
        if (ripples.length > 6) ripples.shift();
      };
      const visibility = () => {
        cancelAnimationFrame(frame);
        previous = 0;
        ripples.length = 0;
        if (!document.hidden) frame = requestAnimationFrame(draw);
      };
      resize();
      visibility();
      window.addEventListener("resize", resize);
      window.addEventListener("pointerdown", click, { passive: true });
      document.addEventListener("visibilitychange", visibility);
      cleanup = () => {
        cancelAnimationFrame(frame);
        ctx.clearRect(0, 0, width, height);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointerdown", click);
        document.removeEventListener("visibilitychange", visibility);
      };
    };
    configure();
    media.addEventListener("change", configure);
    return () => { cleanup(); media.removeEventListener("change", configure); };
  }, []);

  return <canvas ref={canvasRef} className="cursor-background" aria-hidden="true" />;
}
