"use client";

import { FaArrowCircleDown } from "react-icons/fa";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "_components/ui/tooltip";
import { useUIStore } from "@hooks/useUIStore";

export default function Cta() {
  const showTabs = useUIStore((s) => s.showTabs);
  return (
    <>
      {!showTabs && (
        <Link
          scroll={true}
          href="/#grid"
          className=" relative flex font-mono text-6xl font-light underline-offset-2"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaArrowCircleDown className="mt-2 animate-bounce md:hover:opacity-50" />
                <TooltipContent
                  sideOffset={20}
                  className="text-[#131313] dark:text-[#e0e0e0]"
                >
                  Scroll down to see my work!
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </Link>
      )}
    </>
  );
}
