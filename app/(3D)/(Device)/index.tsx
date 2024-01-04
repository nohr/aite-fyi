/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

// import { PresentationControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
// import { DirectionalLight } from "three/src/lights/DirectionalLight";
import { Group } from "three/src/objects/Group";
import { M1 } from "./M1";
import { Phone } from "./Phone";
import { VideoMaterial } from "./VideoMaterial";
import { useUIStore } from "(ui)";
import { usePathname } from "next/navigation";

// const rsqw = (t: number, delta = 0.02, a = 1, f = 1 / (2 * Math.PI)) =>
//   (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);

export const Device = function Device() {
  const {
    size: { width: w },
  } = useThree();
  const screen = useRef<Group>(null);
  const m1 = useRef<Group>(null);
  const body = useRef<Group>(null);
  const phone = useRef<Group>(null);
  const project = useUIStore((s) => s.project);
  const params = usePathname().split("/")[2];

  const hide_devices = project?.medium !== "website";
  const groupRef = useRef<Group>(null);

  useFrame(({ pointer }) => {
    if (hide_devices) {
      return;
    }

    // init animation
    // if (screen.current && body.current) {
    //   screen.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(0.5);
    //   if (body.current.rotation.y < 0)
    //     body.current.rotation.y += (body.current.rotation.y / -2) * 0.07;
    //   if (body.current.rotation.x < 0)
    //     body.current.rotation.x += (body.current.rotation.x / -2) * 0.1;
    // }
    // if (phone.current) {
    //   if (phone.current.rotation.x < 0)
    //     phone.current.rotation.x +=
    //       (0.5 - phone.current.rotation.y / 2) * 0.035;
    // }

    // mouse tracking
    const mod = w >= 768 ? 0.8 : 2;
    m1.current?.lookAt(new Vector3(pointer.x * 2 * 0.1 - 1, pointer.y, 10));
    phone.current?.lookAt(new Vector3(pointer.x + 5, pointer.y, 10));

    m1.current?.position.lerp(
      new Vector3(pointer.x * 4.4 + 2, pointer.y * mod + 2, 0),
      0.06,
    );
    phone.current?.position.lerp(
      new Vector3(pointer.x * 4.4 - 3, pointer.y * mod + 2.5, 0),
      0.08,
    );
  });

  if (hide_devices || !params) return null;

  return (
    <>
      {hide_devices ? null : (
        <group
          ref={groupRef}
          scale={w >= 768 ? (w / 500 > 1.5 ? 1.5 : w / 500) : w / 500}
          position={[0, w >= 768 ? -8 : -6, -8]}
        >
          <group ref={m1}>
            <M1
              body={body}
              ref={screen}
              scale={0.35}
              rotation={[0, 0, 0]}
              // rotation={[-Math.PI, -Math.PI, 0]}
              position={[0, -1, 0]}
            >
              <VideoMaterial mobile={null} />
            </M1>
          </group>
          <Phone
            ref={phone}
            rotation={[0.25, 0, 0.15]}
            position={[0, 0, 0]}
            scale={0.05}
            frustumCulled={false}
          >
            <VideoMaterial mobile />
          </Phone>
        </group>
      )}
    </>
  );
};
