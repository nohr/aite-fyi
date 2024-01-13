import { getProjects } from "sanity.utils";
import MediumTabs from "_components/ui/medium.tabs";
import Grid from "./grid";

export default async function Craft() {
  const projects = await getProjects();

  return (
    <>
      <MediumTabs className="w-full max-w-[400px] self-center font-mono !text-xs md:text-base [&_*]:uppercase" />
      <Grid projects={projects} />
    </>
  );
}
