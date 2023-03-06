"use client";

import {
  // Html,
  // Loader,
  // Preload,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { memo, Suspense, useRef } from "react";
// import { VscLoading } from "react-icons/vsc";
import * as THREE from "three";
import { M1 } from "./M1";
import { Phone } from "./Phone";
import { VideoMaterial } from "./VideoMaterial";

const rsqw = (t: number, delta = 0.02, a = 1, f = 1 / (2 * Math.PI)) =>
  (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);

export const Device = memo(
  function Device({
    mobile,
    projects,
    home,
    setHome,
  }: {
    mobile: boolean | undefined;
    projects: ProjectProps[];
    home: boolean;
    setHome: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    const { width: w, height: h } = useThree((state) => state.viewport);
    const screen = useRef<THREE.Group>(null!);
    const body = useRef<THREE.Group>(null!);
    const phone = useRef<THREE.Group>(null!);
    const keyLight = useRef<THREE.DirectionalLight>(null!);
    const scroll = useScroll();

    // handle device sizing
    const M1Height = window.matchMedia("(max-width: 768px)").matches
      ? h / 4
      : -h / 12;
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
    // console.log(PhoneScale);

    const pages = 1 + projects.length;
    // Desktop
    useFrame((state, delta) => {
      const r1 = scroll.range(1 / pages, 1 / pages);
      const r3 = scroll.visible(1 / pages, projects.length / pages);
      setHome(r3);
      if (screen.current && body.current) {
        screen.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(r1);
        //   rotate body until its in view
        body.current.rotation.y += r3
          ? body.current.rotation.y > 0.2
            ? 0
            : (r1 - body.current.rotation.y / 2) * 0.07
          : (-Math.PI / 2 - body.current.rotation.y) * 0.01;

        body.current.rotation.x += r3
          ? body.current.rotation.x > 0
            ? 0
            : (r1 - body.current.rotation.x / 2) * 0.01
          : (-Math.PI / 7 - body.current.rotation.x) * 0.01;

        //  move body until its in view
        const posx = w - (scroll.offset * 140 * w) / 18;

        // console.log(posx);
        body.current.position.x =
          posx > 0 ? posx : r3 ? 0 : 0 + scroll.offset * 10;

        const posy = h - scroll.offset * 195;
        // console.log(posy);
        body.current.position.y =
          posy > M1Height
            ? posy
            : r3
            ? M1Height
            : M1Height + scroll.offset * 10;
      }
      if (phone.current) {
        //  move phone until its in view
        const posx = w - (scroll.offset * 140 * w) / 18;
        // console.log(phone.current.position.x);
        phone.current.position.x =
          posx > 0 ? posx : r3 ? 0 : 0 + scroll.offset * 10;
        //   rotate body until its in view
        phone.current.rotation.y += r3
          ? phone.current.rotation.y > 0
            ? 0
            : (r1 - phone.current.rotation.y / 2) * 0.07
          : (-Math.PI - phone.current.rotation.y) * 0.01;
        //   rotate body until its in view
        phone.current.rotation.x += r3
          ? phone.current.rotation.x > 0
            ? 0
            : (r1 - phone.current.rotation.x / 2) * 0.07
          : (-0.8 - phone.current.rotation.x) * 0.01;
      }

      //   move light
      keyLight.current?.position.set(
        0.25 + -15 * (1 - r1),
        4 + 11 * (1 - r1),
        3 + 2 * (1 - r1)
      );
    });

    return (
      <Suspense fallback={null}>
        {/* <Preload all /> */}
        <spotLight intensity={1} penumbra={0.9} position={[0, 0, 0]}>
          <group position={[0, -h / 3, 0]}>
            <directionalLight
              ref={keyLight}
              intensity={0.8}
              position={[0, 24, 6]}
            />
            {mobile === false ? (
              <M1
                body={body}
                ref={screen}
                scale={M1Scale}
                rotation={[-Math.PI / 7, -Math.PI / 2, 0]}
                position={[0, M1Height, -w / 2.625]}
              >
                <VideoMaterial mobile={false} projects={projects} />
              </M1>
            ) : null}
            {mobile ? (
              <Phone
                ref={phone}
                rotation={[-0.8, -Math.PI, 0]}
                position={[0, PhoneScale * 4, -w / 2.625]}
                scale={PhoneScale}
                frustumCulled={false}
              >
                <VideoMaterial mobile={true} projects={projects} />
              </Phone>
            ) : null}
          </group>
        </spotLight>
      </Suspense>
    );
  },
  (prev, next) => prev.mobile === next.mobile
);
