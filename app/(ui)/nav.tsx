"use client";

import { useUIStore } from "@hooks/useUIStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { shallow } from "zustand/shallow";
import { GiBombingRun, GiHand, GiMusicalNotes } from "react-icons/gi";
import { useAudioStore } from "@hooks/useAudioStore";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

type Route = "home" | "proj." | "music";
interface NavLinkProps {
  children: React.ReactNode;
  to?: Route;
  className?: string;
}

const Nav = memo(function Nav() {
  const pathname = usePathname();
  const [loading, setLoading] = useUIStore(
    (s) => [s.loading, s.setLoading],
    shallow
  );
  const [navLeft, setNavLeft] = useUIStore(
    (s) => [s.navLeft, s.setNavLeft],
    shallow
  );

  const NavLink = ({ children,className ="", to = undefined }: NavLinkProps) => {
    return (<>{to ? 
      <Link
        onClick={() => setLoading(true)}
        title={to}
        href={`/${to === "home" ? "" : to === "proj." ? "projects" : to}`}
        className={
          `nav-link pointer-events-auto flex h-12 w-12 select-none flex-col items-center justify-center rounded-full border-[1px] border-current no-underline shadow-lg transition hover:shadow-xl
         ${
           pathname === `/${to === "home" && ""}` ||
           pathname.includes(to === "proj." ? "projects" : to)
             ? "active"
             : ""
         }`
          //   +
          // `
          //   ${
          //   loading &&
          //   (pathname === `/${to === "home" && ""}` ||
          //     pathname.includes(to === "proj." ? "projects" : to))
          //     ? " animate-bounce"
          //     : ""
          //   }
          // `
        }
      >
        {children} <p className="text-xs">{to}</p>
      </Link>: 
      <div className={className + " nav-link pointer-events-auto flex h-12 w-12 select-none overflow-visible flex-col items-center justify-center rounded-full border-[1px] border-current no-underline shadow-lg transition hover:shadow-xl"}
      onClick={() => setNavLeft(!navLeft)}
 >
        {children}
      </div>}
      </>
    );
  };

  const playing = useAudioStore((s) => s.playing);

  return (<div className={` flex flex-row p-2 w-screen md:px-8 py-4 justify-between order-2 md:order-1 ${navLeft ? "" : "flex-row-reverse"}`}>
    <nav className=" pointer-events-none w-fit flex transition-all duration-100 flex-row justify-start gap-2 self-start border-transparent  md:border-b-[1px] ">
      <NavLink to="home">
        <GiHand />
      </NavLink>
      <NavLink to="music">
        <GiMusicalNotes className={playing ? "animate-pulse" : ""} />
      </NavLink>
      <NavLink to="proj.">
        <GiBombingRun />
      </NavLink>
    </nav>
      <NavLink className=" md:hidden">
        {navLeft ? <BsArrowRightCircleFill/> : <BsArrowLeftCircleFill />}
      </NavLink>
    </div>
  );
});

export default Nav;
