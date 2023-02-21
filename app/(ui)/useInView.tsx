"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useInView(route: string) {
  const router = useRouter();
  // change the route to the page when in view
  useEffect(() => {
    const id = route.split("/")[1];

    const page = document.getElementById(id);

    // use intersection observer to check if the element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            router.replace(route === "/home" ? "/" : route);
            // scroll into view
            const element = entry.target as HTMLElement;

            window.scrollTo({
              top: element.offsetTop,
              left: element.offsetLeft,
              behavior: "smooth",
            });
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (page) observer.observe(page);

    return () => {
      if (page) observer.unobserve(page);
    };
  }, [route, router]);
}
