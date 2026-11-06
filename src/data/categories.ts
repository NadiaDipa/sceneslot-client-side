import type { CategoryName } from "@/lib/types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

export interface Category {
  name: CategoryName;
  tagline: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    name: "Photo Studios",
    tagline: "Portrait, product & content spaces",
    description:
      "Cyclorama walls, strobes, and daylight studios ready for your next shoot.",
    image: img("1516575150278-77136aed6920"),

  },
  {
    name: "Sound Stages",
    tagline: "Full-scale production floors",
    description:
      "Blackout stages, rigging grids, and drive-in access for film and video crews.",
    image: img("1553377102-31f26497d1d9"),

  },
  {
    name: "Podcast Rooms",
    tagline: "Broadcast-ready recording nooks",
    description:
      "Acoustically treated rooms with mixers, mics, and live-editing setups.",
    // Bright, warm-toned podcast suite (condenser mic, headphones, monitoring screen)
    image: img("1589903308904-1010c2294adc"),
  },
  {
    name: "Music Suites",
    tagline: "Rehearsal & recording suites",
    description:
      "Isolated live rooms, control rooms, and backline-equipped rehearsal spaces.",
    // Professionally lit control room: mixing console, studio monitors, guitar wall
    image: img("1598488035139-bdbb2231ce04"),
  },
  {
    name: "Art Workshops",
    tagline: "Hands-on maker spaces",
    description:
      "Pottery wheels, easels, and workshop benches for teaching and creating.",
    image: img("1747311585699-d7a659864cac"),

  },
];

export const categoryNames = categories.map((c) => c.name);
export const categoryNameValues: (CategoryName | "All Categories")[] = [
  "All Categories",
  ...categoryNames,
];
