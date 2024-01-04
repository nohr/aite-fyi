"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { GiBombingRun, GiHand, GiMusicalNotes } from "react-icons/gi";
import { useAudioStore } from "@hooks/useAudioStore";
// import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
// import { skew } from "../../utils/constants";
import useSFX from "@hooks/useSFX";
import { motion } from "framer-motion";
import Socials from "./socials";

type Route = "home" | "proj." | "music";
interface NavLinkProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  to?: Route;
  onClick?: () => void;
}

const Nav = memo(function Nav() {
  const pathname = usePathname();
  const admin = pathname.split("/")[1] === "admin";
  const [play] = useSFX("/sfx/click.mp3");

  const NavLink = ({
    children,
    active = false,
    className = "",
    to = undefined,
    onClick = () => {},
  }: NavLinkProps) => {
    return (
      <>
        {to ? (
          <Link
            onClick={() => play()}
            title={to === "proj." ? "projects" : to}
            href={`/${to === "home" ? "" : to === "proj." ? "projects" : to}`}
            className={`nav-link pointer-events-auto flex h-12 w-12 select-none flex-col items-center justify-center rounded-full border border-current no-underline shadow-lg transition hover:shadow-xl active:scale-90
         ${active ? "active" : ""}`}
          >
            {children} <p className="text-xs">{to}</p>
          </Link>
        ) : (
          <div
            className={
              className +
              ` nav-link pointer-events-auto flex h-12 w-12 cursor-pointer select-none flex-col items-center justify-center overflow-visible rounded-full border border-current no-underline shadow-lg transition hover:shadow-xl active:scale-90 ${
                active ? "active" : ""
              }`
            }
            onClick={onClick}
          >
            {children}
          </div>
        )}
      </>
    );
  };

  const playing = useAudioStore((s) => s.playing);

  // const navSkew = skew(navLeft, 12, 7);
  // const navSkew2 = skew(!navLeft, 12, 7);
  if (admin) return null;
  return (
    <motion.nav
      initial={{ opacity: 0.5, filter: "blur(7px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      className={` pointer-events-none fixed -bottom-0.5 z-50 flex w-screen flex-col justify-between p-2 pb-8 tracking-tight backdrop-blur-sm md:bottom-auto md:top-0 md:px-8 md:py-4  ${
        "" // navLeft ? "" : "flex-row-reverse"
      }`}
    >
      <div className="absolute left-0 top-0 -z-10 block h-full w-full bg-[var(--arc-palette-title,#e5e6e9ff)] opacity-60 transition-all duration-150  ease-in-out md:hidden dark:bg-[var(--arc-palette-backgroundExtra,#060a0c)] dark:opacity-25 " />
      <li
        id="zoom-portal"
        className="flex h-fit w-full flex-wrap gap-4 overflow-y-scroll px-1 md:hidden"
      />
      <div
        className={`pointer-events-none flex w-full  flex-row justify-between  self-start duration-100 first-line:transition-all  `}
      >
        <div className="flex -skew-x-[5deg] -skew-y-[0.3deg] flex-row gap-2 md:-skew-x-[8deg] md:-skew-y-[2deg]">
          <NavLink active={pathname === `/`} to="home">
            <GiHand className=" -scale-x-100" />
          </NavLink>
          <NavLink active={pathname.includes("projects")} to="proj.">
            <GiBombingRun />
          </NavLink>
          <NavLink active={pathname.includes("music")} to="music">
            <GiMusicalNotes className={playing ? "animate-tempo" : ""} />
          </NavLink>
        </div>
        <Socials />
      </div>
    </motion.nav>
  );
});

export default Nav;
