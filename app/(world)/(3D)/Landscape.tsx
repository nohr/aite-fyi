import { useWorldStore } from "(world)/useWorldStore";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, BufferGeometry, Material } from "three";

export function Landscape() {
  const world_height = useWorldStore((state) => state.world_height);
  const world_width = useWorldStore((state) => state.world_width);

  return (
    <div className="!absolute !top-0 !left-0 -z-10 !m-0 !h-full !w-full">
      <Canvas
        gl={{
          alpha: true,
          antialias: false,
          logarithmicDepthBuffer: true,
          stencil: false,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 5, 0],
          fov: 75,
          aspect: world_width / world_height,
          //   type: "PerspectiveCamera",
        }}
        style={{ height: world_height, width: world_width }}
        id="Landscape"
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <pointLight position={[-10, -15, -10]} />
        <fog attach="fog" args={["white", 5, 15]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}

function Box(props: JSX.IntrinsicElements["mesh"]) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta;
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#ED2E38"} />
    </mesh>
  );
}
