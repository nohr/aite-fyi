"use client";

import { PortableText } from "@portabletext/react";
import { BsArrowUpRight } from "react-icons/bs";
import Programs from "./Programs";
import { Drop } from "(ui)";
import { Project } from "types/Project";
import Image from "next/image";

export default function Data({ project }: { project: Project | undefined }) {
  return (
    <>
      {project && (
        <>
          <Drop className="pointer-events-auto max-w-prose pl-2 [&>a]:text-sm [&>a]:font-semibold [&>a]:underline [&>a]:underline-offset-8">
            <PortableText value={project.content} />
          </Drop>
          <Drop className=" pointer-events-auto flex w-fit flex-row content-between gap-2 pl-2">
            {project.url?.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className=" pointer-events-auto flex flex-row items-center gap-1 text-sm font-semibold underline underline-offset-8 transition-opacity hover:opacity-75"
              >
                {url.includes("github")
                  ? "Github"
                  : url.includes("gumroad")
                    ? "Download"
                    : "Live Link"}
                <BsArrowUpRight className="h-3 w-3" />
              </a>
            ))}
            <Programs program={project.program} />
          </Drop>
          {project.medium !== "design" ? null : (
            <Drop className="pointer-events-auto flex flex-row flex-wrap gap-2 pl-2">
              {project.videos?.map((video) => (
                <video
                  key={video.alt}
                  src={video.url}
                  controls
                  className="pointer-events-auto h-auto w-full"
                />
              ))}
              {project.images?.map((image) => (
                <div
                  key={image.alt}
                  className="pointer-events-auto relative h-auto w-full"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="pointer-events-none absolute select-none object-contain"
                  />
                </div>
              ))}
            </Drop>
          )}
        </>
      )}
    </>
  );
}
