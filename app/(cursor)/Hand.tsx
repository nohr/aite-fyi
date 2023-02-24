"use client";

import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import {
  Html,
  //   useProgress,
  //   OrbitControls,
  OrthographicCamera,
  Stage,
  useGLTF,
} from "@react-three/drei";
import { VscLoading } from "react-icons/vsc";
import { useCursor } from "./useCursor";
import { useGesture } from "./useGesture";
useGLTF.preload("/models/Cartoon+hands.gltf");

export default function Hand({ hand, side }: HandProps) {
  const { cursor, setCursor } = useCursor();

  const {
    select: { current: select },
    drag,
    zooming: { current: zooming },
  } = useGesture(cursor);

  useEffect(() => {
    return () => {
      setCursor(false);
    };
  }, [setCursor]);

  const { nodes } = useGLTF("/models/Cartoon+hands.gltf") as GLTF & {
    nodes: {
      point_left: THREE.Mesh;
      point_right: THREE.Mesh;
    };
  };

  const material = new THREE.MeshStandardMaterial({
    flatShading: true,
    color: drag
      ? "#ff0000"
      : select
      ? "#00ff00"
      : zooming
      ? "#0000ff"
      : "#ffffff",
    roughness: 0.5,
    metalness: 0.5,
  });

  // todo update the mouse position with the cursor position

  // * handle rotation
  const offsetX = Math.floor(window.innerWidth * hand[8].x);
  const offsetY = Math.floor(window.innerHeight * hand[8].y);

  const index_tip = hand[8];
  const wrist = hand[0];

  // get the angle of the line from the tip to the wrist base

  const y_angle = Math.atan2(index_tip.y - wrist.y, index_tip.x - wrist.x) * -1;

  //   console.log(angle);

  // ! this angle is inverted
  //   get the z angle of the line from the tip to the wrist base
  const x_angle = Math.atan2(index_tip.z - wrist.z, index_tip.x - wrist.x);

  //   console.log(x_angle);

  // get the element below the cursor
  const element = document.elementFromPoint(offsetX, offsetY);
  // log the element if it is a link
  if (element?.tagName === "A") {
    console.log(element);
  }

  return (
    <Canvas
      shadows
      dpr={[1, 1]}
      frameloop="demand"
      id="Hand"
      style={{ left: offsetX - 56, top: offsetY - 56 }}
      className=" !fixed z-50 !h-20 !w-20 !origin-center"
    >
      <Suspense fallback={<Spinner />}>
        {/* <ambientLight intensity={1} color={"#ffffff"} /> */}
        {/* <spotLight intensity={1} position={[0, 0, -20]} /> */}
        <OrthographicCamera
          makeDefault
          position={[0, 100, -1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
        <Stage adjustCamera={2} intensity={0}>
          <mesh
            castShadow
            receiveShadow
            dispose={null}
            frustumCulled={false}
            onAfterRender={() => setCursor(true)}
            geometry={
              side === "Right"
                ? nodes.point_right.geometry
                : nodes.point_left.geometry
            }
            material={material}
            //   ! Euler order: ?Z? because camera is top down
            // rotation={[0, y_angle, 0]}
            rotation={[0, 0, 0]}
            position={[0, 0, 0]}
          />
        </Stage>
      </Suspense>
    </Canvas>
  );
}
// Spinner
export const Spinner = () => {
  //   const { progress } = useProgress();
  return (
    <Html as="div">
      {/* <p>{`${progress}`}</p> */}
      <VscLoading className="h-16 animate-spin" />
    </Html>
  );
};
