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
    [timeZone]
  );
  const estTime = new Date().toLocaleString("en-US", config);
  const [time, setTime] = useState<string | null>(estTime);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleString("en-US", config));
    }, 1000);
  }, [config]);

  return (
    <>
      <motion.div
        key={Info._id + "locale"}
        // initial={{ opacity: 0 }}
        animate={{ opacity: 1.5 }}
        transition={{ duration: 0.5, delay: 0, ease: "easeIn" }}
        className="pointer-events-none flex flex-row items-center gap-x-1 whitespace-nowrap text-sm opacity-50"
      >
        <TbLocationFilled />
        <p>{`${location}`}</p>
        <p> {`\t•\t`}</p>
        <TbClockFilled />
        <p>{`${time}`}</p>
      </motion.div>
    </>
  );
}
