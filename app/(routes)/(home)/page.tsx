import { getInfo } from "sanity.utils";
import Bio from "./Bio";
import Locale from "./Locale";

export default async function Home() {
  const Info = await getInfo();

  return (
    <section className="pointer-events-none flex max-w-prose flex-col items-start gap-2">
      <Locale location={Info.location} />
      <Bio bio={Info.bio} />
    </section>
  );
}
