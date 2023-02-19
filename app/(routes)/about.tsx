"use client";

import useInView from "../(hooks)/useInView";
import Section from "../(ml)/(misc)/Section";

export default function About() {
  useInView("/about");
  return (
    <Section id="about">
      <h1 className="text-4xl font-bold">About</h1>
      <p>
        about page Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Natus explicabo, veritatis minus corporis unde, nulla voluptas quaerat
        nobis molestiae tempora nihil dolorem tenetur sapiente voluptates
        voluptatem totam neque? Aliquam, cumque.
      </p>
      <p>
        about page Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Natus explicabo, veritatis minus corporis unde, nulla voluptas quaerat
        nobis molestiae tempora nihil dolorem tenetur sapiente voluptates
        voluptatem totam neque? Aliquam, cumque.
      </p>
      <p>
        about page Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Natus explicabo, veritatis minus corporis unde, nulla voluptas quaerat
        nobis molestiae tempora nihil dolorem tenetur sapiente voluptates
        voluptatem totam neque? Aliquam, cumque.
      </p>
      <p>
        about page Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Natus explicabo, veritatis minus corporis unde, nulla voluptas quaerat
        nobis molestiae tempora nihil dolorem tenetur sapiente voluptates
        voluptatem totam neque? Aliquam, cumque.
      </p>
      <p>
        about page Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Natus explicabo, veritatis minus corporis unde, nulla voluptas quaerat
        nobis molestiae tempora nihil dolorem tenetur sapiente voluptates
        voluptatem totam neque? Aliquam, cumque.
      </p>
    </Section>
  );
}
