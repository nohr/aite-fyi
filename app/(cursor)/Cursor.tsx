"use client";

import Camera from "./Camera";
import Hand from "./Hand";
import { useCursor } from "./useCursor";

export default function Cursor() {
  const { results } = useCursor();
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
              // ! this key (index) doesn't render two hands
              key={index}
            />
          )
        )}
    </>
  );
}
