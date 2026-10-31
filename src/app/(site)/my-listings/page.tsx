import type { Metadata } from "next";
import { MyListingsContent } from "./listings-content";

export const metadata: Metadata = { title: "My Studio Listings" };

export default function MyListingsPage() {
  return (
    <section className="container-page py-10 sm:py-14">
      <MyListingsContent />
    </section>
  );
}
