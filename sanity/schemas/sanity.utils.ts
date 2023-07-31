// "use server";

import { createClient, groq } from "next-sanity";
import { Info } from "types/Info";
import { Project, VideoObjects } from "types/Project";
import { Song } from "types/Song";
import clientConfig from "../config/client.config";

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`
      *[ _type == "project" ]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
      } | order(date desc, name asc)`
  );
}

export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`
        *[ _type == "project" && slug.current == $slug ][0]{
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "date": date,
            url,
            program,
            content
        }`,
    { slug }
  );
}

export async function getVideoObjects(
  slug: string
  // mobile?: boolean
): Promise<{ VideoObjects: VideoObjects }> {
  return createClient(clientConfig).fetch(
    groq`*[ _type == "project" && slug.current == $slug][0]{
   VideoObjects[]{
    alt,
    mobile, 
    "url": url.asset->url,
   }
 }`,
    { slug }
  );
}

export async function getSongs(): Promise<Song[]> {
  return createClient(clientConfig).fetch(
    groq`
      *[ _type == "song" ]{
        _id,
        _createdAt,
        name,
        artist,
        album,
        "date": date,
        "file": file.asset->url,
        "cover": cover.asset->url,
        links
      } | order(date desc, name asc)`
  );
}

export async function getInfo(): Promise<Info> {
  return createClient(clientConfig).fetch(
    groq`
      *[ _type == "info" ][0]{
        _id,
        _createdAt,
        bio,
        location
      }`
  );
}
