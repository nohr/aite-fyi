import { useUIStore } from "(ui)";
import { useEffect, useRef } from "react";
import { useWorldStore } from "./useWorldStore";

// Handle world transforms
export function useWorld() {
  const grab = useUIStore((state) => state.grab);
  const wrapper = useRef<HTMLDivElement | null>(null);
  const screen = useRef<HTMLDivElement | null>(null);
  const world = useRef<HTMLDivElement | null>(null);
  const setWorld = useWorldStore((state) => state.setWorld);
  const setWorldScale = useWorldStore((state) => state.setWorldScale);
  const world_height = useWorldStore((state) => state.world_height);
  const world_width = useWorldStore((state) => state.world_width);

  // resize the screen when the world scale changes

  useEffect(() => {
    const handleScale = (e: WheelEvent | KeyboardEvent) => {
      if (!screen.current || !wrapper.current || !world.current || !e.ctrlKey)
        return;
      e.preventDefault();
      // get scroll delta
      const deltaY = (e as WheelEvent).deltaY;

      // throttle the scroll delta to every 3s
      // if (Date.now() - lastScrollTime.current < 3000) return;

      // // get the world scale
      // const scale = world.current.style.scale;
      // // const newScale =
      // //   Math.round((parseFloat(scale) - deltaY * 0.01 + Number.EPSILON) * 100) /
      // //   100;
      // const newScale = parseFloat(scale) - deltaY * 0.01;
      // // scale the world 😈
      // // if the scale is decreasing, animate the world scale to 0.4
      // if (newScale < 0.4 && newScale > 1) {
      //   world.current.style.transformOrigin = "50% 50%";
      //   setWorldScale(0.4);
      //   return;
      // }
      // setWorldScale(newScale);

      // // resize the screen
      // screen.current.style.transformOrigin = "50% 50%";
      // screen.current.style.height = `${
      //   ((window.innerHeight / world_height) * 100) / parseFloat(scale) - 8
      // }%`;
      // screen.current.style.width = `${
      //   ((window.innerWidth / world_width) * 100) / parseFloat(scale) - 8
      // }%`;
      // // resize the html element to the size of the world
      // const html = document.documentElement;
      // html.style.height = `${world_height * newScale}px`;
      // html.style.width = `${world_width * newScale}px`;
    };

    window.addEventListener("wheel", handleScale, { passive: false });
    return () => window.removeEventListener("wheel", handleScale);
  }, [setWorld, setWorldScale, world, world_height, world_width]);

  // update map on window resize
  useEffect(() => {
    const handleResize = () => {
      // get world size
      if (!world.current || !wrapper.current || !screen.current || grab) return;

      const { width, height } = world.current.getBoundingClientRect();
      setWorld(height, width);
      const height_ = (window.innerHeight / height) * 100;
      const width_ = (window.innerWidth / width) * 100;
      screen.current.style.height = `${height_}%`;
      screen.current.style.width = `${width_}%`;
    };
    handleResize();
    wrapper.current?.offsetParent?.classList.add("opacity-100");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [grab, setWorld, world]);

  return { world, wrapper, screen };
}
