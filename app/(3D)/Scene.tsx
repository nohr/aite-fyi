import { Html, useProgress } from "@react-three/drei";
import { Suspense } from "react";
import { Scan } from "./Scan";
import { EkoDigital } from "./EkoDigital";
import { usePathname } from "next/navigation";
import { Env } from "./Environment";
import { useFrame } from "@react-three/fiber";
// import { Perf } from "r3f-perf";

function Scene() {
  const { progress } = useProgress();
  const pathname = usePathname();

  useFrame((state) => {
    if (state.scene.children.length < 2 && state.frameloop === "always") {
      // wait 500ms before switching to demand
      setTimeout(() => {
        state.setFrameloop("demand");
      }, 500);
    } else if (
      state.scene.children.length > 1 &&
      state.frameloop === "demand"
    ) {
      state.setFrameloop("always");
    }
  });

  return (
    <Suspense fallback={<Html center>{progress.toFixed(0)}%</Html>}>
      <Scan />
      {pathname === "/eko-digital" ? (
        <>
          <EkoDigital />
          <Env />
        </>
      ) : null}

      {/* {process.env.NODE_ENV === "development" ? (
        <Perf className="!absolute !bottom-2 !left-auto !right-2 !top-auto z-[99] !hidden  md:!block" />
      ) : null} */}
    </Suspense>
  );
}

export default Scene;
