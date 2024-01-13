import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { Vector3 } from "three";
import { useUIStore } from "@hooks/useUIStore";

// import { Vector3 } from "three";
export default function Camera() {
  // const [zoom, setZoom] = useState(2);
  const zoom = useUIStore((s) => s.zoom);
  const params = usePathname().split("/")[2];
  const { scene } = useThree();
  const { setState } = useUIStore;

  useEffect(() => {
    if (scene.children[1])
      window.innerWidth < 768 ? setState({ zoom: 5 }) : setState({ zoom: 2 });
  }, [scene.children, setState]);

  function updateZoom(delta: number) {
    // !params &&
    // setZoom((prev) => Math.min(5, Math.max(-5, prev + delta)));
    setState((s) => ({ zoom: Math.min(5, Math.max(-5, s.zoom + delta)) }));
  }

  // const handlePinchZoom = (e: TouchEvent) => {
  //   if (e.touches.length > 1) {
  //     e.preventDefault();
  //     let previousDelta = 0;
  //     const currentDelta = e.touches[1].clientY - e.touches[0].clientY;
  //     // console.log(currentDelta);

  //     const deltaDifference = currentDelta - previousDelta;
  //     updateZoom(deltaDifference / 200);
  //     previousDelta = currentDelta;
  //   }
  // };

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

    // window.ontouchmove = (e) => {
    //   handlePinchZoom(e);
    // };

    // console.log(scene.children);

    window.onwheel = (e) => {
      updateZoom((e as globalThis.WheelEvent).deltaY / 10);
    };

    // if (zoom > -5) setZoom(-5);
    if (params === "eko-digital" && zoom < 2) setState({ zoom: 2 });
    if (!params && zoom < 2) setState({ zoom: 2 });
    if (camera.position.z === zoom) return;

    const newtarget = new Vector3(camera.position.x, camera.position.y, zoom);

    camera.position.lerp(newtarget, 0.075);
  });

  return (
    <>
      <perspectiveCamera position={[0, 0, zoom]} far={80} near={0.1} />
    </>
  );
}
