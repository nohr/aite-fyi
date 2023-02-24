"use client";

import { useInView } from "(ui)";
import { useEffect } from "react";
import { useWorldStore } from "./useWorldStore";

export function Section(props?: any) {
  const { children } = props;
  const observer = useInView(`/${props.id}`);
  const zoom = useWorldStore((state) => state.zoom);

  useEffect(() => {
    const observe = observer.current;
    const page = document.getElementById(props.id);
    if (page && observe) {
      if (zoom) {
        return;
      }
      observe.observe(page);
    }
    return () => {
      if (page && observe) {
        observe.unobserve(page);
      }
    };
  }, [observer, props.id, zoom]);

  return (
    <div className=" w-screen p-2" {...props}>
      {children}
    </div>
  );
}
