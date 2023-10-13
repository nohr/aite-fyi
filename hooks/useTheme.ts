"use client";

import { useUIStore } from "(ui)";
import { useEffect } from "react";

export default function useTheme() {
  const [setTheme, theme] = useUIStore((s) => [s.setTheme, s.theme]);

  useEffect(() => { 
    if (theme === "dark") {
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      const arcDark = getComputedStyle(document.documentElement)
      .getPropertyValue("--arc-palette-maxContrastColor")
      .slice(0, -2)
      .toLocaleLowerCase() || "#2b0003FF";
      metaThemeColor?.setAttribute("content", arcDark);
    } else {
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      const arcLight = getComputedStyle(document.documentElement)
      .getPropertyValue("--arc-palette-subtitle")
      .slice(0, -2)
      .toLocaleLowerCase() || "#CADEEAFF";
      metaThemeColor?.setAttribute("content", arcLight);
    }
  }, [theme]);

  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(theme);
    if (theme === "dark")
      document.documentElement.classList.add("dark");
    

    // listen for changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", e.matches);
      });
  }, [setTheme]);
}
