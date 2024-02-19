import { getInfo, getProjects } from "sanity.utils";
import Name from "./Name";
import Locale from "./Locale";
import { PortableText } from "@portabletext/react";
import Section from "./section";
import { unstable_noStore } from "next/cache";
import Grid from "./(craft)/grid";
import dynamic from "next/dynamic";

const Dom = dynamic(() => import("../../dom"), {
  ssr: false,
});

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
      </Section>

      <Dom />
      <section className="w-full pt-[75%]">
        <Grid projects={projects} />
      </section>
    </>
  );
}
