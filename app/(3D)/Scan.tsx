"use client";

import React, { memo, Suspense, useRef } from "react";
import {
  Html,
  Loader,
  useGLTF,
  useScroll,
  useTrailTexture,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
type GLTFResult = GLTF & {
  nodes: {
    Scan: THREE.Mesh;
  };
};

const url = "/models/Scan2.gltf";
export const Scan = memo(
  function Scan({
    theme,
    ...props
  }: JSX.IntrinsicElements["mesh"] & { theme: string }) {
    const { nodes } = useGLTF(url) as GLTFResult;
    const ref = useRef<THREE.Mesh>(null!);
    const scroll = useScroll();

    // const config: TrailConfig = {
    //   size: 60,
    //   maxAge: 500,
    //   radius: 1,
    //   interpolate: 1,
    //   smoothing: 0.5,
    //   minForce: 0.3,
    // };

    // const [texture, onMove] = useTrailTexture(config);

    useFrame(() => {
      ref.current.rotation.y = scroll.offset * 5;
      if (ref.current.rotation.y > Math.PI / 3) ref.current.visible = false;
      else ref.current.visible = true;

      // TODO pointer interactivity
    });

    return (
      <Suspense
        fallback={
          <Html as="div" fullscreen>
            <Loader />
          </Html>
        }
      >
        <mesh
          {...props}
          ref={ref}
          // onPointerMove={onMove}
          geometry={nodes.Scan.geometry}
        >
          <meshBasicMaterial
            attach="material"
            color={theme === "light" ? "#18181B" : "#BFF164"}
          />
          {/* <meshLambertMaterial
            side={DoubleSide}
            displacementMap={texture}
            displacementScale={0.1}
            wireframe
            color="#BFF164"
          /> */}
        </mesh>
      </Suspense>
    );
  },
  (prev, next) => prev.theme === next.theme
);

useGLTF.preload(url);
