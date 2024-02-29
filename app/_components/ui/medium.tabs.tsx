"use client";

import { TbWorldWww } from "react-icons/tb";
import { HiPaintBrush } from "react-icons/hi2";
import { FaHandSparkles } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "_components/ui/tabs";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import useSFX from "@hooks/useSFX";
import { useUIStore } from "@hooks/useUIStore";
const NavPortal = dynamic(() => import("_components/nav.portal"), {
  ssr: false,
});

const MediumTabs = memo(function MediumTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [play] = useSFX("/sfx/click2.mp3");
  const showTabs = useUIStore((s) => s.showTabs);

  const mediums = useMemo(
    () => [
      {
        title: (
          <>
            <TbWorldWww className="pb-0.5 " />
            Website
          </>
        ),
        value: "website",
      },
      {
        title: (
          <>
            <FaHandSparkles className="pb-0.5" />
            Interactive
          </>
        ),
        value: "interactive",
      },
      {
        title: (
          <>
            <HiPaintBrush className="pb-0.5" />
            Graphics
          </>
        ),
        value: "design",
      },
    ],
    [],
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return "?" + params.toString();
    },
    [searchParams],
  );

  const route = useCallback(
    (value?: string) => {
      play();
      router.replace(
        value === undefined ? "/" : createQueryString("medium", value),
        { scroll: false },
      );
    },
    [createQueryString, play, router],
  );

  return (
    <>
      {showTabs ? (
        <NavPortal>
          <Tabs
            defaultValue={searchParams.get("medium") || "all"}
            className={
              "[&_*]!select-none w-full max-w-[400px] self-center font-mono !text-xs md:text-base [&_*]:lowercase"
            }
          >
            <TabsList className="w-full justify-between">
              <TabsTrigger onClick={() => route()} value="all">
                all
              </TabsTrigger>

              {mediums.map(({ title, value }) => {
                return (
                  <TabsTrigger
                    key={value}
                    onClick={() => route(value)}
                    value={value}
                  >
                    {title}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </NavPortal>
      ) : null}
    </>
  );
});

export default MediumTabs;
