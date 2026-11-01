import type { Studio } from "./types";

/** Base URL of the Express + MongoDB backend (sceneslot-server). */
export const API_BASE = "http://localhost:5000";

/** Raw studio document shape stored in the `studios` collection. */
export interface StudioDoc {
  _id: string;
  title?: string;
  category?: string;
  description?: string;
  overview?: string;
  image?: string;
  hourlyRate?: number | string;
  deposit?: number | string;
  maxCapacity?: number | string;
  location?: string;
  address?: string;
  amenities?: string[];
  hostName?: string;
  hostEmail?: string;
}

/** Map a Mongo document to the `Studio` shape the UI expects. */
export function mapStudioDoc(doc: StudioDoc): Studio {
  const image = doc.image ?? "";
  return {
    id: String(doc._id),
    title: doc.title ?? "Untitled Studio",
    category: (doc.category ?? "Photo Studios") as Studio["category"],
    // Docs created with the form only store `overview`; older demo docs
    // may already include a short `description`.
    description: doc.description ?? doc.overview ?? "",
    overview: doc.overview ?? doc.description ?? "",
    image,
    gallery: image ? [image] : [],
    hourlyRate: Number(doc.hourlyRate ?? 0),
    deposit: Number(doc.deposit ?? 0),
    maxCapacity: Number(doc.maxCapacity ?? 1),
    location: doc.location ?? "",
    address: doc.address ?? "",
    amenities: Array.isArray(doc.amenities) ? doc.amenities : [],
    // Backend-backed listings have no reviews yet
    rating: 0,
    reviewsCount: 0,
    host: {
      name: doc.hostName ?? "SceneSlot Host",
      email: doc.hostEmail ?? "",
      avatar: "",
      joined: "New host",
      responseRate: "",
      bio: "This host hasn't written a bio yet, but feel free to reach out.",
    },
    reviews: [],
  };
}


