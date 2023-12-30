// "use server";

import { createClient, groq } from "next-sanity";
import { Info } from "types/Info";
import { Project, VideoObject } from "types/Project";
import { Song } from "types/Song";
import clientConfig from "../config/client.config";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`
      *[ _type == "project" ]{
        _id,
        _createdAt,
        name,
            medium,
        "thumbnail": thumbnail.asset->url,
        "slug": slug.current,
        program,
        date
      } | order(date desc)`,
  );
}

export async function getMediums(): Promise<Project["medium"][]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"] | order(date desc).medium`,
  );
}

export async function getProject(slug: string): Promise<Project | undefined> {
  if (!slug) return;
  return createClient(clientConfig).fetch(
    groq`
        *[ _type == "project" && slug.current == $slug ][0]{
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "date": date,
            url,
            medium,
            program,
            content,
             videos[]{
               alt, 
               "url": url.asset->url,
                },
            images[]{
						    "height": asset->metadata.dimensions.height,
                "width": asset->metadata.dimensions.width,
						    ...,
             },
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
      videos[mobile == $mobile][0]{
        alt,
        mobile, 
        "url": url.asset->url,
      }
    }["videos"]`,
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

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(clientConfig);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
