"use client";

import { useEffect, useRef } from "react";
import { useModelStore } from "state/common/model";
import { useUIStore } from "state/common/ui";

export default function Camera() {
  const input = useModelStore((state) => state.input);
  const get_input = useModelStore((state) => state.get_input);
  const canvas = useModelStore((state) => state.canvas);
  const get_canvas = useModelStore((state) => state.get_canvas);
  const start_input = useModelStore((state) => state.start_input);
  const stop_input = useModelStore((state) => state.stop_input);
  const onResults = useModelStore((state) => state.onResults);
  const setStatus = useUIStore((state) => state.setStatus);
  const selfie = useModelStore((state) => state.selfie);
  const hands = useModelStore((state) => state.hands);
  const motion = useUIStore((state) => state.motion);

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    get_input(document.querySelector("video.input_video") as HTMLVideoElement);
    get_canvas(
      document.querySelector("canvas.output_canvas") as HTMLCanvasElement
    );
  }, [get_canvas, get_input]);

  // Handle the model functions
  useEffect(() => {
    if (!motion && input) stop_input();
    if (!motion && hands) return;
    start_input();

    if (!hands) return;
    hands.onResults(onResults);
  }, [hands, input, motion, onResults, setStatus, start_input, stop_input]);

  // Expand the canvas to the full size of the window
  useEffect(() => {
    if (!canvas) return;
    // set the hight and width of the canvas to the screen size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //  handle the window resize event
    window.addEventListener("resize", () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      });
    };
  }, [canvas]);

  useEffect(() => {
    if (canvas) {
      canvas.style.top = `${window.scrollY}px`;
      canvas.style.left = `${window.scrollX}px`;
    }
    // LISTEN TO scroll event and update the canvas position to match the scroll
    window.addEventListener("scroll", () => {
      if (canvas) {
        canvas.style.top = `${window.scrollY}px`;
        canvas.style.left = `${window.scrollX}px`;
      }
    });
    // remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", () => {
        if (canvas) {
          canvas.style.top = `${window.scrollY}px`;
          canvas.style.left = `${window.scrollX}px`;
        }
      });
    };
  }, [canvas, ref]);

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
        width="1280"
        height="720"
        className={`input_video absolute top-0 -z-10 hidden h-full w-full border-[1px] border-red-500 opacity-5 ${
          !selfie ? "-scale-x-100" : " scale-x-100"
        } `}
      ></video>
      <canvas
        ref={ref}
        className={`output_canvas absolute top-0 left-0 -z-10 opacity-10 ${
          motion ? "flex" : "hidden"
        }`}
        width="1280px"
        height="720px"
      ></canvas>
    </>
  );
}
