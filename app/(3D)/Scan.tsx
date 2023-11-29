export const dynamic = "force-dynamic";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { memo, useRef } from "react";
import { Group, Vector2, Vector3 } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { PointsMaterial } from "three/src/materials/PointsMaterial";
import { Points } from "three/src/objects/Points";
import { mod } from "../../utils/constants";
import { useAudioStore } from "@hooks/useAudioStore";
import useColor from "@hooks/useColor";
import { usePathname } from "next/navigation";
import useLoading from "@hooks/useLoading";

export const Scan = memo(function Scan() {
  const { size } = useThree();
  const [head, body] = useLoader(PCDLoader, [
    "/models/head.pcd",
    "/models/body.pcd",
  ]);
  const headRef = useRef<Points>(null);
  const bodyRef = useRef<Points>(null);
  const groupRef = useRef<Group>(null);
  const [song, playing] = useAudioStore((s) => [s.song, s.playing]);
  const { color } = useColor();

  const getTarget = (mouse: Vector2) => {
    const pos = new Vector3((mouse.x * mod * 2) / 1, mouse.y * mod, 3);
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

  useFrame(({ pointer }) => {
    handleMouseMove(pointer);

    if (groupRef.current)
      groupRef.current.position.lerp(
        new Vector3(
          -pointer.x * 2.5,
          groupRef.current.position.y,
          groupRef.current.position.z,
        ),
        0.2,
      );

    // animate breathing
    if (groupRef.current)
      groupRef.current.position.y = Math.sin(Date.now() / 1000) / 10;
  });

  useLoading();

  const { width: w, height: h } = useThree((state) => state.viewport);

  const params = usePathname().split("/")[2];
  if (params) return null;

  const mat = new PointsMaterial({
    size: size.width > 768 ? 0.65 : size.width < 450 ? 0.2 : 0.75,
    fog: false,
    color: color,
    toneMapped: false,
    opacity: 1,
    sizeAttenuation: false,
  });

  return (
    <group
      ref={groupRef}
      position={[0, size.width > 768 ? 70 : w / 2, -3.5]}
      rotation={[0, Math.PI / 2, 0]}
      scale={0.25}
    >
      {/* <Point position={[0, 0, 0]} /> */}
      <points ref={headRef} geometry={head.geometry} material={mat} />
      <points ref={bodyRef} geometry={body.geometry} material={mat} />
    </group>
  );
});
