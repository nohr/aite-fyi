import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const email = "aite@nyu.edu";
  return (
    <footer
      className={
        "fixed top-0 z-[910] flex h-min w-screen -skew-x-[2deg] -skew-y-[0.3deg] flex-row items-center justify-around gap-x-2 text-xs tracking-tight backdrop-blur-sm md:-skew-x-[8deg] md:-skew-y-[2deg] md:items-start md:justify-start md:px-8 [&>a>*]:h-5 md:[&>a>*]:!h-4 [&>a>svg]:w-auto"
      }
    >
      <a
        href="https://www.github.com/nohr"
        title="github"
        target="_blank"
        rel="noreferrer noopener"
        className="pointer-events-auto inline-flex items-center gap-1 p-2 transition-opacity duration-200 hover:opacity-50"
      >
        <BsGithub /> @nohr
      </a>
      <a
        href="https://www.linkedin.com/in/aite/"
        title="linkedin"
        target="_blank"
        rel="noreferrer noopener"
        className="pointer-events-auto inline-flex items-center gap-1 p-2 transition-opacity duration-200 hover:opacity-50"
      >
        <BsLinkedin /> in/aite
      </a>
      <a
        href={`mailto:${email}`}
        title="email"
        className="pointer-events-auto inline-flex items-center gap-1 p-2 transition-opacity duration-200 hover:opacity-50"
      >
        <FaEnvelope /> {`${email}`}
      </a>
    </footer>
  );
}
