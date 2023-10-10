/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useUIStore } from "(ui)";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { ColorRepresentation, Group, RGBAFormat, Vector3 } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { PointsMaterial } from "three/src/materials/PointsMaterial";
import { Color } from "three/src/math/Color";
import { Points } from "three/src/objects/Points";
import { mod } from "../../utils/constants";
import { useAudioStore } from "@hooks/useAudioStore";

export function Scan({ ...props }: JSX.IntrinsicElements["group"] & { color: ColorRepresentation }) {

  if (!props.color) return null;
  const { size } = useThree();
  const head = useLoader(PCDLoader, "/models/head.pcd");
  const body = useLoader(PCDLoader, "/models/body.pcd");
  const headRef = useRef<Points>(null!);
  const bodyRef = useRef<Points>(null!);
  const groupRef = useRef<Group>(null!);
  const [song, playing] = useAudioStore((s) => [s.song, s.playing]);
  // console.log(song, playing);
  

  // todo events
  // let animating = false;
  // function Idle(body: Points, group: Group) {
  //   groupRef.current.position.y = Math.sin(Date.now() / 1000) / 10;
  //   const followTarget = new Vector3(
  //     body.position.x,
  //     body.position.y,
  //     body.position.z + 10
  //   );
  //   const target = new Vector3(
  //     body.position.x,
  //     body.position.y,
  //     body.position.z + 10
  //   );

  //   body.lookAt(target);
  //   target.lerp(followTarget, 0.1);
  //   const raiseHead = setInterval(() => {
  //     headRef.current?.lookAt(0, 0, 0);
  //   }, 1000);
  //   // const lowerHead = setInterval(() => {
  //   //   headRef.current?.lookAt(0, 0, 0);
  //   // }, 1000);

  //   setTimeout(() => {
  //     clearInterval(raiseHead);
  //     // clearInterval(lowerHead);
  //     animating = false;
  //   }, 15000);
  // }

  useFrame(({ mouse }) => {
    const target = new Vector3((mouse.x * mod * 2) / 1, mouse.y * mod, 0.5);
    // if (!animating) {
    let y = target.y;
    if (playing &&song?.tempo) {
      let del = Math.sin(Date.now() / (song.tempo)) / 5;
      // console.log(del);
      y = y + del;
    }
    
    headRef.current?.lookAt(target.x, y - 1.5, target.z);
    bodyRef.current?.lookAt(target.x * 0.25, y / 2, 4);
    // animate the group ref position so that it oscillates between 0.1 and -0.1 on the y axis
    if (groupRef.current)
    groupRef.current.position.y = Math.sin(Date.now() / 1000) / 10;
    // }

    // todo make an idle target for when the mouse is not moving or out of the canvas
    // wait 10 seconds and then call the idle function to make the head and body look at the camera

    // clearTimeout(idle);
  });

  // const idle = setTimeout(() => {
  //   // console.log("idle");
  //   animating = true;
  //   Idle(bodyRef.current, groupRef.current);
  // }, 10000);

  // console.log(props.color);

  const mat = useMemo(
    () =>
      new PointsMaterial({
        size: size.width > 768 ? 0.7 :size.width < 450 ? 0.2 : 0.75, 
        fog: false,
        color:props.color,
        // toneMapped: false,
        opacity: 1,
        sizeAttenuation: false,
      }) as PointsMaterial & { color: ColorRepresentation },
    [props.color]
  );

  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <group
      {...props}
      ref={groupRef}
      position={[0, size.width > 768 ? 70 : w/2, -3.5]}
      rotation={[0, Math.PI / 2, 0]}
      scale={size.width > 768 ? 0.25 : 0.25}
    >

      <ambientLight intensity={7}  position={[0, 0, 100]}/>
      <points ref={headRef} geometry={head.geometry} material={mat} />
      <points ref={bodyRef} geometry={body.geometry} material={mat} />
    </group>
  );
}
