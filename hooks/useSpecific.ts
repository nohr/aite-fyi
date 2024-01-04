// import { useCallback, useEffect, useState } from "react";
// import { useUIStore } from "./useUIStore";
// import { useAudioStore } from "./useAudioStore";

// function useSpecific() {
//   const [theme, setTheme] = useUIStore((s) => [s.theme, s.setTheme]);
//   const [currentTheme, setCurrentTheme] = useState<"light" | "dark">();
//   const [song, playing, time] = useAudioStore((s) => [
//     s.song,
//     s.playing,
//     s.time,
//   ]);
//   const [done, setDone] = useState(false);

//   const handleSpecific = useCallback(
//     (thing: "song" | "body", value: "cemetery c", event: "theme" | "wait") => {
//       if (thing === "song") {
//         if (value === "cemetery c") {
//         }
//       }
//     },
//     [currentTheme, done, playing, setTheme, song, theme],
//   );

//   useEffect(() => {
//     if (song) handleSpecific("song", "cemetery c", "theme");
//   }, [handleSpecific, song, time]);
// }

// export default useSpecific;
