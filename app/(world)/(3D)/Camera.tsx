import { useWorldStore } from "(world)/useWorldStore";
import { PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { MotionValue, useScroll } from "framer-motion";
import { useRef } from "react";
import { mapLinear } from "three/src/math/MathUtils";

export function Camera({ ...props }) {
  const world_height = useWorldStore((state) => state.world_height);
  const world_width = useWorldStore((state) => state.world_width);
  const camera = useRef<PerspectiveCameraProps>(null);
  const { scale, rotateX, rotateY } = props.style as {
    scale: MotionValue<number>;
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
  };
  const scaleNow = useRef<number>(1);
  scale.on("change", (value) => (scaleNow.current = value));
  const pos = useRef({
    x: 0,
    y: 0,
  });
  const { scrollX, scrollY } = useScroll();
  scrollX.on("change", (value) => {
    pos.current.x = mapLinear(
      value / document.documentElement.clientWidth / 2,
      0,
      1,
      -12,
      12
    );
  });
  scrollY.on("change", (value) => {
    pos.current.y = mapLinear(
      value / document.documentElement.clientHeight / 2,
      0,
      1,
      -8,
      8
    );
  });
  const rot = useRef({
    x: 0,
    y: 0,
  });
  rotateX.on("change", (value) => (rot.current.x = value));
  rotateY.on("change", (value) => (rot.current.y = value));

  useFrame(({ camera }, delta) => {
    // console.log(rot.current.x, rot.current.y);
    //   convert to radians
    const radx = rot.current.x * (Math.PI / 180);
    const rady = rot.current.y * (Math.PI / 180);
    //   const
    // const origin = document.getElementById("world")?.style.transformOrigin;
    // console.log(camera.position);
    //   get point of the canvas at the origin
    //   const originPoint = new THREE.Vector3(0, 0, 0);
    //   originPoint.project(camera);
    // console.log(camera.children[0].);

    // camera.lookAt(camera.position.x, 0, camera.position.z);
    // console.log(radx, rady);

    camera.rotation.fromArray([-Math.PI / 2 - radx, 0 - rady * 2, 0]);
    //   camera.
    // camera.rotation.fromArray([-Math.PI / 2, -radx, 0]);
    // camera.rotateX(rot.current.x);
    // camera.rotateY(rot.current.y);
    camera.position.fromArray([
      pos.current.x * Math.pow(scaleNow.current, 4),
      7 / scaleNow.current + radx * 12,
      pos.current.y * Math.pow(scaleNow.current, 4) - radx * 14,
    ]);
  });

  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      fov={80}
      aspect={innerWidth / innerHeight}
      ref={camera}
    />
  );
}
