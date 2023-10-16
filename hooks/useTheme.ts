"use client";

import { useUIStore } from "(ui)";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const updateTheme = (theme: string | undefined) => {
  if (theme === "dark") {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    const arcDark =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--arc-palette-maxContrastColor")
        .slice(0, -2)
        .toLocaleLowerCase() || "#2b0003FF";
    // console.log(arcDark);
    metaThemeColor?.setAttribute("content", arcDark);
  } else if (theme === "light") {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    const arcLight =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--arc-palette-subtitle")
        .slice(0, -2)
        .toLocaleLowerCase() || "#CADEEAFF";
    // console.log(arcLight);
    metaThemeColor?.setAttribute("content", arcLight);
  }
};

export default function useTheme() {
  const pathname = usePathname();
  const [setTheme, theme] = useUIStore((s) => [s.setTheme, s.theme]);

  useEffect(() => {
    updateTheme(theme);
  }, [theme, pathname]);

  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(theme);
    if (theme === "dark") document.documentElement.classList.add("dark");

    // listen for changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", e.matches);
      });
  }, [setTheme]);
}
