import { getInfo, getProjects } from "sanity.utils";
import Name from "./Name";
import Locale from "./Locale";
import { PortableText } from "@portabletext/react";
import Section from "./section";
import Grid from "./(craft)/grid";
import MediumTabs from "_components/ui/medium.tabs";
import Cta from "_components/ui/cta";

export default async function Home() {
  const projects = await getProjects();
  const { bio, _id, timeZone, location } = await getInfo();

  return (
    <>
      <Name pic={`/selfies/pic${Math.floor(Math.random() * 3) + 1}.png`} />

      <Locale _id={_id} timeZone={timeZone} location={location} />

      <br />

      <Section index={2}>
        <PortableText value={bio} />
        <br />
      </Section>

      <Section
        index={3}
        className="!ml-0 flex !max-w-full justify-center pb-20 pt-[60vh] md:pt-[65vh]"
      >
        <Cta />
      </Section>

      <section className="min-h-svh w-full scroll-pt-20">
        <Grid projects={projects} />
      </section>

      <MediumTabs />
    </>
  );
}
