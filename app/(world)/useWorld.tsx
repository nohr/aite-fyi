import { useUtils, useTimeout } from "(ui)";
import { animate, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useWorldStore } from "./useWorldStore";

// Handle world transforms
export function useWorld() {
  const { throttle } = useUtils();
  const wrapper = useRef<HTMLDivElement | null>(null);
  const screen = useRef<HTMLDivElement | null>(null);
  const world = useRef<HTMLDivElement | null>(null);
  const setWorld = useWorldStore((state) => state.setWorld);
  const zoom = useWorldStore((state) => state.zoom);
  const setZoom = useWorldStore((state) => state.setZoom);
  const setRotate = useWorldStore((state) => state.setRotate);
  const world_height = useWorldStore((state) => state.world_height);
  const world_width = useWorldStore((state) => state.world_width);
  const pathname = usePathname();
  const scale = useMotionValue(1);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // * if the alt key is held down, rotate the world with the mouse
  const resetRotation = useCallback(() => {
    setRotate(false);
    animate(rotateX, 0, {
      duration: 0.1,
    });
    animate(rotateY, 0, {
      duration: 0.1,
    });
  }, [setRotate, rotateX, rotateY]);

  const { reset, clear } = useTimeout(() => resetRotation(), 1500);

  const handleRotate = useCallback(
    (e: MouseEvent) => {
      if (!world.current) return;
      if (!e.altKey) {
        clear();
        resetRotation();
        return;
      }
      reset();
      // handle rotation logic
      setRotate(true);
      const { clientX, clientY } = e;
      const { width, height } = world.current.getBoundingClientRect();
      let x = (clientX / (width / 0.332)) * 150;
      let y = (clientY / (height / 0.332)) * 150;
      if (x > 75) x = 75;
      if (x < -75) x = -75;
      if (y > 75) y = 75;
      if (y < -75) y = -75;
      animate(rotateX, -y, {
        duration: 0.1,
      });
      animate(rotateY, x, {
        duration: 0.1,
      }); // world.current.style.transformOrigin = `${clientX}px ${clientY}px`;
    },
    [reset, setRotate, rotateX, rotateY, clear, resetRotation]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleRotate);
  }, [handleRotate]);

  // * handle world zoom
  // !bug - zooming on  middle row returns lower than expected
  // ?pinch trigger

  const handlePinch = useCallback(
    (e: WheelEvent | KeyboardEvent) => {
      e.preventDefault();
      if (!screen.current || !wrapper.current || !world.current) return;

      if (e.ctrlKey) {
        const { deltaY } = e as WheelEvent;
        if (deltaY > 0) setZoom(true);
        if (deltaY < 0) setZoom(false);
      }
    },
    [setZoom]
  );

  useEffect(() => {
    window.addEventListener("wheel", throttle(handlePinch), {
      passive: false,
    });
    window.addEventListener("gesturechange", (e) => e.preventDefault());
    return () => {
      window.removeEventListener("wheel", throttle(handlePinch));
      window.removeEventListener("gesturechange", (e) => e.preventDefault());
    };
  }, [throttle, handlePinch]);

  // ?keyboard trigger
  const ScaleUp = useCallback(
    (e: KeyboardEvent) => {
      if (!e.altKey || !world.current) return;
      e.preventDefault();
      setZoom(true);
    },
    [setZoom]
  );

  const ScaleDown = useCallback(
    (e: KeyboardEvent) => {
      if (!world.current) return;
      e.preventDefault();
      setZoom(false);
    },
    [setZoom]
  );

  useEffect(() => {
    // event listeners for key release
    document.addEventListener("keydown", ScaleUp);
    document.addEventListener("keyup", ScaleDown);

    return () => {
      console.log("remove");
      document.removeEventListener("keydown", ScaleUp);
      document.removeEventListener("keyup", ScaleDown);
    };
  }, [ScaleUp, ScaleDown]);

  // * handle zoom animation
  useEffect(() => {
    if (zoom) {
      animate(scale, 0.332, {
        duration: 0.5,
      });
      // disable scroll
      document.documentElement.style.overflow = "hidden";
    }
    if (!zoom) {
      animate(scale, 1, {
        duration: 0.5,
      });
      // enable scroll
      document.documentElement.style.overflow = "auto";
    }
    const worldNow = world.current;
    return () => {
      if (!worldNow) return;
      if (pathname === null) return;
      const element = document.getElementById(pathname);
      if (element === null) return;
      //  scroll to the element
      element.scrollIntoView({ behavior: "smooth" });
      // change the transform origin to the center of the element
      worldNow.style.transformOrigin = `${
        element.offsetLeft + element.offsetWidth / 2
      }px ${element.offsetTop + element.offsetHeight / 2}px`;
    };
  }, [scale, world_height, world_width, zoom, pathname]);

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

    scale.on("change", (value) => {
      scaleScreen(value);
    });
  }, [scale, scaleScreen]);

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
      if (zoom) return;
      const x = window.scrollX;
      const y = window.scrollY;
      const xPercent = x / (world_width - window.innerWidth);
      const yPercent = y / (world_height - window.innerHeight);
      const origin = `${xPercent * 100}% ${yPercent * 100}%`;
      if (world.current) world.current.style.transformOrigin = origin;
      // console.log("scroll", origin);

      if (!screen.current) return;
      screen.current.style.transformOrigin = origin;
      screen.current.style.translate = "translate(0%, 0%)";
    }
    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [world_height, world_width, zoom]);

  return { world, wrapper, screen, scale, rotateX, rotateY };
}
