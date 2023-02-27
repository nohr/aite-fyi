"use client";

import { Fade, useInView } from "(ui)";
import { useRouteChange } from "(ui)/useUtils";
import Link from "next/link";
import { useEffect } from "react";
import { useWorldStore } from "./useWorldStore";

export function Section(props?: any) {
  const { children } = props;
  const observer = useInView(`/${props.id}`);
  const zoom = useWorldStore((state) => state.zoom);
  const rotate = useWorldStore((state) => state.rotate);
  const { routeChange } = useRouteChange();

  useEffect(() => {
    const observe = observer.current;
    const page = document.getElementById(props.id);
    if (page && observe && !zoom) {
      observe.observe(page);
    }
    return () => {
      if (page && observe) {
        observe.unobserve(page);
      }
    };
  }, [observer, props.id, zoom]);

  return (
    <div {...props}>
      <Fade truthy={zoom && !rotate}>
        <Link
          href={`/${props.id}`}
          onClick={() => {
            routeChange();
          }}
          className=" absolute top-0 left-0 flex h-full w-full items-center justify-center text-9xl transition-colors duration-300 ease-in-out hover:underline "
        >
          {props.id}
        </Link>
      </Fade>
      {children}
    </div>
  );
}
