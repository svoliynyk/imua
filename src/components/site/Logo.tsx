import { Link } from "@tanstack/react-router";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span
        className={
          tone === "light"
            ? "flex h-9 w-9 items-center justify-center rounded-sm bg-navy-foreground font-display text-sm font-bold text-navy"
            : "flex h-9 w-9 items-center justify-center rounded-sm bg-primary font-display text-sm font-bold text-primary-foreground"
        }
      >
        IM
      </span>
      <span className="leading-none">
        <span
          className={
            tone === "light"
              ? "block font-display text-base font-bold tracking-tight text-navy-foreground"
              : "block font-display text-base font-bold tracking-tight text-foreground"
          }
        >
          INTRAMOTION
        </span>
        <span className="eyebrow block text-accent">Ukraine · IMUA</span>
      </span>
    </Link>
  );
}
