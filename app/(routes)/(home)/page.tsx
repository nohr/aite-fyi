import { getInfo, getProjects } from "sanity.utils";
import Name from "./Name";
import Locale from "./Locale";
import { PortableText } from "@portabletext/react";
import Section from "./section";
import { unstable_noStore } from "next/cache";
import Grid from "./(craft)/grid";
import MediumTabs from "_components/ui/medium.tabs";
import { FaArrowCircleDown } from "react-icons/fa";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "_components/ui/tooltip";

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

      <Section
        index={3}
        className="!ml-0 flex !max-w-full justify-center pb-20 pt-[60vh] md:pt-[65vh]"
      >
        <Link
          scroll={true}
          href="/#grid"
          className=" relative flex font-mono text-6xl font-light underline-offset-2"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaArrowCircleDown className="mt-2 animate-bounce md:hover:opacity-50" />
                <TooltipContent
                  sideOffset={20}
                  className="text-[#131313] dark:text-[#e0e0e0]"
                >
                  Scroll down to see my work!
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </Link>
      </Section>

      <section className="min-h-svh w-full scroll-pt-20">
        <Grid projects={projects} />
      </section>

      <MediumTabs />
    </>
  );
}
