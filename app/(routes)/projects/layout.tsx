import ListItem from "./ListItem";
import { getProjects } from "sanity.utils";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();

  return (
    <ul className="pointer-events-none relative w-full flex h-full justify-center self-center overflow-visible">
      <div className=" w-fit flex flex-col py-4 lg:py-0 lg:flex-row justify-start items-start gap-2 nowrap">
      {projects.map((project) => (
        <ListItem key={project._id} project={project} projects={projects}>
          {children}
        </ListItem>
      ))}
      </div>
    </ul>
  );
}
