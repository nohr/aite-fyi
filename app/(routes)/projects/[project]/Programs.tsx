import {
  SiAstro,
  SiNextdotjs,
  SiOpenai,
  SiTailwindcss,
  SiThreedotjs,
} from "react-icons/si";
import { GrReactjs } from "react-icons/gr";
import { IoLogoFirebase } from "react-icons/io5";

export default function Programs({ program }: { program: string[] }) {
  return (
    <div className="light pointer-events-auto flex w-fit flex-row gap-x-1 !self-center [&>*]:h-6 [&>*]:w-auto">
      {program.map((title: string): JSX.Element => {
        let icon: JSX.Element = (
          <p title={title} key={title}>
            {title}
          </p>
        );
        switch (title) {
          case "astro":
            icon = <SiAstro title={title} key={title} />;
            break;
          case "react":
            icon = <GrReactjs title={title} key={title} />;
            break;
          case "firebase":
            icon = <IoLogoFirebase title={title} key={title} />;
            break;
          case "tailwind":
            icon = <SiTailwindcss title={title} key={title} />;
            break;
          case "nextjs":
            icon = <SiNextdotjs title={title} key={title} />;
            break;
          case "three":
            icon = <SiThreedotjs title={title} key={title} />;
            break;
          case "openai":
            icon = <SiOpenai title={title} key={title} />;
            break;
          default:
            break;
        }
        return icon;
      })}
    </div>
  );
}
