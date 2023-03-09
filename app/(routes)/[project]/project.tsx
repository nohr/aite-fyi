import { Section } from "(ui)";
import {
  SiAstro,
  SiNextdotjs,
  SiTailwindcss,
  SiThreedotjs,
} from "react-icons/si";
import { GrGithub, GrLink, GrNext, GrReactjs } from "react-icons/gr";
import { IoLogoFirebase } from "react-icons/io5";
import Image from "next/image";
import { memo } from "react";
// import { useScroll } from "@react-three/drei";
export const Project = memo(function Project({
  title,
  description,
  url,
  program,
  ...props
}: ProjectProps & React.HTMLAttributes<HTMLDivElement>) {
  // const scroll = useScroll();

  // scroll.el?.addEventListener("scroll", () => {
  //   console.log(scroll.offset);
  // });

  // scroll.
  function Link({ url }: { url: ProjectProps["url"] }) {
    const URLIcon = ({ link }: { link: string }) => (
      <a
        href={link}
        key={link}
        target="_blank"
        rel="noreferrer"
        className="p-2 transition-opacity duration-200 md:hover:opacity-50 [&>*>*]:stroke-current [&>svg]:aspect-square [&>svg]:h-8 [&>svg]:w-auto"
      >
        {link.includes("github") ? <GrGithub /> : <GrLink />}
      </a>
    );
    return (
      <div className="flex w-fit flex-row gap-x-1">
        {typeof url === "object" ? (
          url.map((link) => <URLIcon key={link} link={link} />)
        ) : typeof url === "string" ? (
          <URLIcon link={url} />
        ) : null}
      </div>
    );
  }
  function Programs({ program }: { program: string[] }) {
    return (
      <div className=" flex w-fit flex-row gap-x-1 !self-center [&>*]:h-6 [&>*]:w-auto">
        {program.map((title: string, i): JSX.Element => {
          let icon: JSX.Element = <p key={title}>{title}</p>;
          switch (title) {
            case "astro":
              icon = <SiAstro key={title} />;
              break;
            case "react":
              icon = <GrReactjs key={title} />;
              break;
            case "firebase":
              icon = <IoLogoFirebase key={title} />;
              break;
            case "tailwind":
              icon = <SiTailwindcss key={title} />;
              break;
            case "nextjs":
              icon = <SiNextdotjs key={title} />;
              break;
            case "three":
              icon = <SiThreedotjs key={title} />;
              break;
            default:
              break;
          }
          return icon;
        })}
      </div>
    );
  }

  return (
    <Section id={title} {...props}>
      <div className="flex flex-col rounded-md bg-zinc-200 !bg-opacity-80 p-2 backdrop-blur-xl dark:bg-zinc-900 md:max-w-prose">
        <h1 className="text-4xl font-bold">{title}</h1>
        {description ? <p>{description}</p> : null}
        <div className="flex flex-row justify-between">
          {url ? <Link url={url} /> : null}
          <Programs program={program} />
        </div>
      </div>
    </Section>
  );
});

console.log(Project);
