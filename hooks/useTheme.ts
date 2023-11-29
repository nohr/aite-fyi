"use client";

import { useUIStore } from "(ui)";
// import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function useTheme() {
  // const pathname = usePathname();
  const [setTheme, theme] = useUIStore((s) => [s.setTheme, s.theme]);

  useEffect(() => {
    const user_theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(user_theme);

    if (user_theme === "dark") document.documentElement.classList.add("dark");

    // if (user_theme === "dark") {
    //   const metaThemeColor = document.querySelector("meta[name=theme-color]");
    //   const arcDark =
    //     getComputedStyle(document.documentElement)
    //       .getPropertyValue("--arc-palette-background")
    //       .slice(0, -2)
    //       .toLocaleLowerCase() || "#121a20";
    //   // console.log(arcDark);
    //   metaThemeColor?.setAttribute("content", arcDark);
    // }

    // if (user_theme === "light") {
    //   const metaThemeColor = document.querySelector("meta[name=theme-color]");
    //   const arcLight =
    //     getComputedStyle(document.documentElement)
    //       .getPropertyValue("--arc-palette-subtitle")
    //       .slice(0, -2)
    //       .toLocaleLowerCase() || "#bdcdcd";
    //   // console.log(arcLight);
    //   metaThemeColor?.setAttribute("content", arcLight);
    // }

    // listen for changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", e.matches);
      });
  }, [setTheme]);
}
