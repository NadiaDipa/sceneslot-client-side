import type { Metadata } from "next";
import { StudioForm } from "@/components/studio/studio-form";
import { fetchStudioById } from "@/lib/api";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const studio = await fetchStudioById(id);
    return { title: studio ? `Edit ${studio.title}` : "Edit Studio" };
  } catch {
    return { title: "Edit Studio" };
  }
}

export default async function EditStudioPage({ params }: Props) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/login?redirect=/studios/edit/${id}`);
  }

  const studio = await fetchStudioById(id);
  if (!studio) notFound();

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page max-w-4xl">
        <div className="mb-10 flex flex-col gap-3">
          <Link
            href="/my-listings"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to listings
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
              Edit &ldquo;{studio.title}&rdquo;
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Update photos, pricing, or amenities — changes are reviewed for
              quality, not price.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm shadow-foreground/5 sm:p-10">
          <StudioForm
            studio={studio}
            mode="edit"
            hostName={session.user.name || ""}
            hostEmail={session.user.email || ""}
          />
        </div>
      </div>
    </section>
  );
}