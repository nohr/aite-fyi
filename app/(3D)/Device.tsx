/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import { PresentationControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
// import { ProjectType } from "api/projects/route";
import { memo, Suspense, useEffect, useRef } from "react";
import { Vector3 } from "three";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import { Group } from "three/src/objects/Group";
import { mod } from "../../utils/constants";
import { Env } from "./Environment";
import { M1 } from "./M1";
import { Phone } from "./Phone";
import { VideoMaterial } from "./VideoMaterial";

const rsqw = (t: number, delta = 0.02, a = 1, f = 1 / (2 * Math.PI)) =>
  (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);

export const Device = memo(function Device({ ...props }: { params: string[] }) {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const screen = useRef<Group>(null!);
  const body = useRef<Group>(null!);
  const phone = useRef<Group>(null!);
  const keyLight = useRef<DirectionalLight>(null!);
  const { size } = useThree();

  // handle device sizing
  const M1Height = window.matchMedia("(max-width: 768px)").matches
    ? -1
    : -h / 10;

  const M1Scale = w / 36;

  const PhoneScale = w / 200;

  // Desktop
  useFrame(() => {
    if (screen.current && body.current) {
      screen.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(0.5);
      body.current.rotation.y +=
        body.current.rotation.y < -0.3
          ? (body.current.rotation.y / -2) * 0.07
          : 0;
      body.current.rotation.x +=
        body.current.rotation.x < -Math.PI / 9
          ? (body.current.rotation.x / -2) * 0.07
          : 0;
    }
    if (phone.current) {
      phone.current.rotation.y +=
        phone.current.rotation.y > 0
          ? 0
          : (0.5 - phone.current.rotation.y / 2) * 0.07;
    }
  });

  const groupRef = useRef<Group>(null!);
  // motion
  useFrame(({ mouse }) => {
    if (!groupRef.current) return;
    const target = new Vector3(
      mouse.x * mod * 2 * 0.1 + 5,
      mouse.y * mod * 0.2 - 1.5,
      7
    );
    if (size.width > 768) groupRef.current.lookAt(target);
    else {
      groupRef.current.lookAt(0, -1, 10);
      groupRef.current.position.x = 0;
      groupRef.current.position.z = -2;
    }
  });
  return (
    <PresentationControls snap enabled={size.width <= 768}>
      <Suspense fallback={null}>
        <spotLight intensity={1} penumbra={0.6} position={[0, 0, 0]}>
          <group position={size.width > 768 ? [w / 3.5, -h / 5, -2] : [w / 3, -h / 16, -5]} ref={groupRef}>
            <directionalLight
              ref={keyLight}
              intensity={0.8}
              position={[0, 24, 6]}
            />
            <M1
              body={body}
              ref={screen}
              scale={M1Scale}
              rotation={[-Math.PI, -Math.PI, 0]}
              position={[0, M1Height, 0]}
            >
              <VideoMaterial mobile={null} {...props} />
            </M1>
            <Phone
              ref={phone}
              rotation={[0.5, -Math.PI, -0.3]}
              position={[-w / 1.75, -PhoneScale * 5, -1.5]}
              scale={PhoneScale}
              frustumCulled={false}
            >
              <VideoMaterial mobile {...props} />
            </Phone>
          </group>
        </spotLight>
        <Env />
      </Suspense>
    </PresentationControls>
  );
});
