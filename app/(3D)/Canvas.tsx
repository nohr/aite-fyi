"use client";

import {  ColorRepresentation, PerspectiveCamera } from "three";
import { Html, Stats, useProgress } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, WheelEvent, useEffect, useState } from "react";
import { Device } from "./Device";
import { Scan } from "./Scan";
import { Env } from "./Environment";
import Camera from "./Camera";


function Scene({params, color}: {params: string[], color: ColorRepresentation,}) {
  const { size } = useThree();
  const { progress } = useProgress();
  
  return (
    <Suspense fallback={
      <Html center>{progress}%</Html>
    }>
      {params.length > 0 ? <Device params={params} size={size} /> : <Scan color={color}/>  }
      {/* <OrbitControls minDistance={30} maxDistance={200} /> */}
        <Env />
    </Suspense>
  );
}

export default (props: { params: string[]; color: ColorRepresentation }) => {
  const [zoom, setZoom] = useState(5);

  useEffect(() => { 
    window.innerWidth < 768 ? setZoom(7) : setZoom(5);
  }, [])

  const updateZoom = (e: WheelEvent<HTMLDivElement>) => {
   setZoom(prev => Math.min(10, Math.max(1, prev + e.deltaY / 10)));
  }
  
  return (
    <>
      <Canvas
        onWheel={updateZoom}
        linear
        dpr={[1, 2]}
        className="!fixed -z-10 "
        gl={{ antialias: true, alpha: true,}}
      >      
        <Camera zoom={zoom} />
        <Scene {...props} />
      </Canvas>
      {/* <Stats className="!top-auto !bottom-0 !left-auto !right-0 !pointer-events-auto" /> */}
    </>
  );
}