"use client";

import { useUIStore } from "@hooks/useUIStore";
import { RiLoaderFill } from "react-icons/ri";
import { AiFillUnlock } from "react-icons/ai";
import { useEffect, useRef } from "react";

export function Loader() {
  const [loading] = useUIStore((s) => [s.loading]);
  const loaderRef = useRef<HTMLParagraphElement>(null!);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (loaderRef.current) {
          loaderRef.current.style.opacity = "0";
          loaderRef.current.style.transition = "opacity 1s ease-out";
          setTimeout(() => {
            loaderRef.current.remove();
          }, 2000);
        }
      }, 750);
    }
  }, [loading]);

  return (
    <p
      ref={loaderRef}
      className={`absolute -top-0.5 right-28 z-[100] flex h-12 w-36 skew-x-[8deg] skew-y-[2deg] flex-row items-center font-mono text-sm uppercase tracking-tighter md:!right-auto md:left-[13rem] md:top-4 md:-skew-x-[7deg] md:-skew-y-[1.5deg] ${
        loading ? "loading" : ""
      }`}
    >
      {loading ? (
        <>
          <RiLoaderFill className="m-2 h-4 w-4 animate-spin" />
          {`breaching`}
        </>
      ) : (
        <>
          <AiFillUnlock className="m-2 h-4 w-4 animate-bounce" />
          {`breached!`}
        </>
      )}
    </p>
  );
}

export default function Loading() {
  return <Loader />;
}
