import type { Metadata } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Dashboard" };

interface DashboardData {
  summary: {
    totalBookings: number;
    earnings: number;
    averageRating: number;
    totalListings: number;
  };
  recentActivity: {
    id: string;
    title: string;
    detail: string;
    status: string;
    createdAt: string;
  }[];
}

export default async function DashboardPage() {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session) {
    redirect("/login?redirect=/dashboard");
  }

  let dashboardData: DashboardData | null = null;

  try {
    // Forward only the cookie (not the Host header) to the Express server
    const response = await fetch(
      `${process.env.API_BASE_URL}/dashboard`,
      {
        headers: { cookie: requestHeaders.get("cookie") ?? "" },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    dashboardData = await response.json();
  } catch (error) {
    console.error("Dashboard fetch error:", error);
  }

  const userName = session.user.name || "User";

  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const summary = [
    {
      icon: CalendarCheck,
      label: "Total bookings",
      value: dashboardData?.summary.totalBookings ?? "—",
    },
    {
      icon: DollarSign,
      label: "Booking value (30 days)",
      value: dashboardData
        ? `$${dashboardData.summary.earnings.toLocaleString()}`
        : "—",
    },
    {
      icon: Star,
      label: "Average rating",
      value: dashboardData
        ? dashboardData.summary.averageRating.toFixed(1)
        : "—",
    },
    {
      icon: TrendingUp,
      label: "My studio listings",
      value: dashboardData?.summary.totalListings ?? "—",
    },
  ];

  const activity = (dashboardData?.recentActivity ?? []).slice(0, 4);

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page flex flex-col gap-10">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src={session.user.image || ""} alt={userName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-0.5">
              <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
                Welcome back, {userName.split(" ")[0]}
              </h1>
              <p className="text-sm text-muted-foreground">
                Here&apos;s an overview of your studio activity.
              </p>
            </div>
          </div>

          <Button variant="outline" size="icon" aria-label="Account settings">
            <Settings />
          </Button>
        </header>

        <div
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          aria-label="Summary"
        >
          {summary.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-3 rounded-2xl border-border bg-card p-5 ring-1 ring-foreground/10"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                <item.icon className="size-4.5" strokeWidth={1.8} />
              </span>

              <div>
                <p className="font-heading text-2xl font-semibold">
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {!dashboardData && (
          <p className="text-sm text-destructive">
            Dashboard data could not be loaded. Please try again.
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <h2 className="font-heading text-xl font-semibold">
                Recent activity
              </h2>

              <Link
                href="/my-bookings"
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                View all bookings
              </Link>
            </div>

            {activity.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {activity.map((item, index) => (
                  <li
                    key={item.id}
                    className={cn(
                      "flex items-start gap-3.5 rounded-2xl border-border bg-card p-4 ring-1 ring-foreground/10",
                      index === 0 && "bg-accent/40"
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-lg",
                        index === 0
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      <CalendarPlus className="size-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.detail}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Status: {item.status}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                No recent booking activity yet.
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-xl font-semibold">
              Quick actions
            </h2>

            <div className="flex flex-col gap-3">
              {[
                {
                  href: "/add-studio",
                  icon: Plus,
                  title: "Add New Studio",
                  desc: "List a new creative space",
                },
                {
                  href: "/my-listings",
                  icon: TrendingUp,
                  title: "My Studio Listings",
                  desc: `${dashboardData?.summary.totalListings ?? 0} spaces · edit pricing & photos`,
                },
                {
                  href: "/studios",
                  icon: ArrowRight,
                  title: "Explore Studios",
                  desc: "Find a space for your next shoot",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3.5 rounded-2xl border-border bg-card p-4 ring-1 ring-foreground/10 transition-all outline-none hover:-translate-y-0.5 hover:shadow-md hover:shadow-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="size-4" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">
                      {item.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {item.desc}
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