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
          ? "--arc-palette-subtitle"
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

  useFrame(({ mouse }) => {
    const target = new Vector3((mouse.x * mod * 2) / 1, mouse.y * mod, 0.5);
    headRef.current?.lookAt(target.x, target.y - 1.5, target.z);
    bodyRef.current?.lookAt(target.x * 0.25, target.y / 2, 4);

    // animate the group ref position so that it oscillates between 0.1 and -0.1 on the y axis
    groupRef.current.position.y = Math.sin(Date.now() / 1000) / 10;
  });

  const mat = useMemo(
    () =>
      new PointsMaterial({
        size: 0.001,
        fog: true,
        color,
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
