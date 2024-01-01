import React, { MutableRefObject, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { Vector3 } from "three";
import {
  Bloom,
  DepthOfField,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

// import { Vector3 } from "three";
export default function Camera() {
  const [zoom, setZoom] = useState(2);
  const params = usePathname().split("/")[2];
  const { scene } = useThree();

  console.log(zoom);

  useEffect(() => {
    if (scene.children[1]) window.innerWidth < 768 ? setZoom(4) : setZoom(2);
  }, [scene.children]);

  function updateZoom(delta: number) {
    // !params &&
    setZoom((prev) => Math.min(5, Math.max(-5, prev + delta)));
  }

  const handlePinchZoom = (e: TouchEvent) => {
    if (e.touches.length > 1) {
      e.preventDefault();
      let previousDelta = 0;
      const currentDelta = e.touches[1].clientY - e.touches[0].clientY;
      // console.log(currentDelta);

      const deltaDifference = currentDelta - previousDelta;
      updateZoom(deltaDifference / 200);
      previousDelta = currentDelta;
    }
  };

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

    // document.ontouchmove = (e) => {
    //   if (e.touches.length > 1) {
    //   e.preventDefault();
    //     // let previousDelta = 0;
    //     // const currentDelta = e.touches[0].clientY - e.touches[1].clientY;
    //     // console.log(currentDelta);

    //     // const deltaDifference = currentDelta - previousDelta;
    //     // updateZoom(deltaDifference / 10);
    //     // previousDelta = currentDelta;
    //   }
    // };

    // document.addEventListener("touchmove", handlePinchZoom, {
    //   passive: false,
    // });

    window.ontouchmove = (e) => {
      handlePinchZoom(e);
    };

    window.onwheel = (e) => {
      updateZoom((e as globalThis.WheelEvent).deltaY / 10);
    };

    // if (zoom > -5) setZoom(-5);
    if (params === "eko-digital" && zoom < 2) setZoom(2);
    if (!params && zoom < 2) setZoom(2);
    if (camera.position.z === zoom) return;

    const newtarget = new Vector3(camera.position.x, camera.position.y, zoom);

    camera.position.lerp(newtarget, 0.075);
  });

  return (
    <>
      <perspectiveCamera position={[0, 0, zoom]} far={80} near={0.1} />
      <Bloom luminanceThreshold={0.1} luminanceSmoothing={9} height={300} />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </>
  );
}
