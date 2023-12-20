"use client";

import { useEffect, useMemo, useState } from "react";
import { TbClockFilled, TbLocationFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import { Info } from "types/Info";

export default function Locale({ Info }: { Info: Info }) {
  const { timeZone, location } = Info;

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
      key={Info._id + "locale"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay: 0, ease: "easeIn" }}
      className="pointer-events-none flex flex-row items-center gap-x-1 whitespace-nowrap font-serif text-sm font-semibold tracking-tight opacity-50"
    >
      <TbLocationFilled />
      <p>{`${location}`}</p>
      <p> {`\t•\t`}</p>
      <TbClockFilled />
      <p>{`${time}`}</p>
    </motion.div>
  );
}
