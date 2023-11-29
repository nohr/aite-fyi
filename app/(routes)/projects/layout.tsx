import ListItem from "./ListItem";
import { getProjects } from "sanity.utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Aite, for your info...",
  description: "Personal website of Aite Aigbe",
};

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();

  return (
    <ul className="pointer-events-none relative flex h-full w-full justify-center self-center overflow-visible">
      <div className=" nowrap flex w-fit flex-col items-start justify-start gap-2 py-4 lg:flex-row lg:py-0">
        {projects.map((project) => (
          <ListItem key={project._id} project={project} projects={projects}>
            {children}
          </ListItem>
        ))}
      </div>
    </ul>
  );
}
