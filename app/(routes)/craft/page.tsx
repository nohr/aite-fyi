import { getProjects } from "sanity.utils";
import MediumTabs from "_components/ui/medium.tabs";
import Grid from "./grid";

export default async function Craft() {
  const projects = await getProjects();

  return (
    <>
      <MediumTabs />
      <Grid projects={projects} />
    </>
  );
}
