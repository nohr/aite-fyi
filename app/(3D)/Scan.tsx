export const dynamic = "force-dynamic";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { memo, useRef } from "react";
import { Group, Vector2, Vector3 } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { PointsMaterial } from "three/src/materials/PointsMaterial";
import { Points } from "three/src/objects/Points";
import useColor from "@hooks/useColor";
import useLoading from "@hooks/useLoading";
import { usePathname } from "next/navigation";
import { useUIStore } from "@hooks/useUIStore";

export const Scan = memo(function Scan() {
  const { size } = useThree();
  const [head, body] = useLoader(PCDLoader, [
    "/models/head.pcd",
    "/models/body.pcd",
  ]);
  const headRef = useRef<Points>(null);
  const bodyRef = useRef<Points>(null);
  const groupRef = useRef<Group>(null);
  const { color } = useColor();
  const pathname = usePathname();
  const mod = 3.2;
  const showTabs = useUIStore((s) => s.showTabs);

  const handleMouseMove = (mouse: Vector2) => {
    const tar = new Vector3((mouse.x * mod * 2) / 1, mouse.y * mod, 3);

    headRef.current?.lookAt(tar.x, tar.y - 1.5, tar.z);
    bodyRef.current?.lookAt(tar.x * 0.25, tar.y / 2, 4);
  };

  const handleBreath = () => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(Date.now() / 1500) / 10;
  };

  useFrame(({ pointer, scene }) => {
    if (!groupRef.current) return;

    if (pathname !== "/" || showTabs) {
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
      position={[size.width >= 768 ? 6 : 4, 70, -3.5]}
      rotation={[0, 0, 0]}
      scale={0.25}
      name="scan"
    >
      <points ref={headRef} geometry={head.geometry} material={mat} />
      <points ref={bodyRef} geometry={body.geometry} material={mat} />
    </group>
  );
});
