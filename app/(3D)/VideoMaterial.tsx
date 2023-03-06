import { useUIStore } from "(ui)";
import { useVideoTexture, useTexture, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, Suspense, useEffect } from "react";
import { BackSide } from "three";

export function VideoMaterial({
  projects,
  mobile,
}: {
  projects: ProjectProps[];
  mobile: boolean;
}) {
  // console.log("rendered");
  const scroll = useScroll();
  const setLoading = useUIStore((state) => state.setLoading);
  const pages = 1 + projects.length;
  // change texture with scroll position
  const [project, setProject] = useState(0);
  useFrame(() => {
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
  texture.anisotropy = 1;
  const phoneLock = useTexture("/videos/mobile/lockscreen.jpeg");
  const M1Lock = useTexture("/videos/desktop/lockscreen.jpg");
  phoneLock.anisotropy = 16;
  M1Lock.anisotropy = 1;

  const vis = scroll.visible(1 / pages, projects.length / pages);
  // console.log(vis);

  useEffect(() => {
    console.log("loaded");
    setLoading(false);
  }, [setLoading]);

  return (
    <Suspense fallback={<FallbackMaterial />}>
      <meshLambertMaterial
        map={
          !vis
            ? !window.matchMedia("(max-width: 768px)").matches
              ? M1Lock
              : phoneLock
            : texture
        }
        toneMapped={false}
        side={mobile ? BackSide : undefined}
      />
    </Suspense>
  );
}

// fallback texture
function FallbackMaterial({ url = "/videos/fallback.png" }: { url?: string }) {
  console.log(url.includes("mobile"));

  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}
