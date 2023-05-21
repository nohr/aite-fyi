import { Drop } from "(ui)";
import { PortableText } from "@portabletext/react";
import { Info } from "types/Info";

export default function Bio({ Info }: { Info: Info }) {
  const { bio } = Info;
  return (
    <Drop
      key={Info._id + "bio"}
      className="max-w-prose transition-opacity duration-200 [&_a]:!pointer-events-auto hover:[&_a]:opacity-50"
    >
      <PortableText value={bio} />
    </Drop>
  );
}
