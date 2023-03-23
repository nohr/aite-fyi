"use client";

import { memo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Fade } from "./Fade";
import { IoPhonePortrait, IoLaptopOutline } from "react-icons/io5";
import { Socials } from "./Socials";
import { GrContactInfo } from "react-icons/gr";
import { SlideFade } from "./SlideFade";

const Nav = memo(function Nav({
  mobile,
  setMobile,
  home,
}: {
  mobile: boolean;
  setMobile: React.Dispatch<React.SetStateAction<boolean>>;
  home: boolean;
}) {
  const pathname = usePathname();
  const about = pathname === "/about";
  const active = (href: routes) => href === pathname;
  const router = useRouter();

  function NavLink({
    href,
    className,
    children,
    onClick = () => {
      router.push(href);
    },
  }: {
    href: routes;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
  }) {
    return (
      <div
        onClick={onClick}
        tabIndex={0}
        title="about"
        className={
          className +
          ` flex !aspect-square h-full cursor-pointer items-end justify-center self-center bg-transparent p-4 text-6xl font-thin uppercase text-current transition-colors duration-100 [&>*]:!m-0 [&>*]:h-8 [&>*]:w-auto ${
            active(href)
              ? "bg-zinc-900  text-zinc-200 dark:bg-lime-200 dark:text-zinc-900  [&>*>*]:stroke-zinc-200 [&>*>*]:dark:stroke-zinc-900 "
              : "bg-transparent hover:bg-zinc-900 hover:text-zinc-200  hover:dark:bg-lime-200 hover:dark:text-zinc-900 [&>*>*]:stroke-zinc-900 [&>*>*]:hover:stroke-zinc-200 [&>*>*]:dark:stroke-lime-200 [&>*>*]:hover:dark:stroke-current "
          } `
        }
      >
        {children ? children : href.split("/")[1] || "home"}
      </div>
    );
  }

  function Icon({
    className = ` `,
    onClick,
    children,
  }: {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
  }) {
    return (
      <div
        className={
          className +
          ` hover:dark:bg-current0 flex !aspect-square cursor-pointer items-end justify-center !self-center justify-self-end bg-transparent p-4 text-lg uppercase transition-colors duration-100 
               hover:bg-zinc-900 hover:text-zinc-200 hover:dark:bg-lime-200 hover:dark:text-zinc-900 [&>*]:!m-0 [&>*]:h-8 [&>*]:w-auto`
        }
        title="toggle device"
        onClick={onClick}
        tabIndex={0}
      >
        {children}
      </div>
    );
  }

  return (
    <nav className="fixed left-0 top-0 z-[90] flex h-16 w-screen select-none flex-row items-center justify-between bg-zinc-200 !bg-opacity-5 p-0 !pr-4 backdrop-blur-lg dark:bg-zinc-900 md:!p-0">
      <div className="flex h-full flex-row">
        <NavLink href="/" className=" !p-1">
          Æ
        </NavLink>
        <NavLink href="/about">
          <GrContactInfo />
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
