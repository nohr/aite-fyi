import { PortableTextBlock } from "sanity";

export interface VideoObject {
  url: string;
  alt: string;
  mobile: boolean;
}
export type VideoObjects = VideoObject[];

export type Project = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  date: Date;
  VideoObject: VideoObjects;
  url: string[];
  program: string[];
  content: PortableTextBlock[];
};
