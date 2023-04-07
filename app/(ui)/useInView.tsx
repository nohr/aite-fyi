"use client";

import { useScroll } from "@react-three/drei";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useUIStore } from "./useUIStore";
import { useRouteChange } from "./useUtils";

export function useInView(route: Routes) {
  const routing = useUIStore((state) => state.routing);
  const setStatus = useUIStore((state) => state.setStatus);
  const observer = useRef<IntersectionObserver | null>(null);
  const path = useUIStore((state) => state.path);
  const setPath = useUIStore((state) => state.setPath);
  // // change the route to the page when in view
  const ScrollIntoView = useCallback(
    (path: Routes) => {
      // scroll to the element with the id of the current pathname
      const el = document.getElementById(path?.split("/")[1] || "home");
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        setStatus("");
      }
    },
    [setStatus]
  );

  useEffect(() => {
    ScrollIntoView(path);
    // console.log("useInView: ", path);
  }, [ScrollIntoView, path]);

  // use intersection observer to check if the element is in view
  useEffect(() => {
    // initialize count variable
    let count = 0;
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log("useInView: ", route);
            if (routing) return;
            count++; // increment count when element is in view
            // set a delay of 500 milliseconds
            setTimeout(() => {
              // check if count is still 1
              if (count === 1) {
                // console.log("useInView: ", route);

                setPath(route);
                // TODO: listen to route change and set to zustand state to route in higher component
                // router.push(route === "/home" ? "/" : route);
                // observer.current?.unobserve(entry.target); // stop observing
              }
              count = 0; // decrement count after delay
            }, 500);
          } else {
            count = 0; // decrement count when element is out of view
          }
        });
      },
      {
        root: null,
        threshold: 0.3,
      }
    );
  }, [route, routing, setPath]);
  return observer;
}
