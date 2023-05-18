/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useUIStore } from "(ui)";
import { useFrame, useLoader } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { PointsMaterial } from "three/src/materials/PointsMaterial";
import { Color } from "three/src/math/Color";
import { Points } from "three/src/objects/Points";

export function Scan({ ...props }: JSX.IntrinsicElements["group"]) {
  const head = useLoader(PCDLoader, "/models/head.pcd");
  const body = useLoader(PCDLoader, "/models/body.pcd");
  const headRef = useRef<Points>(null!);
  const bodyRef = useRef<Points>(null!);
  const groupRef = useRef<Group>(null!);
  const [color, setColor] = useState<Color>(new Color("#000000"));
  const mod = 3.2;
  const theme = useUIStore((s) => s.theme);

  const listener = useCallback(() => {
    let arc: Color | string = getComputedStyle(document.documentElement)
      .getPropertyValue(
        theme === "dark"
          ? "--arc-palette-foregroundSecondary"
          : "--arc-palette-maxContrastColor"
      )
      .slice(0, -2)
      .toLocaleLowerCase();
    arc = new Color(parseInt(arc.replace("#", "0x"), 16));
    setColor(arc);
  }, [theme]);

  useEffect(() => {
    listener();
  }, [listener]);

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
    headRef.current?.lookAt(target.x, target.y - 1.5, target.z);
    bodyRef.current?.lookAt(target.x * 0.25, target.y / 2, 4);
    // animate the group ref position so that it oscillates between 0.1 and -0.1 on the y axis
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

  const mat = useMemo(
    () =>
      new PointsMaterial({
        size: 0.001,
        fog: true,
        color,
        toneMapped: false,
      }),
    [color]
  );

  return (
    <group
      {...props}
      ref={groupRef}
      position={[0, 0, -2]}
      rotation={[0, Math.PI / 2, 0]}
      scale={0.17}
    >
      <points ref={headRef} geometry={head.geometry} material={mat} />
      <points ref={bodyRef} geometry={body.geometry} material={mat} />
    </group>
  );
}
