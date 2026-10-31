import { Logo } from "@/components/layout/logo";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background lg:grid lg:grid-cols-2">
      {/* Visual side (desktop only) */}
      <div className="relative hidden overflow-hidden bg-foreground lg:block">
        <Image
          src="https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=1600&auto=format&fit=crop"
          alt="Creator posing in a red-backdrop photo studio"
          fill
          priority
          className="object-cover opacity-80"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
        <div className="absolute bottom-0 flex flex-col gap-3 p-10">
          <p className="font-heading text-2xl font-semibold text-background">
            Your next great shoot starts with the right room.
          </p>
          <p className="max-w-md text-sm text-background/70">
            Join thousands of photographers, podcasters, and producers booking
            verified creative studios by the hour.
          </p>
        </div>
        <div aria-hidden className="bg-dotted absolute inset-0" />
      </div>

      {/* Form side */}
      <div className="flex flex-col px-5 py-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-14">
          <div className="w-full max-w-md">{children}</div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SceneSlot Inc. · UI preview, no real
          accounts are created yet.
        </p>
      </div>
    </div>
  );
}
