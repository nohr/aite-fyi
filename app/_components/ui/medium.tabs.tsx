"use client";

import { TbWorldWww } from "react-icons/tb";
import { HiPaintBrush } from "react-icons/hi2";
import { FaHandSparkles } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "_components/ui/tabs";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useSFX from "@hooks/useSFX";
const NavPortal = dynamic(() => import("_components/nav.portal"), {
  ssr: false,
});

const MediumTabs = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [play] = useSFX("/sfx/click2.mp3");
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const mediums = [
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
  ];

  return (
    <NavPortal>
      <Tabs
        defaultValue={searchParams.get("medium") || "all"}
        className={className + " [&_*]!select-none"}
      >
        <TabsList>
          <TabsTrigger
            onClick={() => {
              play();
              router.push(pathname);
            }}
            value="all"
          >
            all
          </TabsTrigger>

          {mediums.map(({ title, value }) => {
            const active = searchParams.get("medium") === value;

            return (
              <TabsTrigger
                key={value}
                onClick={() => {
                  play();
                  router.push(
                    active
                      ? pathname
                      : pathname + "?" + createQueryString("medium", value),
                  );
                }}
                value={value}
              >
                {title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* <TabsContent value="Website">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="Interactive">
          Change your password here.
        </TabsContent> */}
      </Tabs>
    </NavPortal>
  );
};

export default MediumTabs;
