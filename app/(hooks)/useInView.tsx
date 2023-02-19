"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useInView(route: string, ref?: HTMLDivElement) {
  const router = useRouter();
  // change the route to the page when in view
  useEffect(() => {
    const id = route.split("/")[1];

    const page = document.getElementById(id);
    // if (ref) console.log(ref);

    // use intersection observer to check if the element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            router.replace(route === "/home" ? "/" : route);
          }
        });
      },
      {
        threshold: 0.9,
      }
    );

    if (page) observer.observe(page);

    return () => {
      if (page) observer.unobserve(page);
    };
  }, [ref, route, router]);
}
