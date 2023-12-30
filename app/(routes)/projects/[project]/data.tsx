"use client";

import { PortableText } from "@portabletext/react";
import { BsArrowUpRight } from "react-icons/bs";
import Programs from "./Programs";
import { Drop } from "(ui)";
import { Project } from "types/Project";
import Image from "next/image";
import { createPortal } from "react-dom";
import { urlFor } from "sanity.utils";
import { RiLoaderFill } from "react-icons/ri";

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
          {project.medium === "website" ? null : (
            <Drop className="pointer-events-auto flex flex-row flex-wrap gap-2 pl-2">
              {document.getElementById("project-portal") &&
                project.videos?.map((video) => {
                  return video ? (
                    createPortal(
                      <video
                        preload="metadata"
                        key={video.alt}
                        src={video.url}
                        controls
                        className="pointer-events-auto !aspect-video h-auto w-full rounded-sm border border-current shadow-sm"
                      />,
                      document.getElementById("project-portal")!,
                    )
                  ) : (
                    <RiLoaderFill className="m-2 h-4 w-4 animate-spin" />
                  );
                })}
              {document.getElementById("project-portal") &&
                project.images?.map((image) =>
                  createPortal(
                    <Image
                      src={urlFor(image).url()}
                      alt={project.name + " " + image._key}
                      height={image.height}
                      width={image.width}
                      className="pointer-events-none h-auto w-full select-none object-contain"
                    />,
                    document.getElementById("project-portal")!,
                    image._key,
                  ),
                )}
            </Drop>
          )}
        </>
      )}
    </>
  );
}
