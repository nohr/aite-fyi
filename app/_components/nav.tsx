"use client";

import { usePathname } from "next/navigation";
import { GiBombingRun, GiHand, GiMusicalNotes } from "react-icons/gi";
import { useAudioStore } from "@hooks/useAudioStore";
import useSFX from "@hooks/useSFX";
// import { useUIStore } from "@hooks/useUIStore";
import { motion } from "framer-motion";
import Socials from "./socials";
import NavLink from "./nav.link";
// import { useEffect, useRef } from "react";
import { Portal } from "./nav.portal";

function Nav() {
  const pathname = usePathname();
  const admin = pathname.split("/")[1] === "admin";
  const [play] = useSFX("/sfx/click.mp3");

  const playing = useAudioStore((s) => s.playing);

  // const { setState } = useUIStore;

  // todo get new nav height on every render for mobile or hardcode padding on searchparams change
  // useEffect(() => {
  //   console.log(nav.current.clientHeight);

  //   setState({ navHeight: nav.current?.clientHeight });
  // }, [setState]);

  if (admin) return null;
  return (
    <motion.nav
      onChange={() => console.log("change")}
      initial={{ opacity: 0.5, filter: "blur(7px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      className={` fixed bottom-0 z-50 flex w-screen flex-col justify-between p-2 pb-5 tracking-tight backdrop-blur-sm md:pointer-events-none md:bottom-auto md:top-0 md:gap-0 md:px-8 md:py-4 ${
        pathname.includes("craft") ? "gap-y-4" : ""
      }`}
    >
      <Portal className="pointer-events-auto flex h-fit w-full justify-center md:hidden md:pt-4" />

      <div
        className={`pointer-events-none flex w-full flex-row justify-between self-start duration-100 first-line:transition-all  `}
      >
        <div className="flex -skew-x-[5deg] -skew-y-[0.3deg] flex-row gap-2 md:-skew-x-[8deg] md:-skew-y-[2deg]">
          <NavLink active={pathname === `/`} to="home" play={play}>
            <GiHand className=" -scale-x-100" />
          </NavLink>
          <NavLink active={pathname.includes("craft")} to="craft" play={play}>
            <GiBombingRun />
          </NavLink>
          <NavLink active={pathname.includes("music")} to="music" play={play}>
            <GiMusicalNotes className={playing ? "animate-tempo" : ""} />
          </NavLink>
        </div>

        <Portal className="pointer-events-auto hidden w-full items-center justify-center px-4 md:flex" />

        <Socials />
      </div>

      <div className="pointer-events-none absolute left-0 top-0 -z-10 block h-full w-full bg-[#e0e0e0] opacity-50 md:hidden dark:bg-[#040404] dark:opacity-50" />
    </motion.nav>
  );
}

export default Nav;
