import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "cn";
import type { LucideIcon } from "lucide-react";
import { CalendarClock, Clapperboard, Radar, Zap } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Radar,
    title: "Discover Spaces",
    description:
      "Filter by category, city, or gear. Every listing is verified with real photos and honest specs.",
  },
  {
    icon: CalendarClock,
    title: "Select Shoot Hours",
    description:
      "Pick your date and slot length — see live availability and lock the hours you need.",
  },
  {
    icon: Zap,
    title: "Book Instantly",
    description:
      "Confirm with one tap. Instant-booking studios don't wait for approvals.",
  },
  {
    icon: Clapperboard,
    title: "Create & Produce",
    description:
      "Check in with your door code, start rolling, and settle up automatically when you wrap.",
  },
];

export function BookingSteps() {
  return (
    <section className="py-16 sm:py-24" aria-label="How booking works">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps between idea and footage"
          description="SceneSlot handles the paperwork so you can focus on the work — from first browse to final take."
        />
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-foreground/5"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.icon className="size-5" strokeWidth={1.8} />
                </span>
                <span
                  className={cn(
                    "font-heading text-4xl font-semibold text-transparent opacity-40",
                    "[-webkit-text-stroke:1px_var(--muted-foreground)]"
                  )}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-base font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
