import { Section } from "(ui)";
import { useEffect, useState } from "react";

async function getBio() {
  const res = await fetch("/api/about", {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

export function About({ ...props }) {
  const [bio, setBio] = useState<string>("");
  useEffect(() => {
    getBio().then((data) => {
      setBio(data);
      props.setLoading(false);
    });
  }, [props]);

  return (
    <Section
      id="about"
      {...props}
      className="fixed overflow-scroll bg-zinc-200 !bg-opacity-75 pt-16 pb-12 backdrop-blur-xl dark:bg-zinc-900 md:grid md:grid-cols-[40%_60%]"
    >
      <div className=" col-start-2 max-w-prose whitespace-pre-wrap py-12 leading-7 ">
        {bio}
      </div>
    </Section>
  );
}
