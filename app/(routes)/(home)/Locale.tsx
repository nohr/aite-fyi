"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TbClockFilled } from "react-icons/tb";
import { Info } from "types/Info";

export default function Locale({ location }: { location: Info["location"] }) {
  const config: Intl.DateTimeFormatOptions = useMemo(
    () => ({
      timeZone: location,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
    [location]
  );
  const timeRef = useRef<HTMLParagraphElement>(null);
  const estTime = new Date().toLocaleString("en-US", config);
  const [time, setTime] = useState(estTime);

  useEffect(() => {
    if (!timeRef.current) return;
    setInterval(() => {
      setTime(new Date().toLocaleString("en-US", config));
    }, 1000);
  }, [config]);

  return (
    <div className="pointer-events-none flex flex-row items-center gap-x-1 whitespace-nowrap text-sm opacity-50">
      <TbClockFilled />
      <p ref={timeRef}>{`${time}\t•\tbrooklyn, ny`}</p>
    </div>
  );
}
