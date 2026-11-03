import { services } from "../data";
import { Icon, Reveal, SectionHead, type IconName } from "./ui";

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead index="03" title="Services" sub="What I build" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <div className="card-lift group relative h-full overflow-hidden rounded-lg border border-line bg-panel p-5 sm:p-7 hover:border-accent/50">
                <span className="pointer-events-none absolute top-5 right-6 font-display text-4xl font-extrabold text-paper/[0.05] transition-colors duration-300 group-hover:text-accent/10">
                  0{i + 1}
                </span>
                <div className="grid size-13 place-items-center rounded-md border border-line bg-pit text-mist transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent">
                  <Icon name={s.icon as IconName} className="size-6" />
                </div>
                <h4 className="mt-6 font-display text-lg font-bold text-paper transition-colors group-hover:text-accent">
                  {s.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-mist">{s.body}</p>
                <div className="mt-6 h-px w-full bg-line transition-colors duration-300 group-hover:bg-accent/40" aria-hidden />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
