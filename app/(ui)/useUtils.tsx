"use client";
import { useWorldStore } from "(world)/useWorldStore";
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
  const setZoom = useWorldStore((state) => state.setZoom);

  const routeChange = useCallback(() => {
    setRouting(true);
    setZoom(false);
    // listen to scroll event
    window.addEventListener("scroll", () => {
      // set routing to false when scrolling stops
      setTimeout(() => {
        setRouting(false);
      }, 750);
    });
  }, [setRouting, setZoom]);

  return { routeChange };
}
