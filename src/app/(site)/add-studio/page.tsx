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
    redirect("/login");
  }
  return (
    <section aria-busy="false" className="py-10 sm:py-14">
      <div className="container-page max-w-4xl">
        {/* Page header */}
        <div className="mb-10 flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to dashboard
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
              List your creative space
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Five short sections and your studio goes live to thousands of
              photographers, filmmakers, podcasters and producers. You keep
              control of pricing, hours and who books.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm shadow-foreground/5 sm:p-10">
          <StudioForm mode="create" />
        </div>
      </div>
    </section>
  );
}
