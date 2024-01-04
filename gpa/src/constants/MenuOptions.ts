export interface Classes {
  name: string;
  artist: string;
  cover: string;
}

import { SeattleLanding, Laptop, FeatureOne } from "@/images";

export const listenNowAlbums: Classes[] = [
  {
    name: "Design Schedule",
    artist: "Plan A Path",
    cover: FeatureOne,
  },
  {
    name: "Import Your Progress",
    artist: "Banner Connection",
    cover: SeattleLanding,
  },
  {
    name: "Speak with an Advisor",
    artist: "Advising",
    cover: Laptop,
  },
  {
    name: "View Your Progress",
    artist: "Academic Transcript",
    cover: FeatureOne,
  },
];

export const madeForYouAlbums: Classes[] = [
  {
    name: "Thinking Components",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
  },
  {
    name: "Functional Fury",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80",
  },
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
];
