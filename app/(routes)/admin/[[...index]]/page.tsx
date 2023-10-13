"use client";

import { NextStudio } from "next-sanity/studio";
import { useEffect } from "react";
import config from "sanity.config";

export default function AdminPage() {
  useEffect(() => {
    document.body.classList.remove("pointer-events-none");
    return () => document.body.classList.add("pointer-events-none");
  }, []);
  return (
    <section  className="absolute !z-[999] top-0 w-full left-0 [&_*]:!pointer-events-all">
      <NextStudio config={config} />
    </section>
  );
}
