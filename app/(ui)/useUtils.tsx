"use client";

import { useScroll } from "@react-three/drei";
import { useRef, useCallback, useEffect } from "react";
import { useUIStore } from "./useUIStore";

export function useUtils() {
  const throttle = useCallback(
    (func: (...args: any[]) => any, delay = 2000) => {
      let lastTime = 0;
      return (...args: any) => {
        const now = new Date().getTime();
        if (now - lastTime < delay) return;
        lastTime = now;
        func(...args);
      };
    },
    []
  );

  return { throttle };
}

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeout.current = setTimeout(callbackRef.current, delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}

export function useRouteChange() {
  const setRouting = useUIStore((state) => state.setRouting);

  const scroll = useScroll();
  // listen to scroll event
  if (scroll) {
    // set routing to false when scrolling stops
    setTimeout(() => {
      setRouting(false);
    }, 750);
  }

  const routeChange = useCallback(() => {
    // setRouting(true);
  }, [setRouting]);

  return { routeChange };
}
