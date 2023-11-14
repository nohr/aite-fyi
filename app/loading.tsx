"use client";

import { useUIStore } from "(ui)";
import { useEffect } from "react";

export default function Loading() {
  // const [loading] = useUIStore((s) => [s.loading]);
  const [setLoading] = useUIStore((s) => [s.setLoading]);
  
  useEffect(() => {
    setLoading(true);
  
    return () => {
      setLoading(false);
    };
  } , [setLoading]);

  // console.log(loading);
  
  return (
    <></>
  );
}
