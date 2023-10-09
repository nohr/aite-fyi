export interface Song {
  name: string;
  date: string;
  file: string;
  cover: string;
  links: string[];
  artist: string;
  album: string;
  tempo?: number | null;
}
