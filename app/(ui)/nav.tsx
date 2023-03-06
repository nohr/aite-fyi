"use client";

import Link from "next/link";
import { memo, useEffect } from "react";
import { useRouteChange } from "./useUtils";
import { usePathname, useRouter } from "next/navigation";
import { Fade } from "./Fade";
import { useUIStore } from "./useUIStore";
import { IoPhonePortrait, IoLaptopOutline } from "react-icons/io5";
import { Socials } from "./Socials";
import { GrContactInfo } from "react-icons/gr";
import { SlideFade } from "./SlideFade";

const Nav = memo(function Nav({
  mobile,
  setMobile,
  // projects,
  home,
}: {
  mobile: boolean | undefined;
  setMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  // projects: ProjectProps[];
  home: boolean;
}) {
  const pathname = usePathname();
  const about = pathname === "/about";
  const active = (href: routes) => href === pathname;
  const path = useUIStore((state) => state.path);
  const setPath = useUIStore((state) => state.setPath);
  const router = useRouter();
  const { routeChange } = useRouteChange();
  useEffect(() => {
    router.push(path);
    // routeChange();
  }, [path, router]);

  function Home() {
    return (
      <Link
        onClick={() => {
          routeChange();
          setPath("/");
        }}
        href="/"
        className=" flex h-full w-fit items-center justify-center px-2 text-6xl font-thin uppercase transition-colors duration-100 hover:bg-zinc-900 hover:text-zinc-200  dark:text-zinc-500 hover:dark:bg-zinc-500 hover:dark:text-zinc-900"
      >
        Æ
      </Link>
    );
  }

  function NavLink({
    href,
    className,
    children,
  }: {
    href: routes;
    className?: string;
    children?: React.ReactNode;
  }) {
    return (
      <Link
        key={href}
        href={href}
        onClick={() => {
          routeChange();
          setPath(href);
        }}
        className={
          className +
          ` flex !aspect-square items-end justify-center !self-center justify-self-end bg-transparent p-4 text-lg  uppercase  transition-colors duration-100 [&>*]:!m-0 [&>*]:h-8 [&>*]:w-auto ${
            active(href)
              ? "bg-zinc-900 text-zinc-200 dark:bg-zinc-500 dark:text-zinc-900 [&>*]:stroke-zinc-200 "
              : "bg-transparent text-zinc-900 hover:bg-zinc-900 hover:text-zinc-200 dark:text-zinc-500 hover:dark:bg-zinc-500 hover:dark:text-zinc-900 [&>*]:hover:stroke-zinc-900 [&>*]:hover:dark:stroke-zinc-500 "
          } `
        }
      >
        {children ? children : href.split("/")[1] || "home"}
      </Link>
    );
  }

  function Icon({
    className = ` cursor-pointer flex !aspect-square !self-center justify-self-end p-4 [&>*]:!m-0 [&>*]:h-8 [&>*]:w-auto items-end justify-center bg-transparent p-2 text-lg uppercase text-zinc-900
               transition-colors duration-100 hover:bg-zinc-900 hover:text-zinc-200 dark:text-zinc-500 hover:dark:bg-zinc-500 hover:dark:text-zinc-900`,
    onClick,
    children,
  }: {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
  }) {
    return (
      <div className={className + ` `} onClick={onClick} tabIndex={0}>
        {children}
      </div>
    );
  }

  return (
    <nav className="fixed left-0 top-0 z-[90] flex h-16 w-screen select-none flex-row items-center justify-between p-0 !pr-4 backdrop-blur-lg md:!p-0">
      <div className="flex h-full flex-row">
        <Home />
        <NavLink href="/about">
          <GrContactInfo className=" [&>*]:!stroke-current" />
        </NavLink>
      </div>
      <Fade truthy={!about}>
        <Icon onClick={() => setMobile(!mobile)}>
          {mobile ? <IoLaptopOutline /> : <IoPhonePortrait />}
        </Icon>
      </Fade>
      <SlideFade truthy={home || about}>
        <Socials />
      </SlideFade>
    </nav>
  );
});

export default Nav;
