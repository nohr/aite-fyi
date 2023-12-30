import { getProject } from "sanity.utils";
import dynamic from "next/dynamic";

const Data = dynamic(() => import("./data"), {
  ssr: false,
});

export default async function Project({
  params,
}: {
  params: { project: string };
}) {
  const project = await getProject(params.project);
  return <Data project={project} />;
}
