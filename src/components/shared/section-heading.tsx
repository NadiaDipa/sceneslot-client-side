import { cn } from "cn";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 sm:mb-12",
        centered ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] uppercase text-primary",
            centered && "justify-center"
          )}
        >
          <span aria-hidden className="h-px w-7 bg-primary/50" />
          {eyebrow}
          {centered ? <span aria-hidden className="h-px w-7 bg-primary/50" /> : null}
        </span>
      ) : null}
      <h2 className="text-3xl font-bold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-[2.65rem]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
