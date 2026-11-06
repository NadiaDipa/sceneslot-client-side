import type { Metadata } from "next";
import { MyListingsContent } from "./listings-content";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "My Studio Listings" };

export default async function MyListingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?redirect=/my-listings");
  }

  return (
    <section className="container-page pt-8 pb-12 sm:pt-12 sm:pb-16">
      <MyListingsContent />
    </section>
  );
}