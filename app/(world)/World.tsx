"use client";

import {
  About,
  About2,
  About3,
  Home,
  Page2,
  Page3,
  Work,
  Work2,
  Work3,
} from "(routes)";
import { VscLoading } from "react-icons/vsc";
import { Minimap } from "./Minimap";
import { useWorld } from "./useWorld";
import { motion, useWillChange } from "framer-motion";
import { Landscape } from "./(3D)/Landscape";
import { Stats } from "@react-three/drei";

export default function World() {
  const { world, wrapper, screen, scale, rotateX, rotateY } = useWorld();
  const willChange = useWillChange();

  return (
    <>
      {/* loading spinner */}
      <div
        id="worldSpinner"
        className=" pointer-events-none fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform transition-opacity delay-1000"
      >
        <VscLoading className="h-16 animate-spin" />
      </div>
      {/* world wrap */}
      <div
        id="worldWrap"
        style={{ opacity: 0 }}
        className=" transition-opacity delay-1000"
      >
        {/* minimap */}
        <Minimap
          wrapper={wrapper}
          screen={screen}
          world={world}
          rotateX={rotateX}
          rotateY={rotateY}
        />
        {/* actual world area*/}
        <motion.div
          id="world"
          ref={world}
          style={{
            scale,
            rotateX,
            rotateY,
            willChange,
          }}
          className="relative top-0 left-0 isolate flex origin-top-left flex-row rounded-xl border-2 border-current"
        >
          <div className="flex h-max w-screen flex-col flex-nowrap [&>div]:relative [&>div]:h-screen [&>div]:overflow-visible [&>div]:p-6">
            <Page2 />
            <About />
            <Work />
          </div>
          <div className="flex h-max w-screen flex-col flex-nowrap [&>div]:relative [&>div]:h-screen [&>div]:overflow-visible [&>div]:p-6">
            <About2 />
            <Home />
            <Work2 />
          </div>
          <div className="flex h-max w-screen flex-col flex-nowrap [&>div]:relative [&>div]:h-screen [&>div]:overflow-visible [&>div]:p-6">
            <Page3 />
            <About3 />
            <Work3 />
          </div>
        </motion.div>
        {/* 3D world */}
        {/* <Landscape scale={scale} rotateX={rotateX} rotateY={rotateY} /> */}
      </div>
      {/* <Stats /> */}
    </>
  );
}
