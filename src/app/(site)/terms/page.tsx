import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: October 2026 · SceneSlot UI preview
      </p>
      <Separator className="my-8" />
      <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          These sample terms accompany the SceneSlot UI preview. The complete,
          enforceable terms ship together with the platform backend: bookings,
          payments, and user accounts.
        </p>
        <div>
          <h2 className="font-heading mb-2 text-lg font-semibold text-foreground">
            1. The marketplace
          </h2>
          <p>
            SceneSlot is a venue that connects studio owners with creators.
            SceneSlot itself does not own or operate the listed studios; each
            host is responsible for the accuracy of their listing and the space
            during booked sessions.
          </p>
        </div>
        <div>
          <h2 className="font-heading mb-2 text-lg font-semibold text-foreground">
            2. Bookings & payments
          </h2>
          <p>
            Creators authorise payment at checkout and are charged when the
            session starts. Security deposits are returned after a clean
            check-out, within the timelines shown at booking time.
          </p>
        </div>
        <div>
          <h2 className="font-heading mb-2 text-lg font-semibold text-foreground">
            3. Cancellations
          </h2>
          <p>
            Free cancellation applies up to 24 hours before a session. Within
            that window, the host’s session fee may apply, and the hours are
            re-listed for other creators.
          </p>
        </div>
        <div>
          <h2 className="font-heading mb-2 text-lg font-semibold text-foreground">
            4. Conduct
          </h2>
          <p>
            All users must represent themselves honestly, respect studio rules,
            and treat people and equipment with care. Listings that misrepresent
            a space may be removed without notice.
          </p>
        </div>
      </div>
    </article>
  );
}
