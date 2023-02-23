"use client";

import { useWorldStore } from "(world)/useWorldStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUIStore } from "./useUIStore";

export function useInView(route: string) {
  const world_scale = useWorldStore((state) => state.world_scale);
  const grab = useUIStore((state) => state.grab);
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  // console.log(world_scale);

  // change the route to the page when in view
  useEffect(() => {
    // disable if world element has a scale less than 1
    if (world_scale < 0.99) return;

    // scroll to the element with the id of the current pathname
    const el = document.getElementById(pathname.split("/")[1] || "home");
    if (el) {
      // console.log("scrolling to", el);

      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      const worldWrap = document.getElementById("worldWrap");
      const worldSpinner = document.getElementById("worldSpinner");
      if (!worldWrap || !worldSpinner) return;
      worldWrap.style.opacity = "1";
      worldSpinner.style.opacity = "0";
    }
  }, [pathname, world_scale]);

  useEffect(() => {
    // disable if world element has a scale less than 1
    if (world_scale < 0.99) return;

    const id = route.split("/")[1];
    const page = document.getElementById(id);
    // use intersection observer to check if the element is in view
    // initialize count variable
    let count = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("in view", entry.target.id);

            if (grab) return;
            count++; // increment count when element is in view
            // set a delay of 500 milliseconds
            setTimeout(() => {
              // check if count is still 1
              if (count === 1) {
                router.push(route === "/home" ? "/" : route);
                // observer.unobserve(entry.target); // stop observing
              }
              count = 0; // decrement count after delay
            }, 500);
          } else {
            count = 0; // decrement count when element is out of view
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    // todo: disable when zoom has changed
    if (page) observer.observe(page);

    return () => {
      if (page) observer.unobserve(page);
    };
  }, [grab, route, router, world_scale]);
}
