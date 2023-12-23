"use client";

import useLoading from "@hooks/useLoading";
import { PortableText } from "@portabletext/react";
import { Info } from "types/Info";

export default function Bio({ Info }: { Info: Info }) {
  const { bio } = Info;
  useLoading(bio);
  return (
    <div
      key={Info._id + "bio"}
      className="max-w-prose transition-opacity duration-200 [&_a]:!pointer-events-auto hover:[&_a]:opacity-50 [&_strong]:!capitalize"
    >
      <PortableText value={bio} />
    </div>
  );
}
