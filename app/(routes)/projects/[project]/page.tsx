import { getProject } from "sanity.utils";
import { PortableText } from "@portabletext/react";
import { BsArrowUpRight } from "react-icons/bs";
import Programs from "./Programs";
import { Drop } from "(ui)";

export const dynamic = "force-dynamic";

export default async function Project({
  params,
}: {
  params: { project: string };
}) {
  const project = await getProject(params.project);

  return (
    <>
      <Drop className="pointer-events-auto max-w-prose pl-2 [&>a]:text-sm [&>a]:font-semibold [&>a]:underline [&>a]:underline-offset-8">
        <PortableText value={project?.content} />
      </Drop>
      <Drop className=" pointer-events-auto flex w-fit flex-row content-between gap-2 pl-2">
        {project.url.map((url) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className=" pointer-events-auto flex flex-row items-center gap-1 text-sm font-semibold underline underline-offset-8 transition-opacity hover:opacity-75"
          >
            {url.includes("github") ? "Github" : "Live Link"}
            <BsArrowUpRight className="h-3 w-3" />
          </a>
        ))}
        <Programs program={project.program} />
      </Drop>
    </>
  );
}
