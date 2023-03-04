/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: akshatmittal (https://sketchfab.com/akshatmittal)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/2021-macbook-pro-14-m1-pro-m1-max-f6b0b940fb6a4286b18a674ef32af2d3
title: 2021 Macbook Pro 14" (M1 Pro / M1 Max)
*/

import * as THREE from "three";
import React, { forwardRef, MutableRefObject, Ref } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    back_1: THREE.Mesh;
    back_2: THREE.Mesh;
    matte: THREE.Mesh;
    body_1: THREE.Mesh;
    body_2: THREE.Mesh;
  };

  materials: {
    aluminium: THREE.MeshStandardMaterial;
    blackmatte: THREE.MeshStandardMaterial;
  };
};

console.log("render");
const url = "/models/mbp-v1-pipe.glb";
export const M1 = forwardRef(function M1(
  {
    children,
    ...props
  }: JSX.IntrinsicElements["group"] & { body: MutableRefObject<THREE.Group> },
  ref: Ref<THREE.Group>
) {
  const { nodes, materials } = useGLTF(url) as GLTFResult;
  return (
    <group {...props} ref={props.body} dispose={null}>
      <group
        ref={ref}
        position={[0, -0.43, -11.35]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <mesh
          geometry={nodes.back_1.geometry}
          material={materials.blackmatte}
        />
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.back_2.geometry}
          material={materials.aluminium}
        />
        <mesh geometry={nodes.matte.geometry}>{children}</mesh>
      </group>
      <mesh
        geometry={nodes.body_1.geometry}
        material={materials.aluminium}
        material-color="#aaaaaf"
        material-side={THREE.DoubleSide}
        material-envMapIntensity={0.2}
      />
      <mesh geometry={nodes.body_2.geometry} material={materials.blackmatte} />
    </group>
  );
});

// useGLTF.preload(url);