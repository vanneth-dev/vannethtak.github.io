import { useEffect, useState } from "react";
import { profile, techTicker } from "../data";
import { useScrollSpy, useTyped } from "../hooks";
import { cn } from "../utils/cn";
import { Icon, SocialIcon } from "./ui";

const links = [
  { id: "header", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

function TickerRow() {
  return (
    <div className="flex shrink-0 items-center">
      {techTicker.map((t) => (
        <span
          key={t}
          className="flex items-center font-mono text-xs uppercase tracking-[0.3em] text-dim"
        >
          <span className="px-6">{t}</span>
          <span className="text-accent">◆</span>
        </span>
      ))}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(links.map((l) => l.id));
  const typed = useTyped(profile.roles);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-line bg-ink/85 py-3 backdrop-blur-md"
            : "py-5",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
          <a href="#header" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md border border-accent/40 bg-accent/10 font-display text-sm font-bold text-accent">
              VT
            </span>
            <span className="font-mono text-sm text-mist transition-colors group-hover:text-paper">
              vanneth<span className="text-accent">.</span>tak
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={cn(
                  "relative px-4 py-2 font-mono text-[13px] tracking-wide transition-colors",
                  active === l.id
                    ? "text-accent"
                    : "text-mist hover:text-paper",
                )}
              >
                <span className="mr-1.5 text-[10px] text-dim">0{i + 1}.</span>
                {l.label}
                {active === l.id && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-accent" />
                )}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-md border border-line md:hidden"
          >
            <span
              className={cn(
                "h-0.5 w-5 rounded bg-paper transition-all duration-300",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-5 rounded bg-paper transition-all duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-5 rounded bg-paper transition-all duration-300",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center bg-ink/[0.98] px-8 backdrop-blur-sm transition-all duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        {links.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-baseline gap-4 border-b border-line py-5 font-display text-3xl font-bold transition-colors",
              active === l.id ? "text-accent" : "text-paper hover:text-accent",
            )}
          >
            <span className="font-mono text-xs text-dim">0{i + 1}</span>
            {l.label}
          </a>
        ))}
        <div className="mt-10 flex gap-3">
          {profile.socials.map((s) => (
            <SocialIcon key={s.label} label={s.label} href={s.href} />
          ))}
        </div>
      </div>

      <section
        id="header"
        className="relative flex min-h-screen flex-col overflow-hidden pt-32"
      >
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div
          className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.14] blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, #60a5fa, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-6xl flex-1 px-5">
          <div className="hero-rise mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-panel/70 py-2 pr-5 pl-3">
            <span className="pulse-dot size-2 rounded-full bg-accent" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-mist uppercase">
              Available for freelance — {profile.location}
            </span>
          </div>

          <h1
            className="hero-rise whitespace-nowrap font-display text-[16vw] leading-[0.92] font-extrabold tracking-tight text-paper sm:text-8xl lg:text-[7.2rem]"
            style={{ animationDelay: "0.12s" }}
          >
            VANNETH
            <br />
            <span className="outline-type">TAK</span>
            {/* <span className="text-accent">_</span> */}
          </h1>

          <div
            className="hero-rise mt-8 font-mono text-lg text-mist md:text-2xl"
            style={{ animationDelay: "0.26s" }}
          >
            I&apos;m a <span className="font-semibold text-paper">{typed}</span>
            <span className="caret h-[1.05em] translate-y-[0.18em]" />
          </div>

          <p
            className="hero-rise mt-6 max-w-xl leading-relaxed text-mist md:text-lg"
            style={{ animationDelay: "0.38s" }}
          >
            {profile.tagline}
          </p>

          <div
            className="hero-rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-sm font-semibold text-ink transition-all duration-300 hover:bg-[#93c5fd] hover:shadow-[0_0_30px_rgba(96,165,250,0.35)]"
            >
              View Portfolio
              <Icon name="arrow" className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-3 font-mono text-sm text-paper transition-colors hover:border-accent/60 hover:text-accent"
            >
              Contact Me
            </a>
            <div className="ml-1 flex gap-2">
              {profile.socials.map((s) => (
                <SocialIcon
                  key={s.label}
                  label={s.label}
                  href={s.href}
                  className="size-11"
                />
              ))}
            </div>
          </div>

          <div
            className="hero-rise mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-7 sm:grid-cols-4"
            style={{ animationDelay: "0.62s" }}
          >
            {[
              { k: "Role", v: "Full-Stack Developer" },
              { k: "Base", v: "Phnom Penh, Cambodia" },
              { k: "Core Stack", v: "Node.js, Laravel, React, Angular" },
              { k: "Status", v: "Full-Time", accent: true },
            ].map((m) => (
              <div key={m.k}>
                <p className="font-mono text-[10px] tracking-[0.3em] text-dim uppercase">
                  {m.k}
                </p>
                <p
                  className={cn(
                    "mt-2 text-sm font-semibold",
                    m.accent ? "text-accent" : "text-paper",
                  )}
                >
                  {m.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee relative mt-16 w-full overflow-hidden border-y border-line py-4">
          <div className="marquee-track flex w-max">
            <TickerRow />
            <div aria-hidden>
              <TickerRow />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
