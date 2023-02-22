"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function useInView(route: string) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  // change the route to the page when in view
  useEffect(() => {
    // console.log(pathname.split("/")[1] || "home");

    // scroll to the element with the id of the current pathname
    const el = document.getElementById(pathname.split("/")[1] || "home");
    if (el) {
      // console.log("scrolling to", el);

      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [pathname]);

  useEffect(() => {
    const id = route.split("/")[1];
    const page = document.getElementById(id);
    // use intersection observer to check if the element is in view
    // initialize count variable
    let count = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

    // add scroll listener to the window and observe the element
    if (page) observer.observe(page);

    return () => {
      if (page) observer.unobserve(page);
    };
  }, [route, router]);
}
