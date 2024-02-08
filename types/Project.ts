import { PortableTextBlock } from "sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface VideoObject {
  url: string;
  alt: string;
  mobile: true | null;
  _key: string;
}

export type Project = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  date: Date;
  videos: VideoObject[];
  images: SanityImageSource & { height: number; width: number; _key: string }[];
  url: string[];
  program: string[];
  medium: "website" | "interactive" | "design";
  thumbnail: {
    video: string;
    blurhash: string;
  };
  content: PortableTextBlock[];
  rank: 0 | 1 | 2;
};
