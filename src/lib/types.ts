export type CategoryName =
  | "Photo Studios"
  | "Sound Stages"
  | "Podcast Rooms"
  | "Music Suites"
  | "Art Workshops";

export interface Host {
  name: string;
  email: string;
  avatar: string;
  joined: string;
  responseRate: string;
  bio: string;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Studio {
  id: string;
  title: string;
  category: CategoryName;
  description: string;
  overview: string;
  image: string;
  gallery: string[];
  hourlyRate: number;
  deposit: number;
  maxCapacity: number;
  location: string;
  address: string;
  amenities: string[];
  rating: number;
  reviewsCount: number;
  host: Host;
  reviews: Review[];
  featured?: boolean;
}

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface Booking {
  id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  category: CategoryName;
  location: string;
  date: string;
  hours: string[];
  guests: number;
  total: number;
  status: BookingStatus;
}

export interface DemoUser {
  name: string;
  email: string;
  avatar: string;
  role: string;
  memberSince: string;
}

export type StudioStatus = "Active" | "Draft" | "Inactive";

export interface Listing {
  studioId: string;
  title: string;
  category: CategoryName;
  image: string;
  location: string;
  hourlyRate: number;
  bookingsThisMonth: number;
  status: StudioStatus;
}
