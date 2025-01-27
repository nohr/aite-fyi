import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

export default function Socials() {
  const email = "aiteaigbe@gmail.com";
  return (
    <div
      className={
        "group/nav pointer-events-none flex h-min w-fit skew-x-[8deg] skew-y-[2deg] flex-row items-center justify-start gap-x-2  pt-2 text-xs tracking-tight md:items-start md:justify-start [&>a>*]:h-5 md:[&>a>*]:!h-4 [&>a>svg]:w-auto"
      }
    >
      <a
        href={`mailto:${email}`}
        title={email}
        className="nav-link pointer-events-auto flex select-none items-center gap-1 rounded-full border border-current  p-2 shadow-md transition duration-75 ease-in-out"
      >
        <MdAlternateEmail className="pointer-events-none" />
      </a>
      <a
        href="https://www.github.com/nohr"
        title="@nohr"
        target="_blank"
        rel="noreferrer noopener"
        className="nav-link pointer-events-auto flex select-none items-center gap-1 rounded-full border border-current  p-2 shadow-md transition duration-75 ease-in-out"
      >
        <BsGithub className="pointer-events-none" />
      </a>
      <a
        href="https://www.linkedin.com/in/aite/"
        title="in/aite"
        target="_blank"
        rel="noreferrer noopener"
        className="nav-link pointer-events-auto flex select-none items-center gap-1 rounded-full border border-current  p-2 shadow-md transition duration-75 ease-in-out"
      >
        <FaLinkedinIn className="pointer-events-none" />
      </a>
    </div>
  );
}
