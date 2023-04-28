"use client";

import { useUIStore } from "(ui)";
import { useEffect } from "react";

export default function useTheme() {
  const setTheme = useUIStore((state) => state.setTheme);

  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(theme);

    // listen for changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light");
      });
  }, [setTheme]);
}
