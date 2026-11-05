import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";
import {
  ArrowRight,
  CalendarClock,
  Camera,
  Clapperboard,
  Handshake,
  ImageUp,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "How It Works" };

const creatorSteps = [
  {
    icon: Search,
    title: "Discover Spaces",
    body: "Search hundreds of verified studios by category, city, hourly rate, or specific gear like cyc walls and SM7Bs. Every listing shows real photos, an honest amenity list, and reviews from creators who actually shot there.",
  },
  {
    icon: CalendarClock,
    title: "Select Shoot Hours",
    body: "Open a studio's calendar and pick your date, start time and session length. Availability is live, so you only ever pick truly open slots — no back-and-forth messages just to learn that 6pm is taken.",
  },
  {
    icon: Zap,
    title: "Book Instantly",
    body: "Studios with instant booking confirm on checkout — your payment is held securely until check-in, and the host receives your session details immediately. Request-only studios get a response within 24 hours, usually sooner.",
  },
  {
    icon: Clapperboard,
    title: "Create & Produce",
    body: "Arrive, check in with your door code, and start rolling. The gear in the listing is part of the deal. Wrap, check out, and the invoice and receipt are generated automatically — deposits return after a clean hands-on inspection.",
  },
];

const hostSteps = [
  {
    icon: Camera,
    title: "List Your Space",
    body: "Add your studio with photos, category, hourly rate, capacity and amenities. Our listing wizard walks you through each field, and most hosts publish in about 15 minutes.",
  },
  {
    icon: ShieldCheck,
    title: "Get Verified",
    body: "A quick identity check and address confirmation puts the verified badge on your listing — creators book verified spaces more than twice as often.",
  },
  {
    icon: ImageUp,
    title: "Set Hours & Rules",
    body: "Control your calendar down to the hour: instant booking or request-only, quiet-hour rules, and whether you stay on-site or hand over a door code. You're in charge of the space.",
  },
  {
    icon: Handshake,
    title: "Welcome Creators",
    body: "Accept bookings, meet producers, and get paid automatically after each session. SceneSlot keeps 12%; the rest lands in your payout account within 48 hours of wrap.",
  },
];

const faqs = [
  {
    q: "When am I charged for a booking?",
    a: "Your card is authorised at checkout and captured when the session starts. Nothing is charged for cancelled sessions outside the host's cancellation window, and deposits are released automatically after a clean check-out.",
  },
  {
    q: "What happens if a space doesn't match the listing?",
    a: "Report it within two hours of check-in from your booking page. Our support team reviews the photos you upload, and unmatched sessions are fully refunded under the SceneSlot guarantee.",
  },
  {
    q: "Can I cancel a confirmed booking?",
    a: "Yes. Free cancellation runs until 24 hours before your slot. Inside 24 hours, the host’s session fee applies, but we always re-list the hours so you aren't paying for time you can't use.",
  },
  {
    q: "How do payouts work for hosts?",
    a: "Payouts are sent 48 hours after each completed session, with no minimum balance. You can track every booking, payout and deposit from your dashboard.",
  },
  {
    q: "Is my gear covered while I shoot?",
    a: "Every booking includes liability protection covering damage to the venue; you list your own equipment on the session manifest, and theft or damage beyond the deposit is handled through our claims process.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-secondary/50 py-14 sm:py-20">
        <div aria-hidden className="bg-dotted-ink absolute inset-0 opacity-60" />
        <div className="container-page relative flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
            The SceneSlot flow
          </span>
          <h1 className="font-heading text-4xl font-semibold sm:text-5xl">
            From search to shoot in four steps
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            SceneSlot is a two-sided marketplace: creators find and book creative
            workspaces by the hour, and studio owners turn their space into steady,
            schedule-friendly income.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="gap-2" render={<Link href="/studios" />}>
              Explore Studios
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/add-studio" />}>
              Host Your Space
            </Button>
          </div>
        </div>
      </section>

      {/* For creators */}
      <section className="container-page py-16 sm:py-24" aria-label="For creators">
        <SectionHeading
          eyebrow="For creators"
          title={
            <>
              Book a studio{" "}
              <span className="accent-serif">without the phone calls</span>
            </>
          }
          description="Photographers, filmmakers, podcasters and musicians — here's how a SceneSlot booking works from first browse to final take."
        />
        <ol className="grid gap-6 md:grid-cols-2">
          {creatorSteps.map((s, i) => (
            <li key={s.title} className="flex gap-5 rounded-2xl border-border bg-card p-6 ring-1 ring-foreground/10">
              <div className="flex flex-col items-center gap-2">
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <s.icon className="size-5" strokeWidth={1.8} />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* For owners (dark band) */}
      <section
        className="relative overflow-hidden bg-foreground py-16 text-background sm:py-24"
        aria-label="For studio owners"
      >
        <div aria-hidden className="bg-dotted absolute inset-0 opacity-40" />
        <div className="container-page relative">
          <div
            className={cn(
              "mb-12 flex max-w-2xl flex-col gap-3",
              "mx-auto text-center"
            )}
          >
            <Badge className="mx-auto h-6 bg-primary/20 text-primary">
              For studio owners
            </Badge>
            <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-background">
              Turn open hours into booked hours
            </h2>
            <p className="text-base text-background/70 sm:text-lg">
              Your studio works when you’re not in it. Listing is free, you set
              the rules, and payouts arrive 48 hours after every session.
            </p>
          </div>
          <ol className="grid gap-6 md:grid-cols-2">
            {hostSteps.map((s, i) => (
              <li
                key={s.title}
                className="flex gap-5 rounded-2xl border border-background/15 bg-background/5 p-6"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/20 text-primary">
                    <s.icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-xs text-background/60">0{i + 1}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-lg font-semibold text-background">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-background/65">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex justify-center">
            <Button size="lg" className="gap-2" render={<Link href="/add-studio" />}>
              List your studio — it’s free
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16 sm:py-24" aria-label="Frequently asked questions">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Questions,{" "}
                <span className="accent-serif">answered</span>
              </>
            }
            description="The details creators and hosts ask about most."
          />
          <Accordion>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="leading-relaxed text-muted-foreground">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
