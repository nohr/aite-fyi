/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: akshatmittal (https://sketchfab.com/akshatmittal)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/2021-macbook-pro-14-m1-pro-m1-max-f6b0b940fb6a4286b18a674ef32af2d3
title: 2021 Macbook Pro 14" (M1 Pro / M1 Max)
*/

"use client";

import React, { forwardRef, memo, Ref, RefObject } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import {
  BackSide,
  DoubleSide,
  FrontSide,
  Group,
  Mesh,
  MeshStandardMaterial,
} from "three";

type GLTFResult = GLTF & {
  nodes: {
    back_1: Mesh;
    back_2: Mesh;
    matte: Mesh;
    body_1: Mesh;
    body_2: Mesh;
  };

  materials: {
    aluminium: MeshStandardMaterial;
    blackmatte: MeshStandardMaterial;
  };
};

const url = "/models/mbp-v1-pipe.glb";
export const M1 = memo(
  forwardRef(function M1(
    {
      children,
      ...props
    }: JSX.IntrinsicElements["group"] & { body: RefObject<Group> },
    ref: Ref<Group>,
  ) {
    const { nodes, materials } = useGLTF(url) as GLTFResult;
    const texture = useTexture("/misc/DSBridges.jpg");
    return (
      <group {...props} ref={props.body} dispose={null}>
        <group
          ref={ref}
          position={[0.0, -0.43, -11.45]}
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
            material-side={FrontSide}
          />
          <mesh geometry={nodes.matte.geometry}>{children}</mesh>
        </group>
        <mesh
          geometry={nodes.body_1.geometry}
          material={materials.aluminium}
          material-color="#aaaaaf"
          material-side={DoubleSide}
          material-envMapIntensity={0.2}
        >
          <Decal
            map={texture}
            // // roughness={0.5}
            // side={DoubleSide}
            // debug
            position={[7, 0, -5]}
            rotation={[Math.PI / 2, 0, Math.PI]}
            scale={[10, 3, 7]}
          />
        </mesh>
        <mesh
          geometry={nodes.body_2.geometry}
          material={materials.blackmatte}
          material-side={BackSide}
        />
      </group>
    );
  }),
);

useGLTF.preload(url);