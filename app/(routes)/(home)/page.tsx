import { getInfo } from "sanity.utils";
import Animate from "./Animate";
import Bio from "./Bio";
import Locale from "./Locale";

export const dynamic = "force-dynamic";

export default async function Home() {
  const Info = await getInfo();

  return (
    <section className="flex max-w-prose flex-col items-start gap-2 p-3 md:p-0">
      <Animate>
        <Locale Info={Info} />
        <Bio Info={Info} />
      </Animate>
    </section>
  );
}
