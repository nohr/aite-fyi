"use client";

import React, { memo, Suspense, useRef } from "react";
import {
  Html,
  Loader,
  useGLTF,
  useScroll,
  // useTrailTexture,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Scan2: THREE.Mesh;
  };
};

const url = "/models/Scan2.gltf";
export const Scan = memo(
  function Scan({
    theme,
    ...props
  }: JSX.IntrinsicElements["mesh"] & {
    theme: string;
  }) {
    const { nodes } = useGLTF(url) as GLTFResult;
    const ref = useRef<THREE.Group>(null!);
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
      const theme = window
        .getComputedStyle(document.body)
        .getPropertyValue("--arc-palette-focus")
        .slice(1, -2);
      setArcTheme(theme);

      ref.current.rotation.y = scroll.offset * 5;
      if (ref.current.rotation.y > Math.PI / 3.5) ref.current.visible = false;
      else ref.current.visible = true;

      // TODO pointer interactivity
    });

    const [arcTheme, setArcTheme] = React.useState<string | undefined>(
      undefined
    );

    return (
      <Suspense
        fallback={
          <Html as="div" fullscreen>
            <Loader />
          </Html>
        }
      >
        <group ref={ref} rotation={[0, Math.PI / 9, 0]}>
          <mesh
            {...props}
            rotation={[Math.PI / 4.5, 0, 0]}
            // onPointerMove={onMove}
            geometry={nodes.Scan2.geometry}
          >
            <meshBasicMaterial
              attach="material"
              color={
                arcTheme ? arcTheme : theme === "light" ? "#18181B" : "#BFF164"
              }
            />
            {/* <meshLambertMaterial
            side={DoubleSide}
            displacementMap={texture}
            displacementScale={0.1}
            wireframe
            color="#BFF164"
          /> */}
          </mesh>
        </group>
      </Suspense>
    );
  },
  (prev, next) => prev.theme === next.theme
);

useGLTF.preload(url);
