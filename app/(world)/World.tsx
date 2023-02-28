"use client";

import { About, Contact, Home, Professional, Personal } from "(routes)";
import { motion, useWillChange } from "framer-motion";
import { Landscape } from "./(3D)/Landscape";
import { Stats } from "@react-three/drei";
import { forwardRef, useEffect } from "react";
import { MinimapProps, useUIStore } from "(ui)";

export const World = forwardRef(function World(
  props: { style: MinimapProps["style"] },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const willChange = useWillChange();

  return (
    <>
      <div
        id="worldWrap"
        style={{ opacity: 1 }}
        className=" h-fit w-fit transition-opacity delay-1000"
      >
        {/* actual world area*/}
        <motion.div
          ref={ref}
          {...props}
          style={{ ...props.style, willChange }}
          id="world"
          className="relative top-0 left-0 isolate flex origin-top-left flex-row border-2 border-current"
        >
          <div className="flex h-auto w-screen flex-col flex-nowrap [&>div]:relative [&>div]:flex [&>div]:h-full [&>div]:flex-col [&>div]:overflow-visible [&>div]:p-6 [&>div]:pt-16">
            <Professional />
          </div>
          <div className="flex h-max w-screen flex-col flex-nowrap [&>div]:relative [&>div]:flex [&>div]:h-screen [&>div]:flex-col [&>div]:overflow-visible [&>div]:p-6 [&>div]:pt-16">
            <Home />
            <About />
            <Contact />
          </div>
          <div className="flex h-auto w-screen flex-col flex-nowrap [&>div]:relative [&>div]:flex [&>div]:h-full [&>div]:flex-col [&>div]:overflow-visible [&>div]:p-6 [&>div]:pt-16">
            <Personal />
          </div>
        </motion.div>
        {/* 3D world */}
        <Landscape {...props} />
      </div>
      {/* <Stats /> */}
    </>
  );
});
