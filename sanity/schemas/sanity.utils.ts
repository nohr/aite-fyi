// "use server";

import { createClient, groq } from "next-sanity";
import { Info } from "types/Info";
import { Project, VideoObject } from "types/Project";
import { Song } from "types/Song";
import clientConfig from "../config/client.config";

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`
      *[ _type == "project" ]{
        _id,
        _createdAt,
        name,
        "thumbnail": thumbnail.asset->url,
        "slug": slug.current,
        program,
      } | order(date desc, name asc)`,
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
    { slug },
  );
}

export async function getVideoObject(
  slug: string,
  mobile?: boolean | null,
): Promise<VideoObject> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0] {
      VideoObjects[mobile == $mobile][0]{
        alt,
        mobile, 
        "url": url.asset->url,
      }
    }["VideoObjects"]`,
    { slug, mobile },
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
        tempo,
        "date": date,
        "file": file.asset->url,
        "cover": cover.asset->url,
        links
      } | order(date desc, name asc)`,
  );
}

export async function getInfo(): Promise<Info> {
  return createClient(clientConfig).fetch(
    groq`
      *[ _type == "info" ][0]{
        _id,
        _createdAt,
        bio,
        location,
        timeZone
      }`,
  );
}
