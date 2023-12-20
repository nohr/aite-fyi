import { getMediums, getProjects } from "sanity.utils";
import Medium from "./(medium)/medium";

export const dynamic = "force-dynamic";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();
  const mediums = [...new Set(await getMediums())];

  return (
    <ul className="flex h-fit w-full flex-wrap justify-start self-center overflow-visible pt-2 md:gap-4 md:pt-0">
      {mediums.map((medium) => (
        <Medium key={medium} medium={medium} projects={projects}>
          {children}
        </Medium>
      ))}
    </ul>
  );
}
