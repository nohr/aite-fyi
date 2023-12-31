"use client";

import useLoading from "@hooks/useLoading";
import { PortableText } from "@portabletext/react";
import { Info } from "types/Info";
import Name from "./Name";
import Locale from "./Locale";

export default function Bio({ Info }: { Info: Info }) {
  const { bio } = Info;

  useLoading();
  return (
    <div
      key={Info._id + "bio"}
      className="max-w-prose transition-opacity duration-200 [&>p]:tracking-tight [&_a]:!pointer-events-auto hover:[&_a]:opacity-50 [&_strong]:!capitalize"
    >
      <Name pic={`/selfies/pic${Math.floor(Math.random() * 3) + 1}.png`} />
      <Locale Info={Info} />
      <br />
      <PortableText value={bio} />
    </div>
  );
}
