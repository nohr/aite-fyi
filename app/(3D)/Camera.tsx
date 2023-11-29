import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { Vector3 } from "three";

// import { Vector3 } from "three";
export default function Camera() {
  const [zoom, setZoom] = useState(8);
  const params = usePathname().split("/")[2];
  const { scene } = useThree();

  useEffect(() => {
    if (scene.children[1]) window.innerWidth < 768 ? setZoom(7) : setZoom(4);
  }, [scene.children]);

  useFrame(({ camera }) => {
    // const vec = new Vector3();
    // const pos = new Vector3();
    // if (width < 768) return;
    // window.onmousemove = (event) => {
    // vec.set(
    //   (event.clientX / window.innerWidth) * 2 - 1,
    //   -(event.clientY / window.innerHeight) * 2 + 1,
    //   0.5,
    // );
    // vec.unproject(camera);
    // vec.sub(camera.position).normalize();
    // const distance = -camera.position.z / vec.z;
    // pos.copy(camera.position).add(vec.multiplyScalar(distance));
    // console.log(pos.x);
    // camera.position.x = x ?? 0;
    // };

    // todo: zoom in on blur and quickly zoom out on focus

    window.onwheel = (e) => {
      !params &&
        setZoom((prev) =>
          Math.min(
            10,
            Math.max(1, prev + (e as globalThis.WheelEvent).deltaY / 10),
          ),
        );
    };

    if (params && zoom > -5) setZoom(-5);
    if (!params && zoom < 4) setZoom(4);

    camera.position.lerp(
      new Vector3(camera.position.x, camera.position.y, zoom),
      0.075,
    );
  });

  return <perspectiveCamera position={[0, 0, zoom]} far={80} near={0.1} />;
}
