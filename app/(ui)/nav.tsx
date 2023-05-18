"use client";

import { useUIStore } from "@hooks/useUIStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { shallow } from "zustand/shallow";
import { GiBombingRun, GiHand, GiMusicalNotes } from "react-icons/gi";

type Route = "home" | "proj." | "music";
interface NavLinkProps {
  children: React.ReactNode;
  to: Route;
}

const Nav = memo(function Nav() {
  const pathname = usePathname();
  const [loading, setLoading] = useUIStore(
    (s) => [s.loading, s.setLoading],
    shallow
  );

  const NavLink = ({ children, to }: NavLinkProps) => {
    return (
      <Link
        onClick={() => setLoading(true)}
        title={to}
        href={`/${to === "home" ? "" : to === "proj." ? "projects" : to}`}
        className={
          `nav-link pointer-events-auto flex h-12 w-12 select-none flex-col items-center justify-center rounded-full border-[1px] border-current shadow-lg transition hover:shadow-xl
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
      </Link>
    );
  };

  return (
    <>
      {/* <FaSpinner className=" animate-spin" /> */}
      <nav className=" pointer-events-none  flex w-full flex-col justify-center gap-2 self-center border-transparent py-4 md:max-w-prose md:flex-row md:border-b-[1px]">
        <NavLink to="proj.">
          <GiBombingRun />
        </NavLink>
        <NavLink to="home">
          <GiHand />
        </NavLink>
        <NavLink to="music">
          <GiMusicalNotes />
        </NavLink>
      </nav>
    </>
  );
});

export default Nav;
