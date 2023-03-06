import {
  // Float,
  Html,
  MeshTransmissionMaterial,
  PresentationControls,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { MutableRefObject } from "react";

export function Panel({ children, ...props }: any) {
  const config = {
    backside: true,
    samples: 4,
    resolution: 128,
    transmission: 0.5,
    roughness: 0.0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.0,
    thickness: 50,
    backsideThickness: 50,
    ior: 1.5,
    chromaticAberration: 0.1,
    anisotropy: 1,
    distortion: 0,
    distortionScale: 0.02,
    temporalDistortion: 0,
    attenuationDistance: 0.05,
    attenuationColor: props.hue,
    color: props.hue,
  };
  const {
    gl,
    viewport: { width: w, height: h },
  } = useThree();
  return (
    <PresentationControls>
      {/* <Float floatIntensity={props.float} rotationIntensity={0} speed={4}> */}
      <mesh {...props}>
        {/* <sphereBufferGeometry args={[3, 30, 30]} /> */}
        <boxBufferGeometry args={[w - 4, h - 4, 0.05]} />
        <MeshTransmissionMaterial {...config} toneMapped={false} />
        <Html
          transform
          as="div"
          castShadow // Make HTML cast a shadow
          receiveShadow
          portal={
            {
              current: gl.domElement.parentNode,
            } as MutableRefObject<HTMLElement>
          }
        >
          {children}
        </Html>
      </mesh>
      {/* </Float> */}
    </PresentationControls>
  );
}
