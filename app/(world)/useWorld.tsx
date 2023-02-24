import { animate, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useWorldStore } from "./useWorldStore";

const throttle = (func: (...args: any[]) => any, delay = 2000) => {
  let lastTime = 0;

  return (...args: any) => {
    const now = new Date().getTime();
    if (now - lastTime < delay) return;
    lastTime = now;
    func(...args);
  };
};

// Handle world transforms
export function useWorld() {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const screen = useRef<HTMLDivElement | null>(null);
  const world = useRef<HTMLDivElement | null>(null);
  const setWorld = useWorldStore((state) => state.setWorld);
  const zoom = useWorldStore((state) => state.zoom);
  const setZoom = useWorldStore((state) => state.setZoom);
  const world_height = useWorldStore((state) => state.world_height);
  const world_width = useWorldStore((state) => state.world_width);
  const scale = useMotionValue(1);

  // * handle zoom gesture
  useEffect(() => {
    if (zoom) {
      animate(scale, 0.3355, {
        duration: 0.5,
        onUpdate: (latest) => {
          // console.log(latest);
        },
      });
      // disable scroll
      document.documentElement.style.overflow = "hidden";
    }
    if (!zoom) {
      animate(scale, 1, {
        duration: 0.5,
        onUpdate: (latest) => {
          // console.log(latest);
        },
      });
      // enable scroll
      document.documentElement.style.overflow = "auto";
    }
  }, [scale, world_height, world_width, zoom]);

  // * handle minimap zoom
  useEffect(() => {
    if (!screen.current) return;
    screen.current.addEventListener("dblclick", () => setZoom(!zoom));
    screen.current.onmousedown = (e) => e.button === 1 && setZoom(!zoom);
  }, [screen, setZoom, zoom]);

  const scaleScreen = useCallback(
    function (value = 1) {
      if (!screen.current) return;
      screen.current.style.height = `${
        ((window.innerHeight / world_height) * 100) / value
      }%`;
      screen.current.style.width = `${
        ((window.innerWidth / world_width) * 100) / value
      }%`;
    },
    [screen, world_height, world_width]
  );

  useEffect(() => {
    scaleScreen();
  }, [scaleScreen]);

  useEffect(() => {
    scale.on("change", (value) => {
      scaleScreen(value);
    });
  }, [scale, scaleScreen]);

  // * handle world scale
  useEffect(() => {
    const handleScale = (e: WheelEvent | KeyboardEvent) => {
      e.preventDefault();
      if (!screen.current || !wrapper.current || !world.current || !e.ctrlKey)
        return;
      // get scroll delta
      const deltaY = (e as WheelEvent).deltaY;
      if (deltaY > 0) setZoom(true);
      if (deltaY < 0) setZoom(false);

      // // resize the html element to the size of the world
      // const html = document.documentElement;
      // html.style.height = `${world_height * newScale}px`;
      // html.style.width = `${world_width * newScale}px`;
    };

    window.addEventListener("wheel", throttle(handleScale), { passive: false });
    window.addEventListener("gesturechange", (e) => e.preventDefault());
    return () => {
      window.removeEventListener("wheel", throttle(handleScale));
      window.removeEventListener("gesturechange", (e) => e.preventDefault());
    };
  }, [scale, setZoom, world_height, world_width]);

  // * update world on window resize
  useEffect(() => {
    const handleResize = () => {
      // get world size
      if (!world.current) return;

      const { width, height } = world.current.getBoundingClientRect();
      setWorld(height, width);
    };
    handleResize();
    wrapper.current?.offsetParent?.classList.add("opacity-100");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWorld, world]);

  // * update transform origin on scroll
  useEffect(() => {
    function onScroll() {
      const x = window.scrollX;
      const y = window.scrollY;
      const xPercent = x / (world_width - window.innerWidth);
      const yPercent = y / (world_height - window.innerHeight);
      const origin = `${xPercent * 100}% ${yPercent * 100}%`;
      if (world.current) world.current.style.transformOrigin = origin;
      // console.log(origin);

      if (screen.current) {
        // console.dir(screen.current);
        screen.current.style.transformOrigin = origin;
        screen.current.style.translate = "translate(0%, 0%)";
      }
    }
    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [world_height, world_width]);

  return { world, wrapper, screen, scale };
}
