"use client";

import { useUIStore } from "@hooks/useUIStore";
// import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function useTheme() {
  const { setState } = useUIStore;

  useEffect(() => {
    const user_theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setState({ theme: user_theme });

    if (user_theme === "dark") document.documentElement.classList.add("dark");
    if (user_theme === "dark")
      document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.setAttribute("data-theme", "light");

    // listen for changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setState({ theme: e.matches ? "dark" : "light" });
        document.documentElement.classList.toggle("dark", e.matches);
      });
  }, [setState]);
}
