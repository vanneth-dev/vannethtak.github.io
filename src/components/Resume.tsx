import { aboutSummary, education, experience, profile, type ResumeItem } from "../data";
import { Icon, Reveal, SectionHead } from "./ui";

function TimelineItem({ item, index }: { item: ResumeItem; index: number }) {
  return (
    <Reveal delay={index * 80}>
      <div className="group relative border-l border-line pb-10 mb-2 pl-8 last:pb-0">
        <span className="absolute top-0.5 -left-[7px] size-3 rounded-full border-2 border-accent bg-ink transition-all duration-300 group-hover:bg-accent group-hover:shadow-[0_0_14px_rgba(24,208,110,0.7)]" aria-hidden />
        <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">{item.period}</p>
        <h4 className="mt-2 font-display text-xl font-bold text-paper transition-colors group-hover:text-accent md:text-2xl">
          {item.title}
        </h4>
        <p className="mt-1.5 text-sm text-mist">
          <em>{item.org}</em>
          {item.orgHref && (
            <>
              {" "}
              <a href={item.orgHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold not-italic text-accent hover:underline">
                {item.orgLabel}
                <Icon name="external" className="size-3" />
              </a>
            </>
          )}
        </p>
        {item.bullets && (
          <ul className="mt-4 space-y-2.5">
            {item.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {item.blocks && (
          <div className="mt-4 space-y-4">
            {item.blocks.map((block, bi) => (
              <div key={bi}>
                {block.heading && (
                  <p className="mb-2 font-mono text-[11px] tracking-[0.2em] text-paper uppercase">{block.heading}</p>
                )}
                {block.text && <p className="text-sm leading-relaxed text-mist">{block.text}</p>}
                {block.items && block.items.length > 0 && (
                  <ul className="space-y-1.5">
                    {block.items.map((b) => (
                      <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="relative border-y border-line bg-pit/60 py-24 md:py-28">
      <div
        className="absolute top-0 right-0 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #18d06e, transparent 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHead index="02" title="Resume" sub="Check my resume" />

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          <div>
            <Reveal>
              <h3 className="mb-7 font-display text-2xl font-bold text-paper">
                <span className="mr-3 font-mono text-sm font-medium text-accent">{"["}01{"]"}</span>
                Summary
              </h3>
              <div className="relative rounded-lg border border-line bg-panel p-6 md:p-7">
                <div className="absolute top-0 left-6 h-0.5 w-16 bg-accent" aria-hidden />
                <h4 className="font-display text-lg font-bold text-accent">{profile.name}</h4>
                <p className="mt-3 text-sm leading-loose text-mist italic">{aboutSummary}</p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
                  {[
                    { icon: "pin" as const, node: <span>{profile.location}</span> },
                    { icon: "phone" as const, node: <a href={profile.phoneHref} className="text-accent hover:underline">{profile.phone}</a> },
                    { icon: "mail" as const, node: <a href={`mailto:${profile.email}`} className="text-accent hover:underline">{profile.email}</a> },
                  ].map((r, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-mist">
                      <Icon name={r.icon} className="size-4 shrink-0 text-accent" />
                      {r.node}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <h3 className="mb-7 font-display text-2xl font-bold text-paper">
                <span className="mr-3 font-mono text-sm font-medium text-accent">{"["}02{"]"}</span>
                Professional Experience
              </h3>
              {experience.map((item, i) => (
                <TimelineItem key={item.title} item={item} index={i} />
              ))}
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="mb-7 font-display text-2xl font-bold text-paper">
                <span className="mr-3 font-mono text-sm font-medium text-accent">{"["}03{"]"}</span>
                Education
              </h3>
              {education.map((item, i) => (
                <TimelineItem key={item.title} item={item} index={i} />
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
