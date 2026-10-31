import type { CategoryName } from "@/lib/types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

export interface Category {
  name: CategoryName;
  tagline: string;
  description: string;
  image: string;
  listings: string;
}

export const categories: Category[] = [
  {
    name: "Photo Studios",
    tagline: "Portrait, product & content spaces",
    description:
      "Cyclorama walls, strobes, and daylight studios ready for your next shoot.",
    image: img("1516575150278-77136aed6920"),
    listings: "128 spaces",
  },
  {
    name: "Sound Stages",
    tagline: "Full-scale production floors",
    description:
      "Blackout stages, rigging grids, and drive-in access for film and video crews.",
    image: img("1470229722913-7c0e2dbbafd3"),
    listings: "46 spaces",
  },
  {
    name: "Podcast Rooms",
    tagline: "Broadcast-ready recording nooks",
    description:
      "Acoustically treated rooms with mixers, mics, and live-editing setups.",
    image: img("1478737270239-2f02b77fc618"),
    listings: "87 spaces",
  },
  {
    name: "Music Suites",
    tagline: "Rehearsal & recording suites",
    description:
      "Isolated live rooms, control rooms, and backline-equipped rehearsal spaces.",
    image: img("1520523839897-bd0b52f945a0"),
    listings: "63 spaces",
  },
  {
    name: "Art Workshops",
    tagline: "Hands-on maker spaces",
    description:
      "Pottery wheels, easels, and workshop benches for teaching and creating.",
    image: img("1452860606245-08befc0ff44b"),
    listings: "52 spaces",
  },
];

export const categoryNames = categories.map((c) => c.name);
export const categoryNameValues: (CategoryName | "All Categories")[] = [
  "All Categories",
  ...categoryNames,
];
