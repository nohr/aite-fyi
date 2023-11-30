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
  const params = usePathname().split("/")[2];
  const { width: w } = useThree((state) => state.viewport);

  const handleMouseMove = (mouse: Vector2) => {
    const tar = new Vector3((mouse.x * mod * 2) / 1, mouse.y * mod, 3);
    // head bobbing
    const bobDelta = () => {
      const audio = document.querySelector("audio") as HTMLAudioElement;
      if (!audio || !song || !playing || !song.tempo || audio.currentTime === 0)
        return 0;
      if (song.name === "cemetery c" && audio.currentTime < 38) return 0;

      return Math.sin(Date.now() / song.tempo) / 10;
    };

    headRef.current?.lookAt(tar.x, (tar.y += bobDelta() - 1.5), tar.z);
    bodyRef.current?.lookAt(tar.x * 0.25, tar.y / 2, 4);
  };

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;

    if (params) {
      setTimeout(() => {
        if (groupRef.current) groupRef.current.visible = false;
      }, 500);
      return;
    } else {
      groupRef.current.visible = true;
    }

    handleMouseMove(pointer);

    // horizontal sway
    groupRef.current.position.lerp(
      new Vector3(
        -pointer.x * 5.75,
        groupRef.current.position.y,
        groupRef.current.position.z,
      ),
      0.2,
    );

    // breathing
    groupRef.current.position.y = Math.sin(Date.now() / 1000) / 10;
  });

  useLoading();

  const mat = new PointsMaterial({
    size: size.width >= 768 ? 0.65 : size.width < 450 ? 0.2 : 0.75,
    fog: false,
    color: color,
    toneMapped: false,
    opacity: 1,
    sizeAttenuation: false,
  });

  return (
    <group
      ref={groupRef}
      position={[0, size.width >= 768 ? 70 : w / 2, -3.5]}
      rotation={[0, Math.PI / 2, 0]}
      scale={0.25}
    >
      <points ref={headRef} geometry={head.geometry} material={mat} />
      <points ref={bodyRef} geometry={body.geometry} material={mat} />
    </group>
  );
});
