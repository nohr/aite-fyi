"use client";

import { useUIStore } from "state/common/ui";

export default function Trigger() {
  const setMotion = useUIStore((state) => state.setMotion);
  return <input type="button" value={"click me"} onClick={setMotion} />;
}
