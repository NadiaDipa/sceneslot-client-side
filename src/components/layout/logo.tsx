import { Aperture } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";

interface LogoProps {
  className?: string;
  /** Use on dark backgrounds */
  light?: boolean;
}

export function Logo({ className, light = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="SceneSlot home"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:rotate-45">
        <Aperture className="size-5" strokeWidth={2.2} />
      </span>
      <span
        className={cn(
          "font-heading text-lg font-semibold tracking-tight",
          light ? "text-background" : "text-foreground"
        )}
      >
        Scene<span className="text-primary">Slot</span>
      </span>
    </Link>
  );
}
