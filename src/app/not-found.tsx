import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { Aperture, Clapperboard, Gauge } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-foreground px-6 py-16 text-background">
      <div aria-hidden className="bg-dotted absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[110px]"
      />

      {/* Themed "studio lights" illustration */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden justify-between px-[10%] sm:flex">
        {["-rotate-12", "rotate-6", "-rotate-6", "rotate-12"].map((r, i) => (
          <div key={i} className={cn("flex flex-col items-center", r)}>
            <span className="h-10 w-px bg-background/25" />
            <span className={cn(
              "size-14 rounded-b-full border-2 border-background/40 border-t-transparent",
              i % 2 === 0 && "mt-4"
            )} />
            <span className="size-3 rounded-full bg-primary/80 blur-[1px]" />
          </div>
        ))}
      </div>

      <div className="relative flex max-w-lg flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Aperture className="size-6" />
          </span>
          <span className="text-left">
            <span className="block font-heading text-lg font-semibold">SceneSlot</span>
            <span className="block text-xs text-background/60">Studio 404</span>
          </span>
        </div>

        <p className="font-heading font-semibold text-primary tracking-widest uppercase text-sm">
          Looks like this set wasn’t built
        </p>
        <h1 className="font-heading text-5xl font-semibold sm:text-6xl">
          404 — page not in the can
        </h1>
        <p className="max-w-md text-base leading-relaxed text-background/70">
          The page you’re looking for was probably struck from the call sheet.
          Let’s get you back to a really well-lit set.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" className="gap-2" render={<Link href="/" />}>
            <Gauge className="size-4" />
            Back to Home
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-background/40 bg-background/10 text-background backdrop-blur-sm hover:bg-background hover:text-foreground"
            render={<Link href="/studios" />}
          >
            <Clapperboard className="size-4" />
            Explore Studios
          </Button>
        </div>
      </div>
    </div>
  );
}
