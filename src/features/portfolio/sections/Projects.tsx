import { useEffect, useRef, useState } from "react";
import {
  certificates,
  projects,
  type Certificate,
  type Project,
} from "../data/content";
import { cn } from "@/shared/lib/utils";
import { Icon } from "@/shared/ui/Icon";
import { Reveal } from "@/shared/ui/Reveal";
import { SectionHead } from "@/shared/ui/SectionHead";
import { Tag } from "@/shared/ui/Tag";

function Bars({ heights, accent }: { heights: number[]; accent: string }) {
  return (
    <div className="flex h-full items-end gap-1">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-full rounded-t-sm"
          style={{
            height: `${h}%`,
            background: accent,
            opacity: i % 2 === 0 ? 0.9 : 0.45,
          }}
        />
      ))}
    </div>
  );
}

function Row({ w, accent, pct }: { w: string; accent?: string; pct?: number }) {
  return (
    <span
      className="h-1.5 rounded-full bg-raise"
      style={{ width: w, ...(pct ? { background: accent, opacity: pct } : {}) }}
    />
  );
}

function MockBody({
  variant,
  accent,
}: {
  variant: Project["variant"];
  accent: string;
}) {
  if (variant === "table") {
    return (
      <div className="flex h-full gap-2">
        <div className="flex w-8 flex-col gap-1.5 rounded-md bg-pit p-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn("h-1.5 rounded-sm", i === 0 ? "" : "bg-raise")}
              style={i === 0 ? { background: accent, opacity: 0.7 } : {}}
            />
          ))}
          <span className="mt-auto h-1.5 rounded-sm bg-raise" />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md bg-pit p-1.5">
                <Row w="70%" accent={accent} pct={0.8} />
                <div className="mt-1.5">
                  <Row w="45%" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-1.5 rounded-md bg-pit p-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-1 items-center gap-2">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: i === 0 ? accent : "#414d5c" }}
                />
                <span className="h-1.5 flex-1 rounded-full bg-raise" />
                <span className="h-1.5 w-7 rounded-full bg-raise" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (variant === "chart") {
    return (
      <div className="flex h-full flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md bg-pit p-1.5">
              <Row w="60%" accent={accent} pct={0.7} />
              <div className="mt-1.5">
                <Row w="40%" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-md bg-pit p-2">
          <svg
            viewBox="0 0 200 80"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id={`g-${variant}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={accent} stopOpacity="0.35" />
                <stop offset="1" stopColor={accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 62 C25 58 35 40 55 44 S90 24 110 30 S150 12 170 18 S190 10 200 12 V80 H0 Z"
              fill={`url(#g-${variant})`}
            />
            <path
              d="M0 62 C25 58 35 40 55 44 S90 24 110 30 S150 12 170 18 S190 10 200 12"
              fill="none"
              stroke={accent}
              strokeWidth="2"
            />
            <circle cx="110" cy="30" r="2.5" fill={accent} />
            <circle cx="170" cy="18" r="2.5" fill={accent} />
          </svg>
        </div>
        <div className="flex gap-2">
          <span
            className="h-2 w-12 rounded-full"
            style={{ background: accent, opacity: 0.8 }}
          />
          <span className="h-2 w-9 rounded-full bg-raise" />
          <span className="ml-auto h-2 w-6 rounded-full bg-raise" />
        </div>
      </div>
    );
  }
  if (variant === "enroll") {
    return (
      <div className="grid h-full grid-cols-5 gap-2">
        <div className="col-span-3 flex flex-col gap-2 rounded-md bg-pit p-2.5">
          <Row w="40%" accent={accent} pct={0.9} />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 rounded-sm border border-line bg-ink"
              style={i === 1 ? { borderColor: `${accent}66` } : {}}
            />
          ))}
          <span
            className="h-3.5 w-14 rounded-sm"
            style={{ background: accent, opacity: 0.85 }}
          />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <div className="flex-1 rounded-md bg-pit p-2">
            <Row w="55%" accent={accent} pct={0.6} />
            <div className="mt-1.5">
              <Row w="75%" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 rounded-md bg-pit p-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-1 items-center gap-1.5">
                <span
                  className="size-1 rounded-full"
                  style={{ background: accent }}
                />
                <span className="h-1.5 flex-1 rounded-full bg-raise" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (variant === "rings") {
    return (
      <div className="flex h-full gap-2">
        <div className="grid flex-1 grid-cols-2 gap-2">
          {[72, 58, 85, 44].map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-md bg-pit p-2"
            >
              <span
                className="relative grid size-8 shrink-0 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(${accent} ${p * 3.6}deg, #36404c 0deg)`,
                }}
              >
                <span className="size-5 rounded-full bg-pit" />
              </span>
              <span className="flex flex-col gap-1">
                <span
                  className="h-1.5 w-8 rounded-full"
                  style={{ background: accent, opacity: 0.7 }}
                />
                <span className="h-1.5 w-6 rounded-full bg-raise" />
              </span>
            </div>
          ))}
        </div>
        <div className="flex w-1/3 flex-col gap-1.5 rounded-md bg-pit p-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-1 items-center gap-1.5">
              <span
                className="grid size-3 shrink-0 place-items-center rounded-full border"
                style={{ borderColor: `${accent}88` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-2"
                  fill="none"
                  stroke={accent}
                  strokeWidth="3"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
              </span>
              <span className="h-1.5 flex-1 rounded-full bg-raise" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (variant === "jobs") {
    return (
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-5 items-center gap-1.5 rounded-md border border-line bg-pit px-2">
          <svg
            viewBox="0 0 24 24"
            className="size-2.5 text-dim"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="h-1.5 w-16 rounded-full bg-raise" />
        </div>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-1 items-center gap-2 rounded-md bg-pit p-2"
          >
            <span
              className="grid size-6 shrink-0 place-items-center rounded-sm"
              style={{ background: `${accent}2e` }}
            >
              <span
                className="size-2.5 rounded-full"
                style={{ background: accent, opacity: 0.8 }}
              />
            </span>
            <span className="flex flex-1 flex-col gap-1">
              <span className="h-1.5 w-1/2 rounded-full bg-raise" />
              <span className="h-1.5 w-1/3 rounded-full bg-raise/70" />
            </span>
            <span
              className="h-3 w-10 rounded-full border"
              style={{ borderColor: `${accent}55`, background: `${accent}14` }}
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-full gap-2">
      <div className="flex w-10 flex-col gap-1.5 rounded-md bg-pit p-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn("h-1.5 rounded-sm", i === 1 ? "" : "bg-raise")}
            style={i === 1 ? { background: accent, opacity: 0.7 } : {}}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span
              className="h-2 w-9 rounded-sm"
              style={{ background: accent, opacity: 0.85 }}
            />
            <span className="h-1.5 w-5 rounded-sm bg-raise" />
          </div>
          <span className="h-3.5 w-14 rounded-sm border border-line bg-pit" />
        </div>
        <div className="min-h-0 flex-[2] rounded-md bg-pit p-2">
          <Bars
            heights={[42, 68, 38, 82, 56, 92, 70, 48, 78, 60]}
            accent={accent}
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-1 rounded-md bg-pit p-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-1 items-center gap-1.5">
              <span
                className="size-1 rounded-full"
                style={{ background: accent, opacity: 0.6 }}
              />
              <span className="h-1.5 flex-1 rounded-full bg-raise" />
              <span className="h-1.5 w-5 rounded-full bg-raise" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Mock({
  variant,
  accent,
  big = false,
}: {
  variant: Project["variant"];
  accent: string;
  big?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-ink">
      <div className="flex items-center gap-1.5 border-b border-line bg-pit px-3 py-2">
        <span className="size-2 rounded-full bg-rose/70" />
        <span className="size-2 rounded-full bg-amber/70" />
        <span className="size-2 rounded-full bg-accent/70" />
        <span className="ml-2 h-3 flex-1 rounded-sm bg-raise" />
      </div>
      <div className={cn("p-3", big ? "h-72" : "h-44")}>
        <MockBody variant={variant} accent={accent} />
      </div>
    </div>
  );
}

function ProjectPhoto({
  project,
  big = false,
}: {
  project: Project;
  big?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed)
    return <Mock variant={project.variant} accent={project.accent} big={big} />;

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-ink">
      <img
        src={project.image}
        alt={`${project.title} project screenshot`}
        loading={big ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className={cn(
          "w-full",
          big
            ? "max-h-[60vh] object-contain"
            : "aspect-video object-cover object-top transition-transform duration-500 group-hover:scale-105",
        )}
      />
    </div>
  );
}

function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle
        cx="24"
        cy="24"
        r="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <circle
        cx="24"
        cy="24"
        r="14.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m17 24 5 5 9-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CertCard({ cert, onOpen }: { cert: Certificate; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="card-lift group relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-amber/25 bg-panel p-6 text-left hover:border-amber/60"
    >
      <Seal className="absolute -right-5 -bottom-6 size-32 text-amber/[0.07] transition-transform duration-500 group-hover:rotate-12" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold tracking-[0.4em] text-amber">
          COURSERA
        </span>
        <span className="grid size-7 place-items-center rounded-full border border-amber/40 text-amber">
          <Icon name="check" className="size-3.5" />
        </span>
      </div>
      <h4 className="mt-6 font-display text-2xl font-bold leading-snug text-paper transition-colors group-hover:text-amber">
        {cert.title}
      </h4>
      <p className="mt-2 text-sm text-mist">
        {cert.issuer} — Verified credential
      </p>
      <div className="mt-6 flex flex-1 items-end justify-between border-t border-line pt-4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-dim uppercase">
          Certificate of Completion
        </span>
        <span className="grid size-9 place-items-center rounded-full border border-line text-mist transition-all duration-300 group-hover:border-amber/60 group-hover:text-amber group-hover:rotate-90">
          <Icon name="plus" className="size-4" />
        </span>
      </div>
    </button>
  );
}

type Filter = "projects" | "certificates";
type Selected =
  | { kind: "project"; item: Project }
  | { kind: "cert"; item: Certificate };

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("projects");
  const [selected, setSelected] = useState<Selected | null>(null);

  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closePreview = () => setClosing(true);

  useEffect(() => {
    if (!selected) return;
    const trigger = document.activeElement as HTMLElement | null;
    dialogRef.current?.showModal();
    return () => trigger?.focus({ preventScroll: true });
  }, [selected]);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(
      () => {
        dialogRef.current?.close();
        setSelected(null);
        setClosing(false);
      },
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220,
    );
    return () => window.clearTimeout(timer);
  }, [closing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selected) closePreview();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="portfolio"
      className="relative border-y border-line bg-pit/60 py-16 md:py-28"
    >
      <div
        className="absolute bottom-0 left-0 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #ffc24b, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHead
          index="04"
          title="Portfolio"
          sub="My works and certificates"
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {(
              [
                { id: "projects", label: "Core Projects" },
                { id: "certificates", label: "Certificates" },
              ] as { id: Filter; label: string }[]
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-md border px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase transition-all duration-300",
                  filter === f.id
                    ? "border-accent bg-accent font-semibold text-ink"
                    : "border-line text-mist hover:border-accent/50 hover:text-accent",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={filter} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filter === "projects"
            ? projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setSelected({ kind: "project", item: p })}
                  className="pop-in card-lift group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-panel text-left hover:border-accent/50"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="p-3">
                    <ProjectPhoto project={p} />
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-3 border-t border-line p-5">
                    <div className="min-w-0">
                      <h4 className="font-display text-lg font-bold text-paper transition-colors group-hover:text-accent">
                        {p.title}
                      </h4>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-mist">
                        {p.description}
                      </p>
                    </div>
                    <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-line text-mist transition-all duration-300 group-hover:rotate-90 group-hover:border-accent/60 group-hover:text-accent">
                      <Icon name="plus" className="size-4" />
                    </span>
                  </div>
                </button>
              ))
            : certificates.map((c, i) => (
                <div
                  key={c.id}
                  className="pop-in"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <CertCard
                    cert={c}
                    onOpen={() => setSelected({ kind: "cert", item: c })}
                  />
                </div>
              ))}
        </div>
      </div>

      {selected && (
        <dialog
          ref={dialogRef}
          aria-label={selected.item.title}
          onCancel={(event) => {
            event.preventDefault();
            closePreview();
          }}
          className={cn(
            "project-preview fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-4 text-paper open:flex open:items-center open:justify-center md:p-8",
            closing && "is-closing",
          )}
        >
          <div
            className="preview-backdrop absolute inset-0 bg-ink/85 backdrop-blur-md"
            aria-hidden="true"
            onClick={closePreview}
          />
          <div className="preview-panel relative max-h-[90dvh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-2xl border border-line bg-pit p-5 pt-16 shadow-2xl md:p-8 md:pt-16">
            <button
              onClick={closePreview}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid size-11 place-items-center md:size-10 rounded-md border border-line bg-ink text-mist transition-colors hover:border-accent/60 hover:text-accent"
            >
              <Icon name="close" className="size-4" />
            </button>
            {selected.kind === "project" ? (
              <>
                <ProjectPhoto
                  key={selected.item.id}
                  project={selected.item}
                  big
                />
                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-bold text-paper md:text-3xl">
                    {selected.item.title}
                  </h3>
                  <span className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
                    {selected.item.context}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-mist">
                  {selected.item.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selected.item.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="relative overflow-hidden rounded-lg border border-amber/30 bg-panel p-4 text-center sm:p-8 md:p-12">
                  <Seal className="absolute -top-6 -right-6 size-40 text-amber/[0.08]" />
                  <p className="font-mono text-sm tracking-[0.5em] text-amber">
                    COURSERA
                  </p>
                  <p className="mt-6 font-mono text-[10px] tracking-[0.35em] text-dim uppercase">
                    Certificate of Completion
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-bold text-paper md:text-4xl">
                    {selected.item.title}
                  </h3>
                  <div className="mx-auto mt-6 h-px w-32 bg-amber/40" />
                  <p className="mt-4 text-mist">
                    Issued by {selected.item.issuer} · Verified credential
                  </p>
                </div>
                <a
                  href={selected.item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-amber px-6 py-3 font-mono text-sm font-semibold text-ink transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,194,75,0.3)]"
                >
                  Verify Credential
                  <Icon name="external" className="size-4" />
                </a>
              </>
            )}
          </div>
        </dialog>
      )}
    </section>
  );
}
