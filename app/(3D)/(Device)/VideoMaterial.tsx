// import { useUIStore } from "(ui)";
// import useLoading from "@hooks/useLoading";
import { useVideoTexture, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { RiLoaderFill } from "react-icons/ri";
import { getVideoObject } from "sanity.utils";
import { VideoObject } from "types/Project";

export function Texture({
  videoObject,
  ...props
}: {
  videoObject: VideoObject | undefined;
  mobile: boolean | null;
}) {
  const texture = useVideoTexture(videoObject?.url || "", {
    crossOrigin: "Anonymous",
    muted: true,
    loop: true,
    start: true,
    autoplay: false,
    playsInline: true,
    volume: 0,
  });

  const { gl } = useThree();
  texture.needsUpdate = true;
  texture.offset.y = props.mobile ? 0 : 0.006;
  texture.anisotropy = gl.capabilities.getMaxAnisotropy();

  // useLoading();

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return (
    <>
      {videoObject?.url && texture ? (
        <meshBasicMaterial
          reflectivity={0}
          map={texture}
          toneMapped={false}
          side={props.mobile ? 1 : undefined}
        />
      ) : (
        <Html
          as="div"
          transform
          rotation={props.mobile ? [Math.PI / 2, 0, 0] : [Math.PI / 2, 0, 0]}
          scale={props.mobile ? [0.07, 0.07, 0.07] : [1.2, 1.2, 1.2]}
          position={props.mobile ? [0, 0, 0.43] : [0, 0, -10]}
        >
          <RiLoaderFill className=" h-36 w-auto animate-spin" />
        </Html>
      )}
    </>
  );
}

export function VideoMaterial({ ...props }: { mobile: true | null }) {
  const params = usePathname().split("/")[2];
  const [videoObject, setVideoObject] = useState<VideoObject | undefined>();
  // const project = useUIStore((s) => s.project);

  // console.log(project);

  const getObject = useCallback(async () => {
    const videoObject = await getVideoObject(params, props.mobile);
    setVideoObject(videoObject);
  }, [props.mobile, params]);

  useEffect(() => {
    getObject();
    return () => {
      setVideoObject(undefined);
    };
  }, [getObject, params]);

  return (
    <Suspense fallback={null}>
      {videoObject && videoObject.url ? (
        <Texture videoObject={videoObject} {...props} />
      ) : (
        <>
          <meshBasicMaterial
            transparent
            opacity={0.2}
            color="black"
            side={props.mobile ? 1 : undefined}
          />
          <Html
            as="div"
            transform
            rotation={props.mobile ? [Math.PI / 2, 0, 0] : [Math.PI / 2, 0, 0]}
            scale={props.mobile ? [0.07, 0.07, 0.07] : [1.2, 1.2, 1.2]}
            position={props.mobile ? [0, 0, 0.43] : [0, 0, -10]}
          >
            <RiLoaderFill className=" h-36 w-auto animate-spin" />
          </Html>
        </>
      )}
    </Suspense>
  );
}
