"use client";

import useInView from "../(hooks)/useInView";
import Section from "../(ml)/(misc)/Section";
import Trigger from "../(ml)/Trigger";

export default function Home() {
  useInView("/home");
  return (
    <Section id="home">
      <p className=" w-44">
        welcome to the personal domain of Aitenoria Eboigbe
      </p>
      <Trigger />
    </Section>
  );
}
