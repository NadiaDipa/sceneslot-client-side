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
    redirect("/login");
  }

  return (
    <section className="container-page py-10 sm:py-14">
      <MyListingsContent />
    </section>
  );
}