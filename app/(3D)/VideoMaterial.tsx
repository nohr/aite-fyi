import useLoading from "@hooks/useLoading";
import { useVideoTexture, Html } from "@react-three/drei";
import { usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { RiLoaderFill } from "react-icons/ri";
import { getVideoObjects } from "sanity.utils";
import { BackSide } from "three";
import { VideoObject } from "types/Project";

export function Texture({
  videoObjects,
  ...props
}: {
  videoObjects: VideoObject;
  mobile: boolean | null;
}) {
  const texture = useVideoTexture(videoObjects.url, {
    crossOrigin: "Anonymous",
    muted: true,
    loop: true,
    start: true,
    autoplay: true,
    playsInline: true,
    volume: 0,
  });
  texture.needsUpdate = true;

  texture.offset.y = props.mobile ? 0 : 0.006;
  texture.anisotropy = 16;

  return (
    <>
      {texture && (
        <meshBasicMaterial
          reflectivity={0}
          map={texture}
          toneMapped={false}
          side={props.mobile ? BackSide : undefined}
        />
      )}
    </>
  );
}

export function VideoMaterial({ ...props }: { mobile: boolean | null }) {
  const params = usePathname().split("/")[2];
  // console.log("rendered");
  const [videoObjects, setVideoObjects] = useState<VideoObject | undefined>();

  const getObjects = useCallback(async () => {
    const { VideoObjects } = await getVideoObjects(params);
    // console.log(VideoObjects);

    // set a new variable to the array object that contains the matching mobile value
    const videoObject = VideoObjects.find(
      (videoObject: VideoObject) => videoObject?.mobile === props.mobile,
    );
    // console.log(videoObject);

    setVideoObjects(videoObject);

    return () => {
      setVideoObjects(undefined);
    };
  }, [props.mobile, params]);

  useEffect(() => {
    getObjects();
  }, [getObjects]);

  // console.log(videoObjects);

  useLoading();

  return (
    <Suspense fallback={null}>
      {videoObjects?.url ? (
        <Texture videoObjects={videoObjects} {...props} />
      ) : (
        <Html transform as="div" center>
          <RiLoaderFill className="animate-spin" />
        </Html>
      )}
    </Suspense>
  );
}
