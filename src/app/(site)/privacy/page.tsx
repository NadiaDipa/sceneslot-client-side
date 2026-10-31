import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <article className="container-page max-w-3xl py-14 sm:py-20">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: October 2026 · SceneSlot UI preview
      </p>
      <Separator className="my-8" />
      <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          This sample policy accompanies the SceneSlot UI preview. The final
          policy ships with the platform backend, once real data handling begins.
        </p>
        <div>
          <h2 className="font-heading mb-2 text-lg font-semibold text-foreground">
            1. What we collect
          </h2>
          <p>
            Account details (name, email, profile photo), booking history, and
            messages with hosts or creators. Payment data is handled by our
            payment processor and never stored on SceneSlot servers.
          </p>
        </div>
        <div>
          <h2 className="font-heading mb-2 text-lg font-semibold text-foreground">
            2. How we use it
          </h2>
          <p>
            To run bookings, verify profiles, show accurate availability, settle
            payouts, and provide support. We never sell personal data to third
            parties.
          </p>
        </div>
        <div>
          <h2 className="font-heading mb-2 text-lg font-semibold text-foreground">
            3. Your controls
          </h2>
          <p>
            You can export or delete your data from your account settings at any
            time, and deactivate listings or bookings without losing your review
            history.
          </p>
        </div>
      </div>
    </article>
  );
}
