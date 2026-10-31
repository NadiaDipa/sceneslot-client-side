import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center sm:py-20",
        className
      )}
    >
      <div
        aria-hidden
        className="bg-dotted-ink pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative flex flex-col items-center gap-4">
        <div className="grid size-16 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Icon className="size-8" strokeWidth={1.6} />
        </div>
        <div className="flex flex-col gap-1.5">
          <h2 className="font-heading text-xl font-semibold sm:text-2xl">{title}</h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
        <Button render={<Link href={actionHref} />} size="lg" className="mt-2">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
