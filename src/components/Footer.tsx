import { Link } from "react-router-dom";
import { profile } from "../data";
import { Icon } from "./ui";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-pit/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md border border-accent/40 bg-accent/10 font-display text-sm font-bold text-accent">
            VT
          </span>
          <div>
            <p className="font-mono text-sm text-paper">
              © {year} {profile.name}
            </p>
            <p className="font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
              Developer · Phnom Penh, Cambodia
            </p>
          </div>
        </div>

        <a
          href="https://www.linkedin.com/in/vannethtak/"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-sm text-mist transition-colors hover:text-accent"
        >
          Crafted by Vanneth Tak
          <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>

        <Link to="/login" className="rounded-md border border-line px-4 py-3 font-mono text-sm text-mist transition-colors hover:border-accent hover:text-accent">
          Sign in
        </Link>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid size-11 place-items-center rounded-md border border-line text-mist transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:text-accent"
        >
          <Icon name="up" className="size-4" />
        </button>
      </div>
    </footer>
  );
}
