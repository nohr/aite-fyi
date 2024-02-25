import { getInfo, getProjects } from "sanity.utils";
import Name from "./Name";
import Locale from "./Locale";
import { PortableText } from "@portabletext/react";
import Section from "./section";
import { unstable_noStore } from "next/cache";
import Grid from "./(craft)/grid";
import MediumTabs from "_components/ui/medium.tabs";
import { FaArrowCircleDown } from "react-icons/fa";

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

      <Section index={3} className="pb-[60vh] md:pb-[65vh]">
        <a href="#grid" className=" relative flex underline-offset-2">
          Check out my work below
          <FaArrowCircleDown className=" mt-2" />
        </a>
      </Section>

      <section className="min-h-svh w-full">
        <Grid projects={projects} />
      </section>

      <MediumTabs />
    </>
  );
}
