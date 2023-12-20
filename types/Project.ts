import { PortableTextBlock } from "sanity";

export interface VideoObject {
  url: string;
  alt: string;
  mobile: true | null;
}

export interface imageObject {
  url: string;
  alt: string;
}

export type Project = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  date: Date;
  videos: VideoObject[];
  images: imageObject[];
  url: string[];
  program: string[];
  medium: "website" | "interactive" | "design";
  thumbnail: string;
  content: PortableTextBlock[];
};
