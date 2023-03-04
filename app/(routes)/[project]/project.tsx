import { Section } from "(ui)";
import { IconType } from "react-icons";
import { GrNext, GrReactjs } from "react-icons/gr";
import { IoLogoFirebase } from "react-icons/io5";

export function Project({
  title,
  description,
  github,
  url,
  program,
  ...props
}: ProjectProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Section id={title} {...props}>
      <div className="flex flex-col rounded-md bg-zinc-200 !bg-opacity-50 p-2 backdrop-blur-xl dark:bg-zinc-900 md:w-fit">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p>{description}</p>
        {url ? (
          <a href={url} target="_blank" rel="noreferrer">
            URL to project
          </a>
        ) : null}
        {github ? (
          <a href={github} target="_blank" rel="noreferrer">
            Github
          </a>
        ) : null}
        <Programs program={program} />
      </div>
    </Section>
  );
}

function Programs({ program }: { program: string[] }) {
  return (
    <div className=" flex flex-row gap-x-1 [&>*]:h-6 [&>*]:w-auto">
      {program.map((title: string, i): JSX.Element => {
        let icon: JSX.Element = <p key={title}>{title}</p>;
        switch (title) {
          case "react":
            icon = <GrReactjs />;
            break;
          case "firebase":
            icon = <IoLogoFirebase />;
            break;
          case "nextjs":
            icon = <GrNext />;
            break;
          // case "three":
          //   icon = <GrNext />;
          //   break;
          default:
            break;
        }
        return icon;
      })}
    </div>
  );
}
