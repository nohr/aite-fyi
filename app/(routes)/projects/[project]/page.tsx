import { getProject } from "sanity.utils";
import Data from "./data";

export const dynamic = "force-dynamic";

export default async function Project({
  params,
}: {
  params: { project: string };
}) {
  const project = await getProject(params.project);
  return <Data project={project} />;
}
