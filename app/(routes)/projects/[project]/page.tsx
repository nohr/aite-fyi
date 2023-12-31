import { getProject, getProjectNameBySlug } from "sanity.utils";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const Data = dynamic(() => import("./data"), {
  ssr: false,
});

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
  const project = await getProject(params.project);
  return <Data project={project} />;
}
