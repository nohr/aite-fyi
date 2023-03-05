import { OrthographicCamera } from "@react-three/drei";
import { OrthographicCameraProps } from "@react-three/fiber";

export function Camera(props: OrthographicCameraProps) {
  return <OrthographicCamera {...props} makeDefault />;
}
