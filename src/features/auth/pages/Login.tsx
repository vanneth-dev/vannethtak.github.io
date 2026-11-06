import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { Icon } from "@/shared/ui/Icon";

type Status = "idle" | "submitting" | "error";
type Errors = { email?: string; password?: string };

const inputClass =
  "w-full rounded-md border border-line bg-ink px-4 py-3 text-base md:text-sm text-paper placeholder:text-dim outline-none transition-colors focus:border-accent/70 focus:ring-2 focus:ring-accent/15";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Sign in — Vanneth Tak";
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8)
      next.password = "Password must be at least 8 characters.";
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    // No backend yet — simulate a request. Wire this to a real auth
    // endpoint, then redirect on success.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("error");
  };

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-5 py-12 font-body text-paper">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-[0.14] blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #60a5fa, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="group mb-8 inline-flex items-center gap-2 font-mono text-xs tracking-wide text-mist transition-colors hover:text-accent"
        >
          <Icon
            name="arrow"
            className="size-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to portfolio
        </Link>

        <div className="card-lift relative overflow-hidden rounded-2xl border border-line bg-panel p-6 shadow-2xl sm:p-8">
          <div
            className="absolute top-0 left-8 h-0.5 w-16 bg-accent"
            aria-hidden
          />

          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-md border border-accent/40 bg-accent/10 font-display text-lg font-bold text-accent">
              VT
            </span>
            <div className="font-mono">
              <p className="text-sm text-paper">
                Vanneth<span className="text-accent">.</span>Tak
              </p>
              <p className="text-[10px] tracking-[0.25em] text-dim uppercase">
                Admin Access
              </p>
            </div>
          </div>

          <h1 className="mt-7 font-display text-2xl font-bold text-paper">
            Welcome back<span className="text-accent">.</span>
          </h1>
          <p className="mt-2 text-sm text-mist">
            Sign in to manage your portfolio content.
          </p>

          <form onSubmit={onSubmit} className="mt-7" noValidate>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-xs text-mist"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={cn(
                  inputClass,
                  errors.email &&
                    "border-rose/70 focus:border-rose/70 focus:ring-rose/15",
                )}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-2 flex items-center gap-1.5 font-mono text-xs text-rose"
                >
                  <Icon name="close" className="size-3.5 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-baseline justify-between">
                <label
                  htmlFor="password"
                  className="block font-mono text-xs text-mist"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="font-mono text-[11px] text-dim transition-colors hover:text-accent"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    if (errors.password)
                      setErrors({ ...errors, password: undefined });
                  }}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={cn(
                    inputClass,
                    "pr-12",
                    errors.password &&
                      "border-rose/70 focus:border-rose/70 focus:ring-rose/15",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 grid w-11 place-items-center text-dim transition-colors hover:text-accent"
                >
                  <Icon
                    name={showPassword ? "eye-off" : "eye"}
                    className="size-4.5"
                  />
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-2 flex items-center gap-1.5 font-mono text-xs text-rose"
                >
                  <Icon name="close" className="size-3.5 shrink-0" />
                  {errors.password}
                </p>
              )}
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-2.5 text-sm text-mist select-none">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) =>
                  setForm({ ...form, remember: e.target.checked })
                }
                className="size-4 rounded border-line bg-ink text-accent accent-accent"
              />
              Keep me signed in
            </label>

            <div className="mt-5 min-h-6 font-mono text-sm" aria-live="polite">
              {status === "error" && (
                <p className="flex items-center gap-2 text-rose">
                  <Icon name="close" className="size-4 shrink-0" />
                  Sign-in isn&apos;t connected yet. Hook this form to your auth
                  backend.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-accent px-8 py-3.5 font-mono text-sm font-semibold text-ink transition-all duration-300 hover:bg-[#93c5fd] hover:shadow-[0_0_30px_rgba(96,165,250,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Signing in…" : "Sign In"}
              <Icon
                name="lock"
                className={cn("size-4", status === "submitting" && "animate-pulse")}
              />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
          Protected area — authorized access only
        </p>
      </div>
    </main>
  );
}
