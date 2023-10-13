import React, { useEffect, useState } from 'react'
import { useUIStore } from './useUIStore';
import { useAudioStore } from './useAudioStore';

function useSpecific() {
    const [theme, setTheme] = useUIStore((s) => [s.theme, s.setTheme]);
    const [currentTheme, setCurrentTheme] = useState<"light"|"dark">();
    const [song, playing, time,] = useAudioStore((s) => [s.song, s.playing, s.time,]);
    const [done, setDone] = useState(false);

    function handleSpecific(thing: "song" | "body", value: "cemetery c", extra?: any) {
      if (thing === "song") {
          if (value === "cemetery c") {    

              if (playing && extra?.name === value) {
                  if (done) return;
                  if (!currentTheme)
                      setCurrentTheme(theme);
                  else if (currentTheme !== "dark") {
                      setTheme("dark");
                      document.documentElement.classList.add("dark");
                  }
                  if (theme === "dark") 
                      setDone(true);
              } 
  
            if (currentTheme)
                if (!playing || extra?.name !== value) {
                    if (theme !== currentTheme) {
                        setTheme(currentTheme);
                        document.documentElement.classList.toggle("dark", currentTheme === "dark");
                    }
                    setCurrentTheme(undefined);
                    setDone(false);
                  }
          }
      }
    }
  
    useEffect(() => {
      if (song) 
        handleSpecific("song", "cemetery c", song);
      }, [song, time]);
}

export default useSpecific