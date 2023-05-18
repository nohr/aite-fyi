import Link from "next/link";
import Bio from "./Bio";
import Locale from "./Locale";

export default function Home() {
  return (
    <>
      <section className="pointer-events-none flex max-w-prose flex-col items-start gap-2">
        <Locale />
        <Bio />
        <Link href="/admin" className="pointer-events-auto">
          admin
        </Link>
      </section>
    </>
  );
}
