import { buttonVariants } from "@/components/ui/button";
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
    <section
      className={cn(
        "relative overflow-hidden border-y border-border bg-secondary/60 py-14 text-foreground sm:py-20",
        className,
      )}
      aria-label="Host guarantee and creator support"
    >
      <div aria-hidden className="bg-dotted-ink absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
      />

      <div className="container-page relative">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center sm:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            <ShieldCheck className="size-3.5" />
            Host guarantee · Creator support
          </span>
          <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Rolling should feel safe, start to wrap
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            The systems beneath every SceneSlot booking protect people, gear and
            schedules — so both sides of the marketplace can take creative
            risks.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="flex flex-col gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-card text-primary ring-1 ring-border">
                <p.icon className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-heading text-base font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:mt-14 sm:flex-row sm:justify-between sm:text-left">
          <div className="flex max-w-xl flex-col gap-2">
            <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
              Own a creative space? Let it shoot for you.
            </h3>
            <p className="text-sm text-muted-foreground">
              List your studio in 15 minutes, set your own hours, and keep 88%
              of every booking. No listing fees.
            </p>
          </div>
          <Link
            href="/add-studio"
            className={buttonVariants({
              size: "lg",
              className: "shrink-0 gap-2",
            })}
          >
            Host Your Space
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
