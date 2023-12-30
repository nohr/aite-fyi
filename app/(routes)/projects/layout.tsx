import { getMediums, getProjects } from "sanity.utils";
import dynamic from "next/dynamic";

const Medium = dynamic(() => import("./(medium)/medium"), {
  ssr: false,
});

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();
  const mediums = [...new Set(await getMediums())];

  return (
    <>
      <ul className="flex h-fit w-full flex-wrap justify-start self-start overflow-visible pt-2 md:gap-4 md:pt-0">
        {mediums.map((medium) => (
          <Medium key={medium} medium={medium} projects={projects}>
            {children}
          </Medium>
        ))}
        <div
          id="project-portal"
          className=" flex h-fit w-full flex-wrap gap-y-4 overflow-y-scroll px-1 py-6 md:px-32"
        />
      </ul>
    </>
  );
}
