import type { Metadata } from "next";
import { StudioForm } from "@/components/studio/studio-form";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Host a Studio" };

export default async function AddStudioPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?redirect=/add-studio");
  }

  return (
    <section aria-busy="false" className="pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="container-page max-w-4xl">
        {/* Page header — back link and intro centered on mobile, left from sm */}
        <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-10 sm:flex-col sm:items-stretch sm:gap-3 sm:text-left">
          <Link
            href="/dashboard"
            className="inline-flex h-11 w-fit items-center gap-1.5 text-sm font-medium text-foreground/85 transition-colors hover:text-foreground sm:ml-0 sm:h-auto sm:py-0"
          >
            ← Back to dashboard
          </Link>
          <div className="flex w-full flex-col items-center gap-2 sm:items-start sm:text-left">
            <h1 className="font-heading text-[2rem] leading-[1.15] font-semibold text-balance sm:text-4xl">
              List your creative space
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:mx-0">
              Five short sections and your studio goes live to thousands of
              photographers, filmmakers, podcasters and producers. You keep
              control of pricing, hours and who books.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm shadow-foreground/5 sm:p-10">
          <StudioForm
            mode="create"
            hostName={session.user.name ?? ""}
            hostEmail={session.user.email ?? ""}
          />
        </div>
      </div>
    </section>
  );
}