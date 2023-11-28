export const dynamic = "force-dynamic";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { memo, useEffect, useRef } from "react";
import { ColorRepresentation, Group, Vector2, Vector3 } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { PointsMaterial } from "three/src/materials/PointsMaterial";
import { Points } from "three/src/objects/Points";
import { mod } from "../../utils/constants";
import { useAudioStore } from "@hooks/useAudioStore";
import useColor from "@hooks/useColor";
import { usePathname } from "next/navigation";
import { useUIStore } from "(ui)";
import useLoading from "@hooks/useLoading";

export const Scan = memo(function Scan() {
  const { size } = useThree();
  const head = useLoader(PCDLoader, "/models/head.pcd");
  const body = useLoader(PCDLoader, "/models/body.pcd");
  const headRef = useRef<Points>(null!);
  const bodyRef = useRef<Points>(null!);
  const groupRef = useRef<Group>(null!);
  const [song, playing] = useAudioStore((s) => [s.song, s.playing]);
  const color = useColor();
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

  const getTarget = (mouse: Vector2) => {
    const pos = new Vector3((mouse.x * mod * 2) / 1, mouse.y * mod, 0.5);
    // head bobbing
    const bobDelta = () => {
      const audio = document.querySelector("audio") as HTMLAudioElement;
      if (!audio || !song || !playing || !song.tempo || audio.currentTime === 0)
        return 0;
      if (song.name === "cemetery c" && audio.currentTime < 38) return 0;

      return Math.sin(Date.now() / song.tempo) / 5;
    };

    pos.y += bobDelta();

    return pos;
  };

  const handleMouseMove = (mouse: Vector2) => {
    const target = getTarget(mouse);
    headRef.current?.lookAt(target.x, target.y - 1.5, target.z);
    bodyRef.current?.lookAt(target.x * 0.25, target.y / 2, 4);
  };

  useFrame(({ mouse }) => {
    handleMouseMove(mouse);

    // animate breathing
    if (groupRef.current)
      groupRef.current.position.y = Math.sin(Date.now() / 1000) / 10;

    // todo: zoom in on blur and quickly zoom out on focus
  });

  useLoading();

  const mat = new PointsMaterial({
    size: size.width > 768 ? 0.7 : size.width < 450 ? 0.2 : 0.75,
    fog: false,
    color: color,
    toneMapped: true,
    opacity: 1,
    sizeAttenuation: false,
  });

  const { width: w } = useThree((state) => state.viewport);

  const params = usePathname().split("/")[2];
  if (params) return null;
  return (
    <group
      ref={groupRef}
      position={[0, size.width > 768 ? 70 : w / 2, -3.5]}
      rotation={[0, Math.PI / 2, 0]}
      scale={0.25}
    >
      <ambientLight intensity={7} position={[0, 0, 100]} />
      <points ref={headRef} geometry={head.geometry} material={mat} />
      <points ref={bodyRef} geometry={body.geometry} material={mat} />
    </group>
  );
});
