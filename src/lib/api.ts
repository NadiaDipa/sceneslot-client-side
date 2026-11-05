
import type { Studio } from "./types";

/** Base URL of the Express + MongoDB backend (sceneslot-server). */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

/** Raw studio document shape stored in the `studios` collection. */
export interface StudioDoc {
  _id: string;
  title?: string;
  category?: string;
  description?: string;
  overview?: string;
  image?: string;
  gallery?: string[];
  hourlyRate?: number | string;
  deposit?: number | string;
  maxCapacity?: number | string;
  location?: string;
  address?: string;
  amenities?: string[];
  hostName?: string;
  hostEmail?: string;
  ownerName?: string;
  ownerEmail?: string;
  rating?: number;
  reviewsCount?: number;
}

/** Map a Mongo document to the `Studio` shape the UI expects. */
export function mapStudioDoc(doc: StudioDoc): Studio {
  const gallery =
    Array.isArray(doc.gallery) && doc.gallery.length > 0
      ? doc.gallery
      : doc.image
        ? [doc.image]
        : [];

  const image = doc.image ?? gallery[0] ?? "";

  return {
    id: String(doc._id),
    title: doc.title ?? "Untitled Studio",
    category: (doc.category ?? "Photo Studios") as Studio["category"],
    description: doc.description ?? doc.overview ?? "",
    overview: doc.overview ?? doc.description ?? "",
    image,
    gallery,
    hourlyRate: Number(doc.hourlyRate ?? 0),
    deposit: Number(doc.deposit ?? 0),
    maxCapacity: Number(doc.maxCapacity ?? 1),
    location: doc.location ?? "",
    address: doc.address ?? "",
    amenities: Array.isArray(doc.amenities) ? doc.amenities : [],
    rating: Number(doc.rating ?? 0),
    reviewsCount: Number(doc.reviewsCount ?? 0),
    host: {
      name: doc.hostName ?? doc.ownerName ?? "SceneSlot Host",
      email: doc.hostEmail ?? doc.ownerEmail ?? "",
      avatar: "",
      joined: "New host",
      responseRate: "",
      bio: "This host hasn't written a bio yet, but feel free to reach out.",
    },
    reviews: [],
  };
}

// Fetch a single studio by ID. Returns null when the studio does not exist.
export async function fetchStudioById(id: string): Promise<Studio | null> {
  const res = await fetch(`${API_BASE}/studios/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404 || res.status === 400) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch studio");
  }

  const doc: StudioDoc = await res.json();

  return mapStudioDoc(doc);
}
