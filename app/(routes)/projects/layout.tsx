import ListItem from "./ListItem";
import { getProjects } from "sanity.utils";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();

  return (
    <ul className="pointer-events-none flex h-full flex-col justify-start gap-y-2 self-start overflow-scroll pb-8 md:pb-0">
      {projects.map((project) => (
        <ListItem key={project._id} project={project}>
          {children}
        </ListItem>
      ))}
    </ul>
  );
}
