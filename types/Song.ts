export interface Song {
  name: string;
  date: string;
  file: string;
  cover: string;
  links: string[];
  tempo?: number | null;
}
