import { Grid } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, BufferGeometry, Material } from "three";
import { Camera } from "./Camera";

export function Landscape({ ...props }) {
  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: false,
        logarithmicDepthBuffer: true,
        stencil: false,
        powerPreference: "high-performance",
      }}
      className="!fixed !top-0 !left-0 -z-10 !m-0"
      id="Landscape"
    >
      <Camera {...props} />
      <ambientLight intensity={0.5} />
      {/* <spotLight position={[1, 15, 1]} angle={0.3} /> */}
      {/* <pointLight position={[-10, -15, -10]} />
      <fog attach="fog" args={["white", 5, 15]} /> */}
      <Box position={[-1, 0, 0]} />
      <Box position={[1, 0, 0]} />
      {/* <Grid
        infiniteGrid
        followCamera={false}
        cellSize={1}
        cellColor="#346f9f"
        cellThickness={0}
        sectionSize={1}
        sectionThickness={1}
      /> */}
      <mesh
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        frustumCulled={false}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"#52525B"} />
      </mesh>
    </Canvas>
  );
}

function Box(props: JSX.IntrinsicElements["mesh"]) {
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
}
