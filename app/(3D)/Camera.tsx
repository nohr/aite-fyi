import React from "react";
import { useFrame } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { Vector3 } from "three";
import { useUIStore } from "@hooks/useUIStore";

export default function Camera() {
  // const [zoom, setZoom] = useState(2);
  const [zoom, camera] = useUIStore((s) => [s.zoom, s.camera]);
  const page = usePathname().split("/")[1];
  const params = usePathname().split("/")[2];
  const { setState } = useUIStore;

  // useEffect(() => {
  //   if (scene.children[1])
  //     window.innerWidth < 768 ? setState({ zoom: 2 }) : setState({ zoom: 2 });
  // }, [scene.children, setState]);

  function updateZoom(delta: number) {
    // !params &&
    // setZoom((prev) => Math.min(5, Math.max(-5, prev + delta)));
    setState((s) => ({
      zoom: Math.min(camera.max, Math.max(camera.min, s.zoom + delta)),
    }));
  }

  useFrame(({ camera }) => {
    // todo: fix scroll zoom
    window.onwheel = (e) => {
      if (params !== "eko-digital") return;
      updateZoom((e as globalThis.WheelEvent).deltaY / 10);
    };

    if (page === "" && camera.position.z !== 5) {
      setState({ zoom: 5 });
    }
    if (camera.position.z === zoom) return;

    camera.position.lerp(
      new Vector3(camera.position.x, camera.position.y, zoom),
      0.075,
    );
  });

  return (
    <>
      <perspectiveCamera position={[0, 0, zoom]} far={80} near={0.1} />
    </>
  );
}
