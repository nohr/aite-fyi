import React from "react";
import {
  SiAstro,
  SiCss3,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";

export function Tools() {
  return (
    <div className=" flex flex-row items-center justify-center gap-x-3 p-1">
      <SiHtml5 />
      <SiCss3 />
      <SiJavascript />
      <SiTypescript />
      <SiReact />
      <SiNextdotjs />
      <SiTailwindcss />
      <SiThreedotjs />
      <SiFirebase />
      <SiVisualstudiocode />
    </div>
  );
}
