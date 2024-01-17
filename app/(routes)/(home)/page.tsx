import { getInfo } from "sanity.utils";
import Name from "./Name";
import Locale from "./Locale";
import { PortableText } from "@portabletext/react";
import Section from "./section";
import { unstable_noStore } from "next/cache";

export default async function Home() {
  unstable_noStore();
  const { bio, _id, timeZone, location } = await getInfo();

  return (
    <>
      <Name pic={`/selfies/pic${Math.floor(Math.random() * 3) + 1}.png`} />
      <Locale _id={_id} timeZone={timeZone} location={location} />
      <br />
      <Section index={2}>
        <PortableText value={bio} />
      </Section>
    </>
  );
}
