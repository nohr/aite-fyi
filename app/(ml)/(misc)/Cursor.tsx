"use client";

import { Canvas } from "@react-three/fiber";
import { useGesture } from "state/app/(hooks)/useGesture";

export default function Cursor() {
  const {
    select: { current: select },
    grab: { current: grab },
  } = useGesture();

  // console.log("select", select, "grab", grab, "zoom", zoom);

  return (
    <Canvas className="h-full w-full ">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
}
