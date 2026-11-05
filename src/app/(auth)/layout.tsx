import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CalendarX2, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const perks = [
  { icon: Zap, title: "Instant booking", text: "Pick a slot and confirm in one tap." },
  { icon: CalendarX2, title: "Free cancellation", text: "Plans change. Your booking can too." },
  { icon: ShieldCheck, title: "Verified hosts", text: "Real spaces, real photos, honest specs." },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Visual side (desktop only) */}
      <div className="relative hidden overflow-hidden bg-[#1b130d] lg:block">
        <Image
          src="https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=1600&auto=format&fit=crop"
          alt="Creator working in a professional photo studio"
          fill
          priority
          className="object-cover opacity-50"
          sizes="55vw"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b130d] via-[#1b130d]/70 to-[#1b130d]/30" />
        <div className="pointer-events-none absolute -top-32 -left-32 size-[28rem] rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-32 size-[26rem] rounded-full bg-primary/20 blur-3xl" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:26px_26px]"
        />

        {/* Content */}
        <div className="relative flex h-full flex-col justify-end gap-8 p-12 text-white">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-4xl leading-tight font-semibold xl:text-5xl">
              Your next great shoot
              <br />
              starts with{" "}
              <span className="bg-gradient-to-r from-[#C9AC72] to-[#E4D6A9] bg-clip-text font-serif italic text-transparent">
                the right room.
              </span>
            </h2>
            <p className="max-w-md text-base text-white/70">
              Join thousands of photographers, podcasters, and producers
              booking verified creative studios by the hour.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {perks.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-white/60">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-col px-5 py-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to home
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-14">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SceneSlot Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}