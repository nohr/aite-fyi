import { PortableTextBlock } from "sanity";

export interface Info {
  _id: string;
  bio: PortableTextBlock[];
  location: string;
}
