// import { useUIStore } from "(ui)";
import { useVideoTexture, Html } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { getVideoObjects } from "sanity.utils";
import { BackSide } from "three";
import { VideoObject } from "types/Project";

export function Texture({
  videoObjects,
  ...props
}: {
  videoObjects: VideoObject;
  params: string[];
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

export function VideoMaterial({
  ...props
}: {
  params: string[];
  mobile: boolean | null;
}) {
  // console.log("rendered");
  // const setLoading = useUIStore((state) => state.setLoading);
  const [videoObjects, setVideoObjects] = useState<VideoObject | undefined>();

  const getObjects = useCallback(async () => {
    const { VideoObjects } = await getVideoObjects(props.params[0]);
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
  }, [props.mobile, props.params]);

  useEffect(() => {
    getObjects();
  }, [getObjects]);

  // console.log(videoObjects);

  // useEffect(() => {
  //   setLoading(false);
  // }, [setLoading]);

  return (
    <Suspense fallback={null}>
      {videoObjects?.url ? (
        <Texture videoObjects={videoObjects} {...props} />
      ) : (
        <Html transform as="div" center>
          <FaSpinner className="animate-spin" />
        </Html>
      )}
    </Suspense>
  );
}
