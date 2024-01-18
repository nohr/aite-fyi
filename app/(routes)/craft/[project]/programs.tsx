import {
  SiAstro,
  SiFramer,
  SiNextdotjs,
  SiOpenai,
  SiTailwindcss,
  SiThreedotjs,
  SiFontforge,
  SiBlender,
  SiUnrealengine,
  SiAdobepremierepro,
  SiCinema4D,
} from "react-icons/si";
import { GrReactjs } from "react-icons/gr";
import { IoLogoFirebase } from "react-icons/io5";
import { createElement } from "react";
import { IconType } from "react-icons";
import { DiIllustrator } from "react-icons/di";
import { BsQuestionDiamondFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "_components/ui/tooltip";

export default function Programs({
  program,
  max,
  className = "!self-center",
}: {
  program: string[];
  max?: number;
  className?: string;
}) {
  const pairing = {
    astro: SiAstro,
    react: GrReactjs,
    firebase: IoLogoFirebase,
    tailwind: SiTailwindcss,
    nextjs: SiNextdotjs,
    three: SiThreedotjs,
    openai: SiOpenai,
    framer: SiFramer,
    illustrator: DiIllustrator,
    fontforge: SiFontforge,
    blender: SiBlender,
    cinema4d: SiCinema4D,
    unrealengine: SiUnrealengine,
    premiere: SiAdobepremierepro,
    mediapipe,
  } as { [key: string]: IconType };

  return (
    <div
      className={
        className +
        " light pointer-events-none flex w-fit flex-row gap-x-1 transition-opacity [&_svg]:h-6 [&_svg]:w-auto md:[&_svg]:h-5"
      }
    >
      <TooltipProvider>
        {program
          .sort((a, b) => a.localeCompare(b))
          .map((title: string, index): JSX.Element => {
            if (max && index >= max) return <></>;
            return (
              <div
                key={title + " svg"}
                className=" pointer-events-auto relative flex opacity-50 hover:opacity-100"
              >
                <Tooltip>
                  <TooltipTrigger>
                    {createElement(pairing[title] ?? BsQuestionDiamondFill, {
                      key: title,
                    })}
                  </TooltipTrigger>
                  <TooltipContent>{title}</TooltipContent>
                </Tooltip>
              </div>
            );
          })}
      </TooltipProvider>
    </div>
  );
}

const mediapipe = () => (
  <svg
    x="0px"
    y="0px"
    stroke="currentColor"
    fill="currentColor"
    className="scale-125"
    strokeWidth="0"
    role="img"
    viewBox="0 0 240 240"
    height="1em"
    width="1em"
  >
    <g>
      <path
        d="M175.84,120.04c0-23.79-0.11-47.58,0.05-71.37c0.08-12.14,11.2-19.91,21.97-15.52c6.68,2.72,10.07,8,10.16,15.19
		c0.12,9.15,0.05,18.3,0.05,27.45c0,38.1-0.04,76.2,0.03,114.3c0.01,7.53-2.68,13.39-9.7,16.54c-11,4.94-22.46-3.01-22.52-15.71
		C175.75,167.29,175.84,143.66,175.84,120.04z"
      />
      <path
        d="M112.12,96.53c-0.01,15.8,0.1,31.6-0.05,47.4c-0.07,7.56-4.46,13.21-11.29,15.37c-6.43,2.03-13.21-0.07-17.43-5.44
		c-2.35-2.99-3.43-6.42-3.44-10.2c-0.01-31.77-0.08-63.53,0.04-95.3c0.04-9.39,7.06-16.32,15.94-16.38
		c9.09-0.06,16.1,6.96,16.18,16.65C112.23,64.59,112.12,80.56,112.12,96.53z"
      />
      <path
        d="M160.1,144.19c0,15.3,0.04,30.6-0.01,45.9c-0.04,10.61-6.53,17.84-15.93,17.93c-9.61,0.1-16.26-7.21-16.28-18.09
		c-0.04-30.93-0.04-61.87,0.01-92.8c0.01-8.12,3.96-13.87,10.8-16.26c6.56-2.29,13.57-0.25,17.93,5.23
		c2.73,3.43,3.52,7.4,3.51,11.69C160.07,113.25,160.1,128.72,160.1,144.19z"
      />
      <path
        d="M64.16,72.54c0,7.64,0.11,15.29-0.03,22.93c-0.18,9.67-7.13,16.69-16.21,16.62c-8.88-0.07-15.83-6.99-15.93-16.38
		c-0.16-15.79-0.16-31.58,0-47.36c0.1-9.38,7.06-16.31,15.94-16.37c9.08-0.06,16.03,6.96,16.2,16.63
		C64.27,56.58,64.16,64.56,64.16,72.54z"
      />
      <path
        d="M64.16,168.12c0,7.64,0.09,15.29-0.02,22.93c-0.14,9.8-6.82,16.85-15.87,16.97c-9.26,0.12-16.23-7.01-16.3-17.03
		c-0.11-15.46-0.12-30.91,0.01-46.37c0.08-9.7,7.03-16.74,16.11-16.72c9.08,0.02,15.9,7.05,16.06,16.78
		C64.26,152.5,64.16,160.31,64.16,168.12z"
      />
      <path
        d="M160.05,48.24c-0.1,8.91-7.47,16.05-16.39,15.88c-8.89-0.17-15.99-7.61-15.75-16.51c0.23-8.69,7.43-15.67,16.14-15.63
		C152.96,32.01,160.16,39.33,160.05,48.24z"
      />
      <path
        d="M112.09,192.19c-0.13,8.9-7.52,16.03-16.43,15.84c-8.89-0.19-15.97-7.65-15.71-16.56c0.25-8.69,7.47-15.64,16.18-15.59
		C105.03,175.94,112.21,183.28,112.09,192.19z"
      />
    </g>
  </svg>
);
