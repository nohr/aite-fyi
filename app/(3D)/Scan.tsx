export const dynamic = "force-dynamic";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { memo, useRef } from "react";
import { Group, Vector2, Vector3 } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { PointsMaterial } from "three/src/materials/PointsMaterial";
import { Points } from "three/src/objects/Points";
import { mod } from "../../utils/constants";
// import { useAudioStore } from "@hooks/useAudioStore";
import useColor from "@hooks/useColor";
import useLoading from "@hooks/useLoading";
import { usePathname } from "next/navigation";

export const Scan = memo(function Scan() {
  const { size } = useThree();
  const [head, body] = useLoader(PCDLoader, [
    "/models/head.pcd",
    "/models/body.pcd",
  ]);
  const headRef = useRef<Points>(null);
  const bodyRef = useRef<Points>(null);
  const groupRef = useRef<Group>(null);
  // const [song, playing] = useAudioStore((s) => [s.song, s.playing]);
  const { color } = useColor();
  // const project = usePathname().split("/")[2];
  const project = usePathname().split("/")[1] === "projects";

  const handleMouseMove = (mouse: Vector2) => {
    const tar = new Vector3((mouse.x * mod * 2) / 1, mouse.y * mod, 3);
    // const bobDelta = () => {
    //   const audio = document.querySelector("audio") as HTMLAudioElement;
    //   if (!audio || !song || !playing || !song.tempo || audio.currentTime === 0)
    //     return 0;
    //   // if (song.name === "cemetery c" && audio.currentTime < 38) return 0;
    //   const del = Math.abs(Math.sin(audio.currentTime * (500 / song.tempo)));
    //   // console.log(del);
    //   return del;
    // };

    headRef.current?.lookAt(tar.x, tar.y - 1.5, tar.z);
    bodyRef.current?.lookAt(tar.x * 0.25, tar.y / 2, 4);
  };

  const handleHorizontalSway = (pointer: Vector2) => {
    groupRef.current?.position.lerp(
      new Vector3(
        -pointer.x * 5.75,
        groupRef.current?.position.y,
        groupRef.current?.position.z,
      ),
      0.2,
    );
  };

  const handleBreath = () => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(Date.now() / 1000) / 10;
  };

  useFrame(({ pointer, scene }) => {
    if (!groupRef.current) return;

    if (project) {
      groupRef.current.position.lerp(
        new Vector3(
          groupRef.current.position.x,
          groupRef.current.position.y,
          6,
        ),
        0.05,
      );
      setTimeout(() => {
        if (groupRef.current) {
          groupRef.current.visible = false;
          scene.remove(groupRef.current);
        }
      }, 750);
      return;
    } else {
      scene.add(groupRef.current);
      if (groupRef.current.position.z > -3.5) {
        groupRef.current.position.lerp(
          new Vector3(
            groupRef.current.position.x,
            groupRef.current.position.y,
            -3.5,
          ),
          0.05,
        );
      }
      groupRef.current.visible = true;
    }

    window.ontouchmove = (e) => {
      if (e.touches.length == 2) return;
    };

    handleMouseMove(pointer);
    handleHorizontalSway(pointer);

    handleBreath();
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
      position={[0, 70, -3.5]}
      rotation={[0, 0, 0]}
      scale={0.25}
    >
      <points ref={headRef} geometry={head.geometry} material={mat} />
      <points ref={bodyRef} geometry={body.geometry} material={mat} />
    </group>
  );
});
