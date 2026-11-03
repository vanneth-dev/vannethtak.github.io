import { useState } from "react";
import { profile } from "./data";
import { useScrollSpy } from "@/shared/hooks";
import { cn } from "@/shared/utils";
import { Icon, SocialIcon } from "@/shared/ui";

const sections = [
  { id: "header", label: "Home", icon: "code" },
  { id: "about", label: "About", icon: "smile" },
  { id: "resume", label: "Resume", icon: "journal" },
  { id: "services", label: "Services", icon: "layers" },
  { id: "portfolio", label: "Portfolio", icon: "globe" },
  { id: "contact", label: "Contact", icon: "mail" },
];

const sectionIds = sections.map(({ id }) => id);

export default function SideNavigation() {
  const active = useScrollSpy(sectionIds);
  const [showSocials, setShowSocials] = useState(true);

  const itemClass =
    "relative flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

  return (
    <nav
      aria-label="Section sidebar"
      className="pointer-events-none fixed inset-y-24 left-3 z-40 hidden w-16 items-center lg:flex xl:left-6"
    >
      <div className="pointer-events-auto relative [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-h-full w-full overflow-y-auto rounded-full border border-accent/30 bg-ink/80 px-3 py-8 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-colors hover:border-accent/50 hover:bg-ink/95">
        <div className="flex flex-col items-center gap-3">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              title={section.label}
              aria-label={section.label}
              aria-current={active === section.id ? "location" : undefined}
              className={cn(
                itemClass,
                active === section.id
                  ? "scale-110 bg-accent text-ink shadow-lg shadow-accent/25"
                  : "text-dim hover:scale-105 hover:bg-accent/10 hover:text-accent",
              )}
            >
              <Icon name={section.icon} className="size-4" />
            </a>
          ))}
        </div>

        <div className="my-4 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <button
          type="button"
          title="Social links"
          aria-label="Toggle social links"
          aria-expanded={showSocials}
          aria-controls="sidebar-socials"
          onClick={() => setShowSocials((shown) => !shown)}
          className={cn(
            itemClass,
            showSocials
              ? "bg-accent/15 text-accent"
              : "text-dim hover:bg-accent/10 hover:text-accent",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className={cn(
              "size-5 transition-transform duration-300",
              showSocials && "rotate-90",
            )}
          >
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>

        <div
          id="sidebar-socials"
          inert={!showSocials}
          aria-hidden={!showSocials}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300",
            showSocials
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col items-center gap-2 pt-3">
              {profile.socials.map((social) => (
                <SocialIcon
                  key={social.label}
                  {...social}
                  className="size-9 rounded-full border-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
