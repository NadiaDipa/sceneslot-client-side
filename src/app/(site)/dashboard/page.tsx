import type { Metadata } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { bookings, demoUser, listings } from "@/data/studios";
import { cn } from "cn";
import {
  ArrowRight,
  CalendarCheck,
  CalendarPlus,
  DollarSign,
  Plus,
  Settings,
  Star,
  TrendingUp,
  X as Close,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Dashboard" };

const summary = [
  {
    icon: CalendarCheck,
    label: "Total bookings",
    value: "24",
    delta: "+3 this month",
  },
  {
    icon: DollarSign,
    label: "Earnings (30 days)",
    value: "$1,940",
    delta: "+12.5% vs last month",
  },
  {
    icon: Star,
    label: "Average rating",
    value: "4.9",
    delta: "Across 3 spaces",
  },
  {
    icon: TrendingUp,
    label: "Occupancy rate",
    value: "68%",
    delta: "+5% this month",
  },
];

const activity = [
  {
    id: 1,
    icon: CalendarPlus,
    title: "New booking request — Aurora Audio Suites",
    detail: "Nov 14, 10:00–14:00 · 5 guests",
    time: "2h ago",
    accent: true,
  },
  {
    id: 2,
    icon: Star,
    title: "Priya Nair left a 5★ review",
    detail: "“The light in this loft is unreal…”",
    time: "1d ago",
  },
  {
    id: 3,
    icon: DollarSign,
    title: "Payout completed — $481.50",
    detail: "Visa •• 4821 · 3 sessions settled",
    time: "2d ago",
  },
  {
    id: 4,
    icon: Close,
    title: "Booking cancelled — The Makers' Atelier",
    detail: "Oct 9 slot released back to inventory",
    time: "3w ago",
  },
];

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const initials = demoUser.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  const pending = bookings.filter((b) => b.status === "Pending").length;

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page flex flex-col gap-10">
        {/* Welcome */}
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src={demoUser.avatar} alt={demoUser.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
                Welcome back, {demoUser.name.split(" ")[0]}
              </h1>
              <p className="text-sm text-muted-foreground">
                {pending > 0
                  ? `You have ${pending} booking${pending > 1 ? "s" : ""} waiting for host confirmation.`
                  : "Everything is confirmed — enjoy the studio time."}
              </p>
            </div>
          </div>
          <Button variant="outline" size="icon" aria-label="Account settings">
            <Settings />
          </Button>
        </header>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Summary">
          {summary.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-3 rounded-2xl border-border bg-card p-5 ring-1 ring-foreground/10"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                <s.icon className="size-4.5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-heading text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
              <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                {s.delta}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          {/* Recent activity */}
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <h2 className="font-heading text-xl font-semibold">Recent activity</h2>
              <Link
                href="/my-bookings"
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                View all bookings
              </Link>
            </div>
            <ul className="flex flex-col gap-3">
              {activity.map((a) => (
                <li
                  key={a.id}
                  className={cn(
                    "flex items-start gap-3.5 rounded-2xl border-border bg-card p-4 ring-1 ring-foreground/10",
                    a.accent && "bg-accent/40"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg",
                      a.accent
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    <a.icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.detail}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick actions */}
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-xl font-semibold">Quick actions</h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  href: "/add-studio",
                  icon: Plus,
                  title: "Add New Studio",
                  desc: "List a space in about 15 minutes",
                },
                {
                  href: "/my-listings",
                  icon: TrendingUp,
                  title: "My Studio Listings",
                  desc: `${listings.length} spaces · edit pricing & photos`,
                },
                {
                  href: "/studios",
                  icon: ArrowRight,
                  title: "Explore Studios",
                  desc: "Find a space for your next shoot",
                },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="group flex items-center gap-3.5 rounded-2xl border-border bg-card p-4 ring-1 ring-foreground/10 transition-all outline-none hover:-translate-y-0.5 hover:shadow-md hover:shadow-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <a.icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{a.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {a.desc}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
