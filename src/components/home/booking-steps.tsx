import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CalendarClock, Clapperboard, Radar, Zap } from "lucide-react";

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
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Four steps between idea{" "}
                <span className="accent-serif">and footage</span>
              </>
            }
            description="SceneSlot handles the paperwork so you can focus on the work — from first browse to final take."
          />
        </Reveal>

        {/* Editorial steps: hairline rules instead of cards, ghost numerals, circular icons.
            The arrow points toward the next step so the progression reads left to right. */}
        <RevealGroup
          as="ol"
          className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <RevealItem
              key={step.title}
              as="li"
              className="group relative flex flex-col border-t border-border pt-7"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="font-heading text-4xl leading-none font-bold text-foreground/15 transition-colors duration-300 group-hover:text-primary motion-reduce:transition-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                  <step.icon className="size-5" strokeWidth={1.6} />
                </span>
                {i < steps.length - 1 ? (
                  <ArrowRight
                    aria-hidden
                    className="ml-auto hidden size-4 text-muted-foreground/40 lg:block"
                  />
                ) : null}
              </div>
              <div className="mt-5 flex flex-col gap-1.5">
                <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
