import useLoading from "@hooks/useLoading";
import { useVideoTexture, Html } from "@react-three/drei";
import { usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { RiLoaderFill } from "react-icons/ri";
import { getVideoObject } from "sanity.utils";
import { BackSide } from "three";
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

  texture.needsUpdate = true;
  texture.offset.y = props.mobile ? 0 : 0.006;
  texture.anisotropy = 16;

  useLoading();

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
          side={props.mobile ? BackSide : undefined}
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

  const getObject = useCallback(async () => {
    const videoObject = await getVideoObject(params, props.mobile);
    setVideoObject(videoObject);
  }, [props.mobile, params]);

  useEffect(() => {
    getObject();
    return () => {
      setVideoObject(undefined);
    };
  }, [getObject]);

  return (
    <Suspense fallback={null}>
      {videoObject?.url ? (
        <Texture videoObject={videoObject} {...props} />
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
    </Suspense>
  );
}
