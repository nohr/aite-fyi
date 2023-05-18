/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import { PresentationControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
// import { ProjectType } from "api/projects/route";
import { memo, Suspense, useEffect, useRef } from "react";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import { Group } from "three/src/objects/Group";
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

  // handle device sizing
  const M1Height = window.matchMedia("(max-width: 768px)").matches
    ? h / 10
    : -h / 4;

  const M1Scale =
    w / 40 > 1.23
      ? 1.23
      : window.matchMedia("(max-width: 768px)").matches
      ? 0.45
      : w / 40;
  // console.log(M1Scale)

  const PhoneScale = window.matchMedia("(max-width: 768px)").matches
    ? 0.2
    : h / 130;

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

  return (
    <PresentationControls snap>
      <Suspense fallback={null}>
        <spotLight intensity={1} penumbra={0.6} position={[0, 0, 0]}>
          <group position={[0, -h / 3, 0]}>
            <directionalLight
              ref={keyLight}
              intensity={0.8}
              position={[0, 24, 6]}
            />
            <M1
              body={body}
              ref={screen}
              scale={M1Scale}
              rotation={[-Math.PI, -Math.PI / 2, 0]}
              position={[0, M1Height, -w / 3]}
            >
              <VideoMaterial mobile={false} {...props} />
            </M1>
            <Phone
              ref={phone}
              rotation={[0.5, -Math.PI, -0.3]}
              position={[-w / 2, -PhoneScale * 5, -4.5]}
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
