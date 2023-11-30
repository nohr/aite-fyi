"use client";

import { useUIStore } from "(ui)";
import { RiLoaderFill } from "react-icons/ri";
import { AiFillUnlock } from "react-icons/ai";
import { useEffect, useRef } from "react";

export default function Loading() {
  const [loading] = useUIStore((s) => [s.loading]);
  const loaderRef = useRef<HTMLParagraphElement>(null!);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        loaderRef.current.style.opacity = "0";
        loaderRef.current.style.transition = "opacity 1s ease-out";
        setTimeout(() => {
          loaderRef.current.remove();
        }, 2000);
      }, 750);
    }
  }, [loading]);

  return (
    <p
      ref={loaderRef}
      className="absolute right-6 top-8 flex h-12 w-36 skew-x-[8deg] skew-y-[2deg] flex-row-reverse items-center text-sm tracking-tighter"
    >
      {loading ? (
        <>
          {`breaching...`}
          <RiLoaderFill className="m-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          {`breached!`}
          <AiFillUnlock className="m-2 h-4 w-4 animate-bounce" />
        </>
      )}
    </p>
  );
}
