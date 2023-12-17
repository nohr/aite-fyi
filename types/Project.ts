import { PortableTextBlock } from "sanity";

export interface VideoObject {
  url: string;
  alt: string;
  mobile: true | null;
}

export type Project = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  date: Date;
  VideoObject: VideoObject[];
  url: string[];
  program: string[];
  medium: "website" | "interactive" | "design";
  thumbnail: string;
  content: PortableTextBlock[];
};
