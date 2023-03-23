"use client";
// import { useEffect } from "react";
import { VscLoading } from "react-icons/vsc";
import { useUIStore } from "(ui)";
import { Fade } from ".";
// import { useModelStore } from "../(cursor)/useModelStore";

export function SplashScreen({ loading }: { loading: boolean }) {
  const status = useUIStore((state) => state.status);
  // const input = useModelStore((state) => state.input);
  // const canvas = useModelStore((state) => state.canvas);
  // const results = useModelStore((state) => state.results);
  // // every time the status changes, append the old status to the component

  // // subscribe to the results for Loading
  // useEffect(() => {
  //   if (!input) setStatus("loading camera");
  //   if (input && !canvas) setStatus("loading canvas");
  //   // else if (!results) setStatus("loading model");
  // }, [input, canvas, results, setStatus]);

  return (
    <Fade
      truthy={loading}
      init={1}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        className={`fixed z-[200] flex h-screen w-screen items-center bg-zinc-200 p-4 dark:bg-zinc-900`}
      >
        <div className=" inline-flex gap-x-2">
          <VscLoading className="h-6 animate-spin" />
          {status}
        </div>
      </div>
    </Fade>
  );
}
