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
import { Menu } from "lucide-react";
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

  // Visual only: increase backdrop blur + add a soft bottom shadow after 10px scroll
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
        "sticky top-0 z-40 w-full border-b border-transparent bg-background/60 backdrop-blur-sm transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 motion-reduce:transition-none",
        scrolled &&
          "border-border/70 bg-background/80 backdrop-blur-xl shadow-lg shadow-foreground/5",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive(link.href)
                  ? "text-foreground after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isPending ? (
            <div
              className="hidden h-10 w-24 animate-pulse rounded-full bg-muted md:block"
              aria-hidden
            />
          ) : isAuthenticated ? (
            <div className="hidden md:block">
              <ProfileDropdown />
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" render={<Link href="/login" />}>
                Login
              </Button>
              <Button render={<Link href="/register" />}>Register</Button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">SceneSlot menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="border-b p-4">
                  <Logo />
                </div>
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-1 p-4"
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto border-t p-4">
                  {isPending ? (
                    <div
                      className="h-10 w-full animate-pulse rounded-full bg-muted"
                      aria-hidden
                    />
                  ) : isAuthenticated ? (
                    <ProfileDropdown />
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        render={<Link href="/login" />}
                        onClick={() => setOpen(false)}
                      >
                        Login
                      </Button>
                      <Button
                        render={<Link href="/register" />}
                        onClick={() => setOpen(false)}
                      >
                        Register
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