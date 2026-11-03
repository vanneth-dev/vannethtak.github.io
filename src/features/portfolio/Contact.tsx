import { useState, type FormEvent } from "react";
import { profile } from "./data";
import { cn } from "@/shared/utils";
import { Icon, Reveal, SectionHead, SocialIcon } from "@/shared/ui";

const BOT_TOKEN = "7671448373:AAFCOr-sBC0rMA35uP-ibiwsjKQzzYZ0ZBg";
const CHAT_ID = "5034837799";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-md border border-line bg-ink px-4 py-3 text-base md:text-sm text-paper placeholder:text-dim outline-none transition-colors focus:border-accent/70 focus:ring-2 focus:ring-accent/15";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const text = `Hello, my name's ${form.name}.\nTelegram number: ${form.phone}\nMessage: ${form.message}`;
    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`,
      );
      const data = await res.json();
      if (data.ok) {
        setStatus("sent");
        setForm({ name: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const info = [
    {
      icon: "pin" as const,
      title: "My Address",
      body: <span>{profile.address}</span>,
    },
    {
      icon: "mail" as const,
      title: "Email Me",
      body: (
        <a
          href={`mailto:${profile.email}`}
          className="break-all text-accent hover:underline"
        >
          {profile.email}
        </a>
      ),
    },
    {
      icon: "phone" as const,
      title: "Call Me",
      body: (
        <a href={profile.phoneHref} className="text-accent hover:underline">
          {profile.phone}
        </a>
      ),
    },
  ];

  return (
    <section id="contact" className="relative py-16 md:py-28">
      <div
        className="absolute -top-24 right-0 h-80 w-80 rounded-full opacity-[0.08] blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #60a5fa, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHead index="05" title="Contact" sub="Drop me a message" />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            {info.map((it, i) => (
              <Reveal key={it.title} delay={i * 80}>
                <div className="card-lift flex items-center gap-3 sm:gap-5 rounded-lg border border-line bg-panel p-4 sm:p-6 hover:border-accent/40">
                  <span className="grid size-13 shrink-0 place-items-center rounded-md border border-accent/30 bg-accent/10 text-accent">
                    <Icon name={it.icon} className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-mono text-[11px] tracking-[0.3em] text-dim uppercase">
                      {it.title}
                    </h4>
                    <p className="mt-1.5 text-sm font-semibold text-paper">
                      {it.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={240}>
              <div className="rounded-lg border border-line bg-panel p-4 sm:p-6">
                <h4 className="font-mono text-[11px] tracking-[0.3em] text-dim uppercase">
                  Social Profiles
                </h4>
                <div className="mt-4 flex gap-2.5">
                  {profile.socials.map((s) => (
                    <SocialIcon
                      key={s.label}
                      label={s.label}
                      href={s.href}
                      className="flex-1 justify-center"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="relative h-full rounded-lg border border-line bg-panel p-5 md:p-8"
            >
              <div
                className="absolute top-0 left-8 h-0.5 w-16 bg-accent"
                aria-hidden
              />
              <p className="font-mono text-[11px] tracking-[0.35em] text-accent uppercase">
                {"//"} Send a message
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-paper">
                Let&apos;s build something{" "}
                <span className="text-accent">together</span>
              </h3>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-mono text-xs text-mist"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-mono text-xs text-mist"
                  >
                    Your Telegram Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="Your Telegram Number"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-xs text-mist"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell me about your project…"
                  className={cn(inputClass, "resize-none")}
                />
              </div>

              <div
                className="mt-5 min-h-6 font-mono text-sm"
                aria-live="polite"
              >
                {status === "sent" && (
                  <p className="flex items-center gap-2 text-accent">
                    <Icon name="check" className="size-4" />
                    Your message has been sent. Thank you!
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-2 text-rose">
                    <Icon name="close" className="size-4" />
                    Something went wrong. Please try again or reach me on
                    Telegram.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 inline-flex w-full justify-center sm:w-auto items-center gap-2.5 rounded-md bg-accent px-8 py-3.5 font-mono text-sm font-semibold text-ink transition-all duration-300 hover:bg-[#93c5fd] hover:shadow-[0_0_30px_rgba(96,165,250,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
                <Icon
                  name="send"
                  className={cn(
                    "size-4",
                    status === "sending" && "animate-pulse",
                  )}
                />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
