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
import { motion } from "framer-motion";
import { Landscape } from "./(3D)/Landscape";

export default function World() {
  const { world, wrapper, screen, scale } = useWorld();

  return (
    <>
      {/* loading spinner */}
      <div
        id="worldSpinner"
        className=" pointer-events-none fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transform transition-opacity delay-1000"
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
        <Minimap wrapper={wrapper} screen={screen} world={world} />
        {/* actual world area*/}
        <motion.div
          id="world"
          ref={world}
          style={{ scale }}
          className="relative top-0 left-0 isolate origin-top-left"
        >
          <div className="flex h-screen w-max flex-row flex-nowrap ">
            <Page2 />
            <About />
            <Work />
          </div>
          <div className="flex h-screen w-max flex-row flex-nowrap ">
            <About2 />
            <Home />
            <Work2 />
          </div>
          <div className="flex h-screen w-max flex-row flex-nowrap ">
            <Page3 />
            <About3 />
            <Work3 />
          </div>
          <Landscape />
        </motion.div>
      </div>
    </>
  );
}
