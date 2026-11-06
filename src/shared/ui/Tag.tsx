import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-pit px-3 py-1 font-mono text-[11px] text-mist">
      {children}
    </span>
  );
}
