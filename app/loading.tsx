"use client";

import { useUIStore } from "(ui)";
import { RiLoaderFill } from "react-icons/ri";

export default function Loading() {
  const [loading] = useUIStore((s) => [s.loading]);

  return (
    <>
      {loading ? (
        <RiLoaderFill className="absolute right-6 top-8 m-3 h-6 w-6 animate-spin" />
      ) : null}
    </>
  );
}
