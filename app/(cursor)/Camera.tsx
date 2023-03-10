"use client";

import { useUIStore } from "(ui)";
import { useEffect } from "react";
import { useModelStore } from "./useModelStore";

export default function Camera() {
  const get_input = useModelStore((state) => state.get_input);
  const start_input = useModelStore((state) => state.start_input);
  const stop_input = useModelStore((state) => state.stop_input);
  const resolution = useModelStore((state) => state.resolution);
  const selfie = useModelStore((state) => state.selfie);
  const motion = useUIStore((state) => state.motion);

  useEffect(() => {
    get_input(document.querySelector("video.input_video") as HTMLVideoElement);
  }, [get_input]);

  // handle focus and blur events
  useEffect(() => {
    if (!motion) return;
    window.addEventListener("focus", start_input);
    window.addEventListener("blur", stop_input);
    return () => {
      window.removeEventListener("focus", start_input);
      window.removeEventListener("blur", stop_input);
    };
  }, [motion, start_input, stop_input]);

  return (
    <>
      <video
        width={`${resolution.width}`}
        height={`${resolution.height}`}
        className={`input_video absolute top-0 -z-10 hidden  h-full border-[1px] border-red-500 opacity-0 ${
          !selfie ? "-scale-x-100" : " scale-x-100"
        } `}
      ></video>
    </>
  );
}
