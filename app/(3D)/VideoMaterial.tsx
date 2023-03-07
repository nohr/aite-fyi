import { useUIStore } from "(ui)";
import {
  useVideoTexture,
  useTexture,
  useScroll,
  Html,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useState, Suspense, useEffect, memo, MutableRefObject } from "react";
import { BackSide } from "three";

export function VideoMaterial({
  setLoading,
  projects,
  mobile,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  projects: ProjectProps[];
  mobile: boolean;
}) {
  // console.log("rendered");
  const scroll = useScroll();

  const pages = 1 + projects.length;
  // change texture with scroll position
  const [project, setProject] = useState(0);
  const [visible, setVisible] = useState(false);
  useFrame(() => {
    setVisible(scroll.visible(1 / pages, pages / pages));
    let num = Math.floor(scroll.offset * pages - 1);
    num = num > projects.length - 1 ? projects.length - 1 : num < 0 ? 0 : num;
    setProject(num);
  });

  const texture = useVideoTexture(
    projects[project][mobile ? "mobile" : "desktop"],
    {
      // unsuspend: "canplay",
      crossOrigin: "Anonymous",
      muted: true,
      loop: true,
      start: true,
    }
  );
  // texture.needsUpdate = true;

  texture.offset.y = mobile ? 0 : 0.006;
  texture.anisotropy = 16;
  const phoneLock = useTexture("/videos/mobile/lockscreen.jpeg");
  const M1Lock = useTexture("/videos/desktop/lockscreen.jpg");
  phoneLock.anisotropy = 1;
  M1Lock.anisotropy = 1;

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <Suspense fallback={null}>
      <meshBasicMaterial
        reflectivity={0}
        map={!visible ? (!mobile ? M1Lock : phoneLock) : texture}
        toneMapped={false}
        side={mobile ? BackSide : undefined}
      />
      {/* <Html
        transform
        as="div"
        occlude="raycast"
        wrapperClass=" [&>*]:!pointer-events-none w-full h-full"
        scale={1.3}
        position={mobile ? [0, 0, 0] : [0, -0.8, -12]}
        rotation={mobile ? [0, 0, 0] : [Math.PI / 2, Math.PI, Math.PI]}
        portal={
          {
            current: gl.domElement.parentNode,
          } as MutableRefObject<HTMLElement>
        }
      >
        <video
          src={projects[project][mobile ? "mobile" : "desktop"]}
          className=" pointer-events-none"
          autoPlay
          muted
        />
      </Html> */}
    </Suspense>
  );
}

// / fallback texture
function FallbackMaterial({
  mobile,
  M1Lock,
  phoneLock,
}: {
  mobile: boolean;
  M1Lock: THREE.Texture;
  phoneLock: THREE.Texture;
}) {
  return (
    <meshBasicMaterial map={!mobile ? M1Lock : phoneLock} toneMapped={false} />
  );
}
