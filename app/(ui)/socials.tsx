import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

export default function Socials() {
  const email = "aiteaigbe@gmail.com";
  return (
    <div
      className={
        " flex h-min w-fit skew-x-[8deg] skew-y-[2deg] flex-row items-center justify-start gap-x-2 pl-2 pt-2 text-xs tracking-tight md:items-start md:justify-start md:pl-8 [&>a>*]:h-5 md:[&>a>*]:!h-4 [&>a>svg]:w-auto"
      }
    >
      <a
        href="https://www.github.com/nohr"
        title="@nohr"
        target="_blank"
        rel="noreferrer noopener"
        className="nav-link pointer-events-auto flex select-none items-center gap-1 rounded-full border border-current  p-2 shadow-md transition duration-75 ease-in-out"
      >
        <BsGithub className="pointer-events-none" />
        {/* @nohr */}
      </a>
      <a
        href="https://www.linkedin.com/in/aite/"
        title="in/aite"
        target="_blank"
        rel="noreferrer noopener"
        className="nav-link pointer-events-auto flex select-none items-center gap-1 rounded-full border border-current  p-2 shadow-md transition duration-75 ease-in-out"
      >
        <FaLinkedinIn className="pointer-events-none" />
        {/* in/aite */}
      </a>
      <a
        href={`mailto:${email}`}
        title={email}
        className="nav-link pointer-events-auto flex select-none items-center gap-1 rounded-full border border-current  p-2 shadow-md transition duration-75 ease-in-out"
      >
        <MdAlternateEmail className="pointer-events-none" />
        {/* {`${email}`} */}
      </a>
    </div>
  );
}
