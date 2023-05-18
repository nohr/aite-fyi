import ListItem from "./ListItem";
import { getProjects } from "sanity.utils";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();

  return (
    <ul className="pointer-events-auto flex h-full flex-col justify-start gap-y-2 self-start overflow-scroll">
      {projects.map((project) => (
        <ListItem key={project._id} project={project}>
          {children}
        </ListItem>
      ))}
    </ul>
  );
}
