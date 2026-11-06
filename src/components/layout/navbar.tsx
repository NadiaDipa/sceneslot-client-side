"use client";

import { Logo } from "@/components/layout/logo";
import { ProfileDropdown } from "@/components/layout/profile-dropdown";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";
import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

export function Navbar() {
  const { data: session, isPending } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-40 w-full border-b border-border/70",
        "transition-all duration-300 ease-out",
        scrolled && "site-header-scrolled",
      )}
    >
      <div className="container-page grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-3 lg:h-[80px]">
        {/* Brand — left on mobile (forced per design), left on desktop.
            Explicit column placement keeps one clean row: logo left, controls right. */}
        <div className="col-start-1 flex min-w-0 items-center justify-start lg:justify-start">
          <Logo
            className="transition-opacity duration-200 outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/60 rounded-lg"
          />
        </div>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative whitespace-nowrap rounded-full px-4 py-2.5",
                  "text-[13px] font-semibold tracking-wide",
                  "outline-none transition-all duration-200",
                  "focus-visible:ring-2 focus-visible:ring-ring/70",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
                )}
              >
                {link.label}

                {/* Short muted-gold underline for the active pill */}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#978F66] transition-all duration-300",
                    active
                      ? "w-5 opacity-100"
                      : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right side — same column arrangement on mobile and desktop:
            controls at the far RIGHT, keeping one row with the left logo. */}
        <div className="col-start-3 flex items-center justify-end gap-2 sm:gap-3 lg:col-start-3 lg:justify-end">
          <div className="rounded-full border border-border/80 bg-card/70 p-0.5 shadow-sm">
            <ThemeToggle />
          </div>

          {isPending ? (
            <div
              className="hidden h-10 w-28 animate-pulse rounded-full bg-muted lg:block"
              aria-hidden
            />
          ) : isAuthenticated ? (
            <div className="hidden lg:block">
              <ProfileDropdown />
            </div>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Button
                variant="ghost"
                render={<Link href="/login" />}
                className="h-10 rounded-full px-5 text-[13px] font-semibold text-foreground/75 transition-all hover:bg-foreground/5 hover:text-foreground"
              >
                Log in
              </Button>

              <Button
                render={<Link href="/register" />}
                className="group h-10 rounded-full px-5 text-[13px] font-bold shadow-md shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/40"
              >
                Get Started
                <ArrowUpRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 rounded-full border-border/80 bg-card/70 text-foreground hover:bg-accent/60 hover:text-accent-foreground lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-[19px]" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(340px,88vw)] border-l border-border/70 bg-background p-0"
            >
              <SheetTitle className="sr-only">SceneSlot menu</SheetTitle>

              <div className="flex h-full flex-col">
                <div className="border-b border-border/70 px-6 py-6">
                  <Logo />
                  <p className="mt-3 text-xs tracking-wide text-muted-foreground">
                    Find your creative space.
                  </p>
                </div>

                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-2 px-4 py-6"
                >
                  <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Explore
                  </p>

                  {navLinks.map((link) => {
                    const active = isActive(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3.5",
                          "text-sm font-semibold transition-all duration-200",
                          active
                            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                            : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                        )}
                      >
                        {link.label}

                        {active && (
                          <span className="size-1.5 rounded-full bg-[#978F66]" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto border-t border-border/70 p-5">
                  {isPending ? (
                    <div
                      className="h-10 w-full animate-pulse rounded-full bg-muted"
                      aria-hidden
                    />
                  ) : isAuthenticated ? (
                    <ProfileDropdown />
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        render={<Link href="/login" />}
                        onClick={() => setOpen(false)}
                        className="h-11 w-full rounded-full font-semibold hover:border-primary hover:bg-primary/10 hover:text-primary"
                      >
                        Log in
                      </Button>

                      <Button
                        render={<Link href="/register" />}
                        onClick={() => setOpen(false)}
                        className="h-11 w-full rounded-full font-semibold shadow-md shadow-primary/25"
                      >
                        Get Started
                        <ArrowUpRight className="ml-1 size-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
