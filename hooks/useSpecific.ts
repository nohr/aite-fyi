import { useCallback, useEffect, useState } from "react";
import { useUIStore } from "./useUIStore";
import { useAudioStore } from "./useAudioStore";

function useSpecific() {
  const [theme, setTheme] = useUIStore((s) => [s.theme, s.setTheme]);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">();
  const [song, playing, time] = useAudioStore((s) => [
    s.song,
    s.playing,
    s.time,
  ]);
  const [done, setDone] = useState(false);

  const handleSpecific = useCallback(
    (thing: "song" | "body", value: "cemetery c", event: "theme" | "wait") => {
      if (thing === "song") {
        if (value === "cemetery c") {
          if (event === "theme") {
            if (playing && song?.name === value) {
              if (done) return;
              if (!currentTheme) setCurrentTheme(theme);
              else if (currentTheme !== "dark") {
                setTheme("dark");
                document.documentElement.classList.add("cemetery_c");
              }
              if (theme === "dark") setDone(true);
            }

            if (currentTheme)
              if (!playing || song?.name !== value) {
                if (theme !== currentTheme) {
                  setTheme(currentTheme);
                  document.documentElement.classList.toggle(
                    "cemetery_c",
                    currentTheme === "dark",
                  );
                }

                setCurrentTheme(undefined);
                setDone(false);
              }
          }
        }
      }
    },
    [currentTheme, done, playing, setTheme, song, theme],
  );

  useEffect(() => {
    if (song) handleSpecific("song", "cemetery c", "theme");
  }, [handleSpecific, song, time]);
}

export default useSpecific;
