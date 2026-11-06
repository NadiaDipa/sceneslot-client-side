import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Aperture,
  Building2,
  CalendarCheck,
  Eye,
  HeartHandshake,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "About Us" };

const stats = [
  { icon: Building2, value: "370+", label: "Verified studios" },
  { icon: Users, value: "12,000+", label: "Creators & hosts" },
  { icon: CalendarCheck, value: "48,000", label: "Studio hours booked" },
  { icon: MapPin, value: "31", label: "Cities and counting" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Rooms spark ideas",
    body: "The right space — its light, its sound, its walls — is half the creative work. We exist to put more creators in more of those rooms.",
  },
  {
    icon: ShieldCheck,
    title: "Trust is the product",
    body: "Verified profiles, honest listings, and photo-documented check-ins protect creators and hosts equally. No booking without accountability.",
  },
  {
    icon: HeartHandshake,
    title: "Two-sided fairness",
    body: "Hosts keep 88% of every session and set their own rules. Creators get transparent pricing with no hidden fees at checkout.",
  },
  {
    icon: Eye,
    title: "Show, don't promise",
    body: "Every claim on SceneSlot — from 'acoustically treated' to '95+ CRI lighting' — has to be backed by photos, specs, or a badge we can verify.",
  },
];

const team = [
  { name: "Amara Hossain", role: "Founder & CEO", avatar: "https://i.pravatar.cc/150?img=47" },
  { name: "Ray Delgado", role: "Head of Audio Spaces", avatar: "https://i.pravatar.cc/150?img=52" },
  { name: "Lena Marsh", role: "Head of Studio Quality", avatar: "https://i.pravatar.cc/150?img=32" },
  { name: "Drew Callahan", role: "Host Partnerships", avatar: "https://i.pravatar.cc/150?img=60" },
];

const timeline = [
  {
    year: "2024",
    title: "The problem",
    body: "A photographer in Brooklyn and a podcaster in Austin both lose a shoot day to a bad studio listing — and start sketching the same marketplace, 2,000 km apart.",
  },
  {
    year: "2025",
    title: "The first spaces",
    body: "SceneSlot launches with 12 studios in 3 cities. Every listing is personally visited by the founding team before it goes live.",
  },
  {
    year: "2026",
    title: "The marketplace",
    body: "370+ verified studios, instant booking, built-in liability protection, and a 4.9 average rating across 48,000 booked hours — with new cities added monthly.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-foreground py-16 text-background sm:py-24">
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop"
          alt="Sunlit creative studio with glass walls"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/30" />
        <div aria-hidden className="bg-dotted absolute inset-0 opacity-30" />
        <div className="container-page relative flex max-w-3xl flex-col items-center gap-4 text-center">
          <Badge className="h-6 bg-primary text-primary-foreground">
            <Aperture className="size-3.5" />
            About SceneSlot
          </Badge>
          <h1 className="font-heading text-4xl font-semibold sm:text-5xl">
            We match creative energy with creative space
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
            SceneSlot is a peer-to-peer marketplace where photographers,
            filmmakers, podcasters, musicians and makers find the rooms their work
            deserves — by the hour, without the lease.
          </p>
          <Button size="lg" className="mt-2 gap-2" render={<Link href="/studios" />}>
            Explore Studios
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>

      {/* Mission */}
      <section className="container-page py-16 sm:py-24" aria-label="Our mission">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-5 text-center sm:items-start sm:gap-5 sm:text-left">
            <SectionHeading
              align="left"
              eyebrow="Mission"
            title={
              <>
                Every creator, a room that{" "}
                <span className="accent-serif">keeps up with them</span>
              </>
            }
              className="mb-0"
            />
            <p className="text-base leading-relaxed text-muted-foreground">
              Great work rarely happens in the wrong room. Yet for most creators,
              finding a good one means group chats, DMs, texted bank transfers,
              and unwritten studio rules.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              SceneSlot replaces all of that with one honest, hourly marketplace:
              real photos, verified hosts, published gear, instant booking, and
              protection on both sides. Studio owners list their spaces for free
              and keep control of their calendar; creators pay only for the hours
              they actually shoot.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              We don’t own a single studio. Our job is being the layer of trust
              between the people who make things and the places that help them
              make things.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" aria-label="Platform at a glance">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 rounded-2xl border-border bg-card p-6 text-center ring-1 ring-foreground/10 sm:items-start sm:text-left"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <s.icon className="size-5" strokeWidth={1.8} />
                </span>
                <p className="font-heading text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-secondary/40 py-16 sm:py-24" aria-label="Values">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we believe"
            title={
              <>
                Four principles{" "}
                <span className="accent-serif">behind every booking</span>
              </>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="group flex flex-col items-center gap-3.5 rounded-2xl border-border bg-card p-6 text-center ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-foreground/5 sm:items-start sm:text-left"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <v.icon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="font-heading text-base font-semibold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section className="container-page py-16 sm:py-24" aria-label="Our story">
        <SectionHeading
          eyebrow="Our story"
          title={
            <>
              Two frustrated shoots became{" "}
              <span className="accent-serif">one platform</span>
            </>
          }
        />
        <ol className="relative mx-auto flex max-w-3xl flex-col gap-8 border-l border-border pl-8">
          {timeline.map((t) => (
            <li key={t.year} className="relative flex flex-col gap-1.5">
              <span
                aria-hidden
                className="absolute top-1 -left-[2.4rem] grid size-5 place-items-center rounded-full border-2 border-primary bg-background"
              />
              <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
                {t.year}
              </span>
              <h3 className="font-heading text-lg font-semibold">{t.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="pb-16 sm:pb-24" aria-label="Team">
        <div className="container-page">
          <div className="rounded-3xl bg-foreground px-6 py-14 text-background sm:px-10">
            <div className="mb-10 flex max-w-2xl flex-col gap-3 text-center mx-auto">
              <Badge className="mx-auto h-6 bg-primary text-primary-foreground">
                <Sparkles className="size-3.5" />
                The team
              </Badge>
              <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-background">
                Built by people who book studios for a living
              </h2>
              <p className="text-sm text-background/70 sm:text-base">
                Between us, we’ve shot campaigns, cut records, produced podcasts,
                and managed stages — SceneSlot is the platform we always wished
                existed.
              </p>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m) => (
                <li key={m.name} className="flex flex-col items-center gap-2 text-center">
                  <Avatar className="size-16">
                    <AvatarImage src={m.avatar} alt={m.name} />
                    <AvatarFallback>
                      {m.name.split(" ").map((p) => p[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-heading text-sm font-semibold text-background">{m.name}</p>
                  <p className="text-xs text-background/60">{m.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
