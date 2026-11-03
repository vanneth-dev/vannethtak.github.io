import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Sign in — Vanneth Tak";
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-5 py-12">
      <div
        className="bg-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md"></div>
    </main>
  );
}
