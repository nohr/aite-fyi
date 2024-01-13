import { getInfo } from "sanity.utils";
import Name from "./Name";
import Locale from "./Locale";
import { PortableText } from "@portabletext/react";

export default async function Home() {
  const { bio, _id, timeZone, location } = await getInfo();

  return (
    <section className="flex w-full flex-col items-start gap-2 p-3 md:px-8">
      <Name pic={`/selfies/pic${Math.floor(Math.random() * 3) + 1}.png`} />
      <Locale _id={_id} timeZone={timeZone} location={location} />
      <br />
      <div className="w-full  max-w-prose">
        <PortableText value={bio} />
      </div>
    </section>
  );
}
