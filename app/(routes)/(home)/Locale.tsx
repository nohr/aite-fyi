"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineMyLocation } from "react-icons/md";
import { delayed_pagination_animation } from "_components/animate/constants";

export default function Locale({
  timeZone,
  location,
  _id,
}: {
  timeZone: string;
  location: string;
  _id: string;
}) {
  const config: Intl.DateTimeFormatOptions = useMemo(
    () => ({
      timeZone: timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
      hour12: false,
    }),
    [timeZone],
  );
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (!time) setTime(new Date().toLocaleString("en-US", config));

    setInterval(() => {
      setTime(new Date().toLocaleString("en-US", config));
    }, 1000);
  }, [config, time]);

  return (
    <motion.div
      key={_id + "locale"}
      {...delayed_pagination_animation(1)}
      className="pointer-events-none flex flex-row items-center gap-x-1 whitespace-nowrap pl-1 font-mono text-xs font-thin uppercase tracking-[-0.085em] opacity-50 md:px-8"
    >
      <MdOutlineMyLocation className="pb-[0.116rem]" />
      <p>{`${location}`}</p>
      <p> {`\t\t`}</p>
      <p>{`${time}`}</p>
    </motion.div>
  );
}
