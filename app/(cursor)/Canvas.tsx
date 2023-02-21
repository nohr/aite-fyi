"use client";

import { useEffect } from "react";
import { useModelStore } from "state/app/(cursor)/model";
import { useUIStore } from "state/app/(ui)/ui";

export default function Canvas() {
  const canvas = useModelStore((state) => state.canvas);
  const get_canvas = useModelStore((state) => state.get_canvas);
  const setStatus = useUIStore((state) => state.setStatus);
  const motion = useUIStore((state) => state.motion);

  useEffect(() => {
    get_canvas(
      document.querySelector("canvas.output_canvas") as HTMLCanvasElement
    );
  }, [get_canvas]);

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
  }, [canvas]);
  return (
    <canvas
      className={`output_canvas absolute top-0 left-0 -z-10 opacity-10 ${
        motion ? "flex" : "hidden"
      }`}
      width="1280px"
      height="720px"
    ></canvas>
  );
}
