import React, { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function Camera() {
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    window.innerWidth < 768 ? setZoom(7) : setZoom(5);
  }, []);

  useFrame(({ camera, size: { width } }) => {
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

    window.onwheel = (e) => {
      setZoom((prev) =>
        Math.min(
          10,
          Math.max(1, prev + (e as globalThis.WheelEvent).deltaY / 10),
        ),
      );
    };
    camera.position.z = zoom;
  });

  return <perspectiveCamera position={[0, 0, zoom]} far={80} near={0.1} />;
}

export default Camera;
