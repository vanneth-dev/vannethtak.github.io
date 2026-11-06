import { Reveal } from "./Reveal";

export function SectionHead({ index, title, sub }: { index: string; title: string; sub: string }) {
  return (
    <Reveal className="mb-8 md:mb-16">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-accent">
        <span className="text-dim">{"//"} </span>
        {index}
        <span className="text-dim"> — </span>
        {sub}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-paper md:text-5xl">
        {title}
        <span className="text-accent">.</span>
      </h2>
      <div className="glow-line mt-6 h-px w-40" />
    </Reveal>
  );
}
