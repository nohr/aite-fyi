import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import useLoading from "@hooks/useLoading";
import { useUIStore } from "(ui)";
import { Group, MeshPhysicalMaterial, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Polygon: THREE.Mesh;
    Polygon_1: THREE.Mesh;
    Polygon_2: THREE.Mesh;
    Polygon_3: THREE.Mesh;
    Polygon_4: THREE.Mesh;
    Polygon_5: THREE.Mesh;
    Polygon_6: THREE.Mesh;
    Polygon_7: THREE.Mesh;
    Polygon_8: THREE.Mesh;
    Polygon_9: THREE.Mesh;
    Polygon_10: THREE.Mesh;
    Polygon_11: THREE.Mesh;
    Polygon_12: THREE.Mesh;
    Polygon_13: THREE.Mesh;
    Polygon_14: THREE.Mesh;
    Polygon_15: THREE.Mesh;
    Polygon_16: THREE.Mesh;
    Polygon_17: THREE.Mesh;
    Polygon_18: THREE.Mesh;
    Polygon_19: THREE.Mesh;
    Polygon_20: THREE.Mesh;
    Polygon_21: THREE.Mesh;
    Polygon_22: THREE.Mesh;
    Polygon_23: THREE.Mesh;
    Polygon_24: THREE.Mesh;
    Polygon_25: THREE.Mesh;
    Polygon_26: THREE.Mesh;
    Polygon_27: THREE.Mesh;
    Polygon_28: THREE.Mesh;
    Polygon_29: THREE.Mesh;
    Polygon_30: THREE.Mesh;
    Polygon_31: THREE.Mesh;
    Polygon_32: THREE.Mesh;
    Polygon_33: THREE.Mesh;
    Polygon_34: THREE.Mesh;
    Polygon_35: THREE.Mesh;
    Polygon_36: THREE.Mesh;
  };
  materials: {
    ["Brushed Metal - Radial Anisotropy 02"]: THREE.MeshStandardMaterial;
  };
};

export function EkoDigital(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/models/eko_text.gltf") as GLTFResult;
  useLoading();

  const ref = useRef<Group>(null);

  useFrame(({ pointer }) => {
    ref.current?.lookAt(new Vector3(pointer.x, pointer.y, 0.8));
    ref.current?.position.lerp(new Vector3(pointer.x, pointer.y, 0), 0.08);
  });
  const color = useUIStore((s) => s.color);

  const mat = new MeshPhysicalMaterial({
    color: `${color}`,
    metalness: 0.43,
    roughness: 0.8,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
    toneMapped: true,
    opacity: 0.5,
    transparent: true,
    reflectivity: 0.4,
  });
  const {
    viewport: { width: w },
  } = useThree();
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight intensity={1} position={[0, 1, 8]} color="#ffffff" />
      <directionalLight intensity={1} position={[1, -1, 4]} color="#ffffff" />
      <group ref={ref} {...props} dispose={null} scale={w >= 768 ? 0.7 : 1.1}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon.geometry}
          material={mat}
          position={[2.19, -0.423, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_1.geometry}
          material={mat}
          position={[2.188, -0.947, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_2.geometry}
          material={mat}
          position={[2.454, -1.229, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_3.geometry}
          material={mat}
          position={[1.784, -1.219, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_4.geometry}
          material={mat}
          position={[1.253, -1.219, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_5.geometry}
          material={mat}
          position={[1.253, -0.785, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_6.geometry}
          material={mat}
          position={[1.784, -0.785, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_7.geometry}
          material={mat}
          position={[0.921, -0.731, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_8.geometry}
          material={mat}
          position={[0.634, -0.984, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_9.geometry}
          material={mat}
          position={[0.657, -0.431, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_10.geometry}
          material={mat}
          position={[0.352, -0.947, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_11.geometry}
          material={mat}
          position={[0.032, -0.951, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_12.geometry}
          material={mat}
          position={[0.012, -0.511, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_13.geometry}
          material={mat}
          position={[-0.371, -1.218, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_14.geometry}
          material={mat}
          position={[-0.902, -1.217, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_15.geometry}
          material={mat}
          position={[-0.902, -0.787, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_16.geometry}
          material={mat}
          position={[-0.37, -0.787, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_17.geometry}
          material={mat}
          position={[-0.372, -1.548, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_18.geometry}
          material={mat}
          position={[-1.266, -0.951, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_19.geometry}
          material={mat}
          position={[-1.286, -0.511, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_20.geometry}
          material={mat}
          position={[-1.67, -0.431, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_21.geometry}
          material={mat}
          position={[-1.558, -0.823, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_22.geometry}
          material={mat}
          position={[-2.201, -0.787, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_23.geometry}
          material={mat}
          position={[-1.67, -1.217, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_24.geometry}
          material={mat}
          position={[-2.201, -1.221, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_25.geometry}
          material={mat}
          position={[1.18, 0.645, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_26.geometry}
          material={mat}
          position={[0.65, 0.645, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_27.geometry}
          material={mat}
          position={[1.18, 0.213, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_28.geometry}
          material={mat}
          position={[0.65, 0.213, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_29.geometry}
          material={mat}
          position={[-0.244, 1.002, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_30.geometry}
          material={mat}
          position={[-0.246, 0.477, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_31.geometry}
          material={mat}
          position={[0.042, 0.701, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_32.geometry}
          material={mat}
          position={[0.125, 0.215, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_33.geometry}
          material={mat}
          position={[-0.65, 0.645, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_34.geometry}
          material={mat}
          position={[-1.18, 0.645, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_35.geometry}
          material={mat}
          position={[-1.18, 0.213, -0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Polygon_36.geometry}
          material={mat}
          position={[-0.927, 0.532, -0.025]}
        />
      </group>
    </>
  );
}

useGLTF.preload("/models/eko_text.gltf");
