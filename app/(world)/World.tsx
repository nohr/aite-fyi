"use client";

import { About, Contact, Home, Professional, Personal } from "(routes)";
import { motion, useWillChange } from "framer-motion";
import { Landscape } from "./(3D)/Landscape";
import { Stats } from "@react-three/drei";
import { forwardRef, memo } from "react";
import { WorldProps } from "(ui)";
import { Dom } from "./(3D)/HtmlWorld";

export const World = memo(
  forwardRef(function World(
    props: { style: WorldProps["style"] },
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    const willChange = useWillChange();
    // console.log("rendering world");

    return (
      <>
        {/* actual world area*/}
        {/* <motion.div
          ref={ref}
          {...props}
          style={{ ...props.style, willChange }}
          id="world"
          className="relative top-0 left-0 isolate flex origin-top-left flex-row "
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
        </motion.div> */}
        {/* 3D world */}
        <Landscape {...props} />
        {/* <p>hollllleledw</p> */}
        {/* <Stats className=" !top-auto bottom-0" /> */}
      </>
    );
  })
);
