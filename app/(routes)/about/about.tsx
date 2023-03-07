import { Section } from "(ui)";
import data from "@public/data.json" assert { type: "json" };

export function About({ ...props }) {
  return (
    <Section
      id="about"
      {...props}
      className="fixed mt-16 overflow-scroll bg-zinc-200 !bg-opacity-75 pb-12 backdrop-blur-xl dark:bg-zinc-900 md:grid md:grid-cols-[40%_60%]"
    >
      <h1 className="text-4xl font-bold">About</h1>
      <div className=" max-w-prose self-start whitespace-pre-wrap pb-12 ">
        {data.about.bio}
      </div>
    </Section>
  );
}
