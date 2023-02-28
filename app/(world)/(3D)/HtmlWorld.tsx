"use client";
import { About, Contact, Home, Professional, Personal } from "(routes)";
import { motion, useWillChange } from "framer-motion";
// import { Stats } from "@react-three/drei";
import React, { forwardRef, memo, RefObject, useEffect } from "react";
import { WorldProps } from "(ui)";
import { Html, useScroll } from "@react-three/drei";
import { HtmlProps } from "@react-three/drei/web/Html";
export const Dom = memo(
  function Dom({ ...props }) {
    const { children, world } = props as {
      children: WorldProps["children"];
      world: WorldProps["world"];
    };
    const className =
      "!translate-x-0 !translate-y-0 relative top-0 left-0 !w-full !h-full overflow-scroll";

    useEffect(() => {
      if (!world || !world.current) return;
      console.log(world.current);
      //   (world.current as HtmlProps).;
    }, [world]);

    return (
      <Html
        as="div"
        wrapperClass={className}
        transform
        ref={world as RefObject<HTMLDivElement>}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <motion.div
          // style={{ ...style, willChange }}
          className="relative top-0 left-0 isolate flex origin-top-left flex-row overflow-scroll"
        >
          {children}
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
      </Html>
    );
  },
  (prev, next) => prev === next
);
