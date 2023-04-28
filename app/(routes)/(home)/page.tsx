import Bio from "./Bio";
import Locale from "./Locale";

export default function Home() {
  return (
    <>
      <section className="pointer-events-none mx-auto flex max-w-prose flex-col gap-2">
        <Locale />
        <Bio />
      </section>
    </>
  );
}
