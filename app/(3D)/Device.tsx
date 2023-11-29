/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import { PresentationControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Vector3 } from "three";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import { Group } from "three/src/objects/Group";
import { mod } from "../../utils/constants";
import { M1 } from "./M1";
import { Phone } from "./Phone";
import { VideoMaterial } from "./VideoMaterial";
import { usePathname } from "next/navigation";

const rsqw = (t: number, delta = 0.02, a = 1, f = 1 / (2 * Math.PI)) =>
  (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);

export const Device = function Device() {
  const {
    size: { width: w },
  } = useThree();
  const screen = useRef<Group>(null);
  const body = useRef<Group>(null);
  const phone = useRef<Group>(null);
  const keyLight = useRef<DirectionalLight>(null);

  // init animation
  useFrame(() => {
    if (screen.current && body.current) {
      screen.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(0.5);
      body.current.rotation.y +=
        body.current.rotation.y < -0.75
          ? (body.current.rotation.y / -2) * 0.07
          : 0;
      body.current.rotation.x +=
        body.current.rotation.x < -Math.PI / 24
          ? (body.current.rotation.x / -2) * 0.045
          : 0;
    }
    if (phone.current) {
      phone.current.rotation.y +=
        phone.current.rotation.y > 0
          ? 0
          : (0.5 - phone.current.rotation.y / 2) * 0.035;
    }
  });

  // mouse tracking
  const groupRef = useRef<Group>(null);
  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    const target = new Vector3(
      pointer.x * mod * 2 * 0.1 + 5,
      pointer.y * mod * 0.2 - 1,
      -3,
    );
    if (w > 768) groupRef.current.lookAt(target);
    else {
      groupRef.current.lookAt(5, -1, -3);
    }
  });

  // useEffect(() => {
  //   console.log("mount devices");
  //   return () => {
  //     console.log("unmount devices");
  //   };
  // }, []);

  const params = usePathname().split("/")[2];
  if (!params) return null;

  return (
    <Suspense fallback={null}>
      <group
        ref={groupRef}
        scale={w > 768 ? 1 : w / 700}
        position={[0, -4, -15]}
      >
        <PresentationControls snap enabled={w <= 768}>
          <spotLight intensity={1} penumbra={0.6} position={[0, 6, 0]} />
          <directionalLight
            ref={keyLight}
            intensity={0.8}
            position={[0, 4, 6]}
          />
          <M1
            body={body}
            ref={screen}
            scale={0.45}
            rotation={[-Math.PI, -Math.PI, -0.2]}
            position={[0, -1, 0]}
          >
            <VideoMaterial mobile={null} />
          </M1>
          <Phone
            ref={phone}
            rotation={[0.25, -Math.PI, 0.15]}
            position={[-3, 1, 0]}
            scale={0.05}
            frustumCulled={false}
          >
            <VideoMaterial mobile />
          </Phone>
        </PresentationControls>
      </group>
    </Suspense>
  );
};
