import { Section } from "(ui)";
import data from "@public/data.json" assert { type: "json" };
import { useEffect } from "react";

export function About({ ...props }) {
  useEffect(() => {
    props.setLoading(false);
  }, [props]);

  return (
    <Section
      id="about"
      {...props}
      className="fixed overflow-scroll bg-zinc-200 !bg-opacity-75 pt-16 pb-12 backdrop-blur-xl dark:bg-zinc-900 md:grid md:grid-cols-[40%_60%]"
    >
      {/* <h1 className="text-4xl font-bold">About Me</h1> */}
      <div className=" col-start-2 max-w-prose whitespace-pre-wrap py-12 leading-7 ">
        {data.about.bio}
      </div>
    </Section>
  );
}
