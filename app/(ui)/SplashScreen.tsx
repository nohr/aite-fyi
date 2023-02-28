"use client";
// import { useEffect } from "react";
import { VscLoading } from "react-icons/vsc";
import { useUIStore } from "(ui)";
import { Fade } from ".";
// import { useModelStore } from "../(cursor)/useModelStore";

export function SplashScreen() {
  const status = useUIStore((state) => state.status);
  // const setStatus = useUIStore((state) => state.setStatus);
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
    // todo control truthy with other booleans instead of status
    <Fade truthy={status !== ""}>
      <div
        className={`fixed z-[100] flex h-screen w-screen items-center bg-zinc-600 p-4`}
      >
        <div className=" inline-flex gap-x-2 text-zinc-900">
          <VscLoading className="h-6 animate-spin" />
          {status}
        </div>
      </div>
    </Fade>
  );
}
