import { WorldProps } from "(ui)";
import { Grid, Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { forwardRef, memo, useRef } from "react";
import { Mesh, BufferGeometry, Material } from "three";
import { Camera } from "./Camera";
import { Dom } from "./HtmlWorld";

export const Landscape = memo(function Landscape({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: false,
        logarithmicDepthBuffer: true,
        stencil: false,
        powerPreference: "low-power",
      }}
      className="!fixed !top-0 !left-0 -z-10 !m-0"
      id="Landscape"
    >
      {children}
      <Camera />
      {/* <ambientLight intensity={1} /> */}
      {/* <fog attach="fog" args={["white", 5, 15]} /> */}
      <Box position={[-1, 0, 0]} />
      <Box position={[1, 0, 0]} />
      <Grid
        infiniteGrid
        followCamera={false}
        cellSize={1}
        cellColor="#346f9f"
        cellThickness={0}
        sectionSize={1}
        sectionThickness={1}
        position={[0, 0, 0]}
      />
      <mesh
        position={[0, -1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        frustumCulled={false}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"#E4E4E7"} />
      </mesh>
      {/* <OrbitControls /> */}
    </Canvas>
  );
});

const Box = memo(function Box(props: JSX.IntrinsicElements["mesh"]) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta;
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh {...props} ref={mesh} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#ED2E38"} />
    </mesh>
  );
});
