import { getProject, getProjectNameBySlug, urlFor } from "sanity.utils";
import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Fade from "_components/animate/fade";
import { SiGithub } from "react-icons/si";
import { BsArrowDown } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import Programs from "./programs";
import Title from "./title";
import { RiLoaderFill } from "react-icons/ri";
import Image from "next/image";
import { Project } from "types/Project";

type Props = {
  params: { project: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = await getProjectNameBySlug(params.project);
  return {
    title: name + " | aite.fyi",
  };
}

export default async function Project({
  params,
}: {
  params: { project: string };
}) {
  const name = await getProjectNameBySlug(params.project);
  const project = await getProject(params.project);
  return (
    <>
      <Title name={name}>
        <Fade className="mx-auto w-full max-w-prose p-1 px-2 pb-0 pt-2 md:pr-0 [&>a]:text-sm [&>a]:font-semibold [&>a]:underline [&>a]:underline-offset-8">
          {project?.content && <PortableText value={project.content} />}
        </Fade>

        <Fade className="mx-auto flex w-full max-w-prose flex-row justify-between p-1 ">
          <div className=" flex flex-row gap-2">
            {project?.url?.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className=" flex select-none flex-row items-center gap-1 font-mono font-thin uppercase underline underline-offset-2 transition-opacity hover:opacity-75 md:text-xs"
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
                    Live Site
                    <MdArrowOutward className="h-3 w-3 " />
                  </>
                )}
              </a>
            ))}
          </div>

          {project?.program && <Programs program={project.program} />}
        </Fade>
      </Title>

      <div className="flex h-fit w-full flex-wrap justify-center gap-2  py-6">
        {project?.videos &&
          project.videos.map((video) => {
            return video.url ? (
              <div className="flex flex-col gap-2" key={video._key}>
                <video
                  autoPlay={true}
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  src={video.url}
                  controls={project.medium !== "website"}
                  className={`pointer-events-auto  h-96 w-fit shadow-lg ${
                    video.mobile ? "mx-auto md:mx-0" : "md:max-w-prose"
                  }`}
                />
                <p className="text-center">{video.alt}</p>
              </div>
            ) : (
              <RiLoaderFill className="m-2 h-4 w-4 animate-spin" />
            );
          })}

        {project?.images &&
          project.images.map((image: Project["images"][0]) => (
            <div key={image._key}>
              <Image
                src={urlFor(image).url()}
                alt={project.name + " " + image._key}
                height={image.height}
                width={image.width}
                className="pointer-events-none h-96 w-fit select-none object-contain md:max-w-prose"
              />
              {/* <p className="text-center">{image.}</p> */}
            </div>
          ))}
      </div>
    </>
  );
}
