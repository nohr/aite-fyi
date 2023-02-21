"use client";
import React, { useEffect, useState } from "react";
import { useModelStore } from "state/app/(cursor)/model";
import { useUIStore } from "../(ui)/ui";
import Camera from "./Camera";
import Canvas from "./Canvas";
import Hand from "./Hand";
import { useGesture } from "./useGesture";

export default function Cursor() {
  const input = useModelStore((state) => state.input);
  const start_input = useModelStore((state) => state.start_input);
  const stop_input = useModelStore((state) => state.stop_input);
  const onResults = useModelStore((state) => state.onResults);
  const setStatus = useUIStore((state) => state.setStatus);
  const hands = useModelStore((state) => state.hands);
  const motion = useUIStore((state) => state.motion);
  const results = useModelStore((state) => state.results);
  const [cursor, setCursor] = useState(false);

  // Handle the model functions
  useEffect(() => {
    if (!motion && input) stop_input();
    if (!motion && hands) return;
    start_input();

    if (!hands) return;
    hands.onResults(onResults);
  }, [hands, input, motion, onResults, setStatus, start_input, stop_input]);

  useEffect(() => {
    if (!results) return;
    setStatus("");
  }, [results, setStatus]);

  const {
    select: { current: select },
    drag: { current: drag },
    zoom: { current: zoom },
  } = useGesture(cursor);

  return (
    <>
      <Camera />
      {/* <Canvas /> */}
      {results &&
        results.multiHandLandmarks.map(
          (hand: { x: number; y: number; z: number }[], index: number) => (
            <Hand
              hand={hand}
              side={results.multiHandedness[0].label}
              drag={drag}
              select={select}
              zoom={zoom}
              setCursor={setCursor}
              // ! this key (index) doesn't render two hands
              key={index}
            />
          )
        )}
    </>
  );
}
