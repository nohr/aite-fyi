"use client";

import { usePathname } from "next/navigation";
import { GiHand, GiMusicalNotes } from "react-icons/gi";
import { useAudioStore } from "@hooks/useAudioStore";
import useSFX from "@hooks/useSFX";
import { motion } from "framer-motion";
import Socials from "./socials";
import NavLink from "./nav.link";
import { Portal } from "./nav.portal";
import { memo } from "react";

const Nav = memo(function Nav() {
  const pathname = usePathname();
  const admin = pathname.split("/")[1] === "admin";
  const [play] = useSFX("/sfx/click.mp3");
  const playing = useAudioStore((s) => s.playing);

  if (admin) return null;
  return (
    <motion.nav
      onChange={() => console.log("change")}
      initial={{ opacity: 0.5, filter: "blur(7px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      className={`group/nav fixed bottom-0 z-50 flex w-screen flex-col justify-between p-2 pb-5 tracking-tight backdrop-blur-sm md:bottom-auto md:top-0 md:gap-0  md:px-8 md:py-4 ${
        pathname.includes("work")
          ? "gap-y-4 md:border-b md:border-b-border"
          : ""
      }`}
    >
      <Portal className="pointer-events-auto flex h-fit w-full justify-center md:hidden md:pt-4" />

      <div
        className={`pointer-events-none flex w-full flex-row justify-between self-start duration-100 first-line:transition-all  `}
      >
        <div className="group/nav flex -skew-x-[5deg] -skew-y-[0.3deg] flex-row gap-2 md:-skew-x-[8deg] md:-skew-y-[2deg]">
          <NavLink active={pathname === `/`} to="home" onClick={() => play()}>
            <GiHand className=" -scale-x-100" />
          </NavLink>
          <NavLink
            active={pathname.includes("music")}
            to="music"
            onClick={() => play()}
          >
            <GiMusicalNotes className={playing ? "animate-tempo" : ""} />
          </NavLink>
        </div>

        <Portal className="pointer-events-auto hidden w-full items-center justify-center px-4 md:flex" />

        <Socials />
      </div>

      <div
        className={`pointer-events-none absolute left-0 top-0 -z-10 block h-full w-full bg-background opacity-50 transition duration-200 dark:bg-background dark:opacity-75 md:opacity-0 md:group-hover/nav:opacity-80 md:dark:opacity-0`}
      />
    </motion.nav>
  );
});

export default Nav;
