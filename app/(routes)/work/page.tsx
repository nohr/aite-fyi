import { getProjects } from "sanity.utils";
import MediumTabs from "_components/ui/medium.tabs";
import Grid from "./grid";

export default async function work() {
  const projects = await getProjects();

  return (
    <>
      <MediumTabs />
      <Grid projects={projects} />
    </>
  );
}
