"use client";

import useSFX from "@hooks/useSFX";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { Project } from "types/Project";
import ZoomBar from "_components/zoom_bar";
import dynamic from "next/dynamic";
const NavPortal = dynamic(() => import("_components/nav.portal"), {
  ssr: false,
});

export default function Title({
  name,
  children,
}: {
  name: Project["name"] | undefined;
  children?: React.ReactNode;
}) {
  const [play] = useSFX("/sfx/close.mp3");

  return (
    <>
      <Link
        href="/craft"
        onClick={() => play()}
        className={`flex h-fit w-full flex-row items-start gap-2 border-b
            border-current px-2 no-underline transition duration-100 md:max-w-prose md:px-0 md:pt-2 md:hover:animate-pulse`}
      >
        <h1
          className={`text-md w-full select-none font-serif text-4xl font-light lowercase italic tracking-tight md:text-5xl `}
        >
          {name}
        </h1>
        <IoMdClose className="mt-auto h-9 w-auto p-2 pr-0" />
      </Link>

      {name === "Eko Digital" && (
        <NavPortal>
          <ZoomBar />
        </NavPortal>
      )}

      {children}
    </>
  );
}
