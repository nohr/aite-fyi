import { getInfo, getProjects } from "sanity.utils";
import Name from "./Name";
import Locale from "./Locale";
import { PortableText } from "@portabletext/react";
import Section from "./section";
import { unstable_noStore } from "next/cache";
import Grid from "./(craft)/grid";

export default async function Home() {
  unstable_noStore();
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

      <div className="px-2 pt-[50vh] md:ml-8 md:pl-1 md:pr-0 md:pt-[65vh]">
        Check out my work below.
      </div>

      <section className="w-full">
        <Grid projects={projects} />
      </section>
    </>
  );
}
