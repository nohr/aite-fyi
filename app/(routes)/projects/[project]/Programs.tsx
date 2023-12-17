"use client";

import {
  SiAstro,
  SiFramer,
  SiNextdotjs,
  SiOpenai,
  SiTailwindcss,
  SiThreedotjs,
} from "react-icons/si";
import { GrReactjs } from "react-icons/gr";
import { IoLogoFirebase } from "react-icons/io5";
import { MouseEventHandler, createElement, useRef, useState } from "react";
import { IconType } from "react-icons";

export default function Programs({
  program,
  max,
}: {
  program: string[];
  max?: number;
}) {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null!);
  const handleTooltip: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.type === "mouseleave") {
      setVisible(false);
      return;
    }

    const svg = e.currentTarget.querySelector("svg")!;

    if (e.type === "mouseenter") {
      tooltipRef.current.textContent = e.currentTarget.title;
      setVisible(true);
      tooltipRef.current.style.top = `${
        svg.getBoundingClientRect().top + 10
      }px`;
      tooltipRef.current.style.left = `${svg.getBoundingClientRect().left}px`;
    }
  };

  const pairing = {
    astro: SiAstro,
    react: GrReactjs,
    firebase: IoLogoFirebase,
    tailwind: SiTailwindcss,
    nextjs: SiNextdotjs,
    three: SiThreedotjs,
    openai: SiOpenai,
    framer: SiFramer,
  } as { [key: string]: IconType };

  return (
    <div className="light pointer-events-none  flex w-fit flex-row gap-x-1 !self-center transition-opacity [&_svg]:h-5 [&_svg]:w-auto">
      {program.map((title: string, index): JSX.Element => {
        if (max && index >= max) return <></>;
        return (
          <div
            key={title + " svg"}
            className=" pointer-events-auto relative block opacity-50 hover:opacity-100"
            onMouseEnter={handleTooltip}
            onMouseLeave={handleTooltip}
          >
            {createElement(pairing[title], {
              title,
              key: title,
            })}
          </div>
        );
      })}
      <span
        ref={tooltipRef}
        style={{ opacity: visible ? 1 : 0 }}
        className=" pointer-events-none fixed text-xs !font-normal lowercase"
      ></span>
    </div>
  );
}
