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

    // listen for changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", e.matches);
      });
  }, [setTheme]);
}
