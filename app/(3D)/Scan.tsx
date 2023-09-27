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

export function Scan({ ...props }: JSX.IntrinsicElements["group"]) {
  const { size } = useThree();
  const head = useLoader(PCDLoader, "/models/head.pcd");
  const body = useLoader(PCDLoader, "/models/body.pcd");
  const headRef = useRef<Points>(null!);
  const bodyRef = useRef<Points>(null!);
  const groupRef = useRef<Group>(null!);
  const [color, setColor] = useState<Color | string>(new Color("#373737"));
  const theme = useUIStore((s) => s.theme);

  const hexToHsl = (H: string) => {
    // Convert hex to RGB first
    let r = 0,
      g = 0,
      b = 0;
    if (H.length === 4) {
      r = parseInt("0x" + H[1] + H[1]);
      g = parseInt("0x" + H[2] + H[2]);
      b = parseInt("0x" + H[3] + H[3]);
    } else if (H.length === 7) {
      r = parseInt("0x" + H[1] + H[2]);
      g = parseInt("0x" + H[3] + H[4]);
      b = parseInt("0x" + H[5] + H[6]);
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    const cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin;
    let h = 0,
      s = 0,
      l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;

    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);

    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
  };
  useEffect(() => {
    const dark = getComputedStyle(document.documentElement)
      .getPropertyValue("--arc-palette-foregroundSecondary")
      .slice(0, -2)
      .toLocaleLowerCase();

    const light = getComputedStyle(document.documentElement)
      .getPropertyValue("--arc-palette-title")
      .slice(0, -2)
      .toLocaleLowerCase();

    const arc = theme === "dark" ? dark : light;
    console.log(theme);
    console.log(hexToHsl(arc));

    // setColor(new Color(hexToHsl(arc)));
  }, [theme]);

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

  // console.log(color);

  const mat = useMemo(
    () =>
      new PointsMaterial({
        size: 1,
        fog: false,
        color,
        toneMapped: false,
        opacity: 1,
        sizeAttenuation: false,
      }) as PointsMaterial & { color: ColorRepresentation },
    [color]
  );

  return (
    <group
      {...props}
      ref={groupRef}
      position={[0, size.width > 768 ? 0 : 4, -2]}
      rotation={[0, Math.PI / 2, 0]}
      scale={size.width > 768 ? 0.17 : 0.1}
    >
      <points ref={headRef} geometry={head.geometry} material={mat} />
      <points ref={bodyRef} geometry={body.geometry} material={mat} />
    </group>
  );
}
