"use client";

import { useWorldStore } from "(world)/useWorldStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useUIStore } from "./useUIStore";

export function useInView(route: string) {
  const zoom = useWorldStore((state) => state.zoom);
  const rotate = useWorldStore((state) => state.rotate);
  const routing = useUIStore((state) => state.routing);
  const setStatus = useUIStore((state) => state.setStatus);
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const observer = useRef<IntersectionObserver | null>(null);

  // change the route to the page when in view
  useEffect(() => {
    if (zoom || rotate) return;
    // scroll to the element with the id of the current pathname
    const el = document.getElementById(pathname.split("/")[1] || "home");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      setStatus("");
    }
  }, [pathname, rotate, setStatus, zoom]);

  // use intersection observer to check if the element is in view
  useEffect(() => {
    // initialize count variable
    let count = 0;
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (routing) return;
            count++; // increment count when element is in view
            // set a delay of 500 milliseconds
            setTimeout(() => {
              // check if count is still 1
              if (count === 1) {
                router.push(route === "/home" ? "/" : route);
                observer.current?.unobserve(entry.target); // stop observing
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
  }, [route, router, routing, zoom]);
  return observer;
}
