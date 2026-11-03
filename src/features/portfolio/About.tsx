import { calcAge } from "@/shared/utils";
import type { ReactNode } from "react";
import { interests, profile, skills, stats } from "./data";
import { useCountUp, useInView } from "@/shared/hooks";
import { Icon, Reveal, SectionHead, type IconName } from "@/shared/ui";

function StatBox({
  value,
  suffix,
  label,
  icon,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: IconName;
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const count = useCountUp(value, inView);
  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className="card-lift group relative h-full overflow-hidden rounded-lg border border-line bg-panel p-4 text-center sm:p-6 hover:border-accent/40"
      >
        <div
          className="absolute -top-10 -right-10 size-24 rounded-full bg-accent/10 blur-2xl transition-opacity group-hover:opacity-100"
          aria-hidden
        />
        <Icon name={icon} className="mx-auto size-8 text-accent" />
        <p className="mt-4 font-display text-4xl font-bold sm:text-5xl text-paper">
          {count}
          <span className="text-accent">{suffix}</span>
        </p>
        <p className="mt-2 font-mono text-[11px] tracking-[0.25em] text-mist uppercase">
          {label}
        </p>
      </div>
    </Reveal>
  );
}

function SkillBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="group">
      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="font-semibold text-paper transition-colors group-hover:text-accent">
          {name}
        </span>
        <span className="font-mono text-xs text-dim">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-raise">
        <div
          className="skill-fill h-full rounded-full bg-gradient-to-r from-accent/70 to-accent"
          style={{
            width: inView ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

const facts: [string, ReactNode][] = [
  ["Birthday", profile.birthday],
  [
    "Website",
    <a
      href={profile.website}
      target="_blank"
      rel="noreferrer"
      className="text-accent transition-colors hover:text-paper"
    >
      vanneth-dev.github.io
    </a>,
  ],
  [
    "Phone",
    <a
      href={profile.phoneHref}
      className="text-accent transition-colors hover:text-paper"
    >
      {profile.phone}
    </a>,
  ],
  ["City", "Phnom Penh, Cambodia"],
  [
    "Age",
    <span className="text-accent">
      {calcAge(profile.birthYear, profile.birthMonth, profile.birthDay)}
    </span>,
  ],
  ["Degree", profile.degree],
  [
    "Email",
    <a
      href={`mailto:${profile.email}`}
      className="text-accent transition-colors hover:text-paper"
    >
      {profile.email}
    </a>,
  ],
  ["Freelance", <span className="text-accent">{profile.freelance}</span>],
];

export default function About() {
  const age = calcAge(profile.birthYear, profile.birthMonth, profile.birthDay);
  return (
    <section id="about" className="relative py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead index="01" title="About" sub="Learn more about me" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:mx-0">
              <div
                className="absolute -inset-3 -rotate-2 rounded-xl border border-accent/30"
                aria-hidden
              />
              <div
                className="absolute -right-3 -bottom-3 h-20 w-20 border-r-2 border-b-2 border-accent"
                aria-hidden
              />
              <div className="group relative overflow-hidden rounded-lg border border-line">
                <img
                  src="/images/profile.jpg"
                  alt="Vanneth Tak"
                  width={724}
                  height={1086}
                  loading="lazy"
                  className="block aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/80 px-4 py-3 backdrop-blur-sm">
                  <span className="font-mono text-xs text-mist">
                    vanneth.tak
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                    <span className="pulse-dot size-1.5 rounded-full bg-accent" />
                    Online
                  </span>
                </div>
              </div>
              <p className="mt-6 text-center font-mono text-[11px] tracking-[0.3em] text-dim uppercase lg:text-left">
                Developer — Age {age}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.35em] text-accent uppercase">
              Profile
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold text-paper md:text-4xl">
              Full-Stack <span className="text-accent">Developer</span>
            </h3>
            <p className="mt-6 leading-loose text-mist">
              I am{" "}
              <strong className="font-semibold text-paper">Vanneth Tak</strong>,
              a dedicated Full-Stack Developer specializing in scalable web
              applications, RESTful APIs, and robust backend systems.{" "}
              <span className="font-mono text-base font-semibold text-accent md:text-lg">
                I have experience with Laravel, Node.js, TypeScript, React.js,
                and Angular, as well as database design and cloud deployment.
              </span>{" "}
              I have contributed to the development and maintenance of
              government digital platforms and educational information systems
              at the Ministry of Labour and Vocational Training. I focus on
              clean, maintainable code, system optimization, and building
              secure, reliable applications that solve real-world problems.
            </p>

            <div className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {facts.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center gap-3 border-b border-line/60 pb-3"
                >
                  <Icon
                    name="chevron"
                    className="size-3.5 shrink-0 text-accent"
                  />
                  <span className="shrink-0 font-semibold text-paper">
                    {label}:
                  </span>
                  <span className="min-w-0 break-words text-sm text-mist">{value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatBox
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              icon={s.icon as IconName}
              delay={i * 90}
            />
          ))}
        </div>

        <div className="mt-14 md:mt-24">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] tracking-[0.4em] text-dim uppercase">
              {"//"} Toolbox
            </p>
            <h3 className="font-display text-2xl font-bold text-paper md:text-3xl">
              Skills<span className="text-accent">.</span>
            </h3>
          </Reveal>
          <div className="mt-9 grid gap-x-12 gap-y-7 md:grid-cols-2">
            {skills.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <SkillBar name={s.name} level={s.level} delay={i * 100} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-24">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] tracking-[0.4em] text-dim uppercase">
              {"//"} Beyond the terminal
            </p>
            <h3 className="font-display text-2xl font-bold text-paper md:text-3xl">
              Interests<span className="text-accent">.</span>
            </h3>
          </Reveal>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {interests.map((it, i) => (
              <Reveal key={it.name} delay={i * 80}>
                <div
                  className="card-lift group rounded-lg border border-line bg-panel p-4 text-center sm:p-6 hover:border-accent/40"
                  style={{ ["--c" as string]: it.color }}
                >
                  <div
                    className="mx-auto grid size-16 place-items-center rounded-full border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      borderColor: `${it.color}44`,
                      background: `${it.color}14`,
                      color: it.color,
                    }}
                  >
                    <Icon name={it.icon as IconName} className="size-7" />
                  </div>
                  <h4 className="mt-5 font-display text-base font-semibold sm:text-lg text-paper">
                    {it.name}
                  </h4>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
