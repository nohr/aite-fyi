"use client";

import { PortableText } from "@portabletext/react";
import { BsArrowDown, BsArrowUpRight } from "react-icons/bs";
import Programs from "./Programs";
import { Drop } from "(ui)";
import { Project } from "types/Project";
import Image from "next/image";
import { createPortal } from "react-dom";
import { urlFor } from "sanity.utils";
import { RiLoaderFill } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import ZoomBar from "./zoom_bar";

export default function Data({ project }: { project: Project | undefined }) {
  return (
    <>
      {project && (
        <>
          <Drop className="pointer-events-auto max-w-prose px-3 md:pl-4 md:pr-0 [&>a]:text-sm [&>a]:font-semibold [&>a]:underline [&>a]:underline-offset-8">
            <PortableText value={project.content} />
          </Drop>
          <Drop className=" pointer-events-auto  flex w-full flex-row justify-between gap-4 px-2">
            <div className=" flex flex-row gap-2">
              {project.url?.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" pointer-events-auto flex flex-row items-center gap-1 font-mono text-xs font-thin uppercase underline underline-offset-2 transition-opacity hover:opacity-75"
                >
                  {url.includes("github") ? (
                    <>
                      Github
                      <SiGithub className="h-3 w-3" />
                    </>
                  ) : url.includes("gumroad") ? (
                    <>
                      Download
                      <BsArrowDown className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      Live Link
                      <BsArrowUpRight className="h-3 w-3 " />
                    </>
                  )}
                </a>
              ))}
            </div>
            <Programs program={project.program} />
          </Drop>
          {project.medium === "website" ? null : (
            <Drop className="pointer-events-auto flex flex-row flex-wrap gap-2 pl-2">
              {project.videos &&
                document.getElementById("project-portal") &&
                project.videos.map((video) => {
                  return video ? (
                    createPortal(
                      <video
                        autoPlay={true}
                        playsInline
                        muted
                        loop
                        preload="metadata"
                        key={video.alt}
                        src={video.url}
                        controls
                        className="pointer-events-auto  h-auto w-full rounded-sm border border-current shadow-sm md:max-w-prose"
                      />,
                      document.getElementById("project-portal")!,
                    )
                  ) : (
                    <RiLoaderFill className="m-2 h-4 w-4 animate-spin" />
                  );
                })}
              {project.images &&
                document.getElementById("project-portal") &&
                project.images.map((image: Project["images"][0]) =>
                  createPortal(
                    <Image
                      src={urlFor(image).url()}
                      alt={project.name + " " + image._key}
                      height={image.height}
                      width={image.width}
                      className="pointer-events-none h-auto w-full select-none object-contain md:max-w-prose"
                    />,
                    document.getElementById("project-portal")!,
                    image._key,
                  ),
                )}
            </Drop>
          )}
          {project.medium === "website" &&
          document.getElementById("zoom-portal")
            ? createPortal(<ZoomBar />, document.getElementById("zoom-portal")!)
            : null}
        </>
      )}
    </>
  );
}
