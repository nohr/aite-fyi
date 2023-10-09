"use client";

import { useUIStore } from "@hooks/useUIStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { GiBombingRun, GiHand, GiMusicalNotes } from "react-icons/gi";
import { useAudioStore } from "@hooks/useAudioStore";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { skew } from "../../utils/constants";
import useSFX from "@hooks/useSFX";

type Route = "home" | "proj." | "music";
interface NavLinkProps {
  children: React.ReactNode;
  to?: Route;
  className?: string;
}


const Nav = memo(function Nav() {
  const pathname = usePathname();
  const [navLeft, setNavLeft] = useUIStore(
    (s) => [s.navLeft, s.setNavLeft]
  );
  const [play] = useSFX("/sfx/click.mp3");

  const NavLink = ({ children,className ="", to = undefined }: NavLinkProps) => {
    return (<>{to ? 
      <Link
        // @ts-ignore
        onClick={play}
        // onClick={() => setLoading(true)}
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
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobile(window.innerWidth < 768)
    }
    )

    return () => {
      window.removeEventListener("resize", () => {
        setMobile(window.innerWidth < 768)
      })
    }
} ,[])

  const navSkew = skew(navLeft, 12, 7);
  const navSkew2 = skew(!navLeft, 12, 7);
  return (<div className={` flex flex-row z-[1000] p-2 pb-8 w-screen md:px-8 md:py-4 justify-between order-3 md:order-1 ${navLeft ? "" : "flex-row-reverse"}`}>
    <nav className={`${navSkew} pointer-events-none w-fit flex transition-all duration-100 flex-row justify-start gap-2 self-start border-transparent  md:border-b-[1px] `}>
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
    <NavLink className={`${navSkew2} md:hidden`}>
        {navLeft ? <BsArrowRightCircleFill/> : <BsArrowLeftCircleFill />}
      </NavLink>
    </div>
  );
});

export default Nav;
