import { useUIStore } from "(ui)";
import { useVideoTexture, useTexture, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, Suspense, useEffect, memo } from "react";
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
      <meshLambertMaterial
        flatShading
        reflectivity={0}
        map={!visible ? (!mobile ? M1Lock : phoneLock) : texture}
        toneMapped={false}
        side={mobile ? BackSide : undefined}
      />
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
