"use client";

import useInView from "../(hooks)/useInView";
import Section from "../(ml)/(misc)/Section";

export default function Work3() {
  useInView("/work3");
  return (
    <Section id="work3">
      <h1 className="text-4xl font-bold">Work</h1>
      <p>
        work page Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Natus explicabo, veritatis minus corporis unde, nulla voluptas quaerat
        nobis molestiae tempora nihil dolorem tenetur sapiente voluptates
        voluptatem totam neque? Aliquam, cumque.
      </p>
      <p>
        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptates, quod, voluptate, voluptatem quia voluptatibus quibusdam
        voluptas quae quidem quos nesciunt. Quisquam, quae. Quisquam, quae.
        Quisquam, qu ae. Quisquam, quae. Quisquam, quae. Quisquam, quae.
      </p>
    </Section>
  );
}
