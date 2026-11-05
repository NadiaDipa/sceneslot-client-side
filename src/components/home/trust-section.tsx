import { buttonVariants } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "cn";
import {
  ArrowRight,
  Building2,
  Camera,
  ShieldCheck,
  UserCheck,
  Wrench,
} from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Building2,
    title: "Liability Protection",
    description:
      "Every booking carries built-in coverage for damage claims up to $10,000.",
  },
  {
    icon: UserCheck,
    title: "Verified Profiles",
    description:
      "Government ID checks on hosts and creators, plus reviews from real bookings only.",
  },
  {
    icon: Camera,
    title: "Equipment Safety",
    description:
      "Gear manifests and condition photos on check-in keep contested damage off your schedule.",
  },
  {
    icon: Wrench,
    title: "24/7 Support",
    description:
      "Shoot at 2am? Real humans on shift around the clock for locked doors and dead power.",
  },
];

export function TrustSection({ className }: { className?: string }) {
  return (
    <section className="py-16 sm:py-24" aria-label="Host guarantee and creator support">
      <div className="container-page">
        <Reveal>
          {/* A single refined panel sets this section apart from the page rhythm */}
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl border bg-card shadow-sm",
              className,
            )}
          >
            <div aria-hidden className="bg-dotted-ink absolute inset-0 opacity-50" />
            <div
              aria-hidden
              className="absolute -top-32 right-0 size-80 rounded-full bg-primary/20 blur-[110px]"
            />

            {/* Heading */}
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 pt-12 text-center sm:px-10 sm:pt-16">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.15em] text-primary uppercase ring-1 ring-primary/20">
                <ShieldCheck className="size-3.5" />
                Host guarantee · Creator support
              </span>
              <h2 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl">
                Rolling should feel safe, start to wrap
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                The systems beneath every SceneSlot booking protect people, gear and
                schedules — so both sides of the marketplace can take creative risks.
              </p>
            </div>

            {/* Four pillars, revealed in stagger — open layout, no nested cards */}
            <RevealGroup className="relative mt-10 grid gap-10 px-6 pb-10 sm:grid-cols-2 sm:px-10 sm:pb-14 sm:pt-2 lg:grid-cols-4 lg:gap-x-6">
              {pillars.map((p) => (
                <RevealItem
                  key={p.title}
                  className="group flex flex-col gap-3.5"
                >
                  <span className="grid size-12 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                    <p.icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Host CTA strip */}
            <div className="relative border-t bg-muted/40">
              <div className="flex flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row sm:px-10 sm:py-10">
                <div className="max-w-xl text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                    Own a creative space? Let it shoot for you.
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    List your studio in 15 minutes, set your own hours, and keep 88%
                    of every booking. No listing fees.
                  </p>
                </div>
                <Link
                  href="/add-studio"
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "h-12 shrink-0 gap-2 rounded-lg px-7 text-sm font-semibold",
                  })}
                >
                  Host Your Space
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1 motion-reduce:transform-none" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
