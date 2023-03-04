import { BsLinkedin, BsGithub } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";

export function Socials() {
  return (
    <div className="flex h-min w-min flex-row justify-between gap-x-2 md:px-4 [&>a>*]:h-8 md:[&>a>*]:!h-4 [&>a>svg]:w-auto">
      <a
        href="mailto:aite@paredol.com"
        title="email"
        className="p-2 transition-opacity duration-200 hover:opacity-50 "
      >
        <RiMailSendLine />
      </a>
      <a
        href="www.linkedin.com/in/aite"
        title="linkedin"
        target="_blank"
        rel="noreferrer"
        className="p-2 transition-opacity duration-200 hover:opacity-50 "
      >
        <BsLinkedin />
      </a>
      <a
        href="www.github.com/nohr"
        title="github"
        target="_blank"
        rel="noreferrer"
        className="p-2 transition-opacity duration-200 hover:opacity-50 "
      >
        <BsGithub />
      </a>
    </div>
  );
}
