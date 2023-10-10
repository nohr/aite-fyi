"use client";

import { NextStudio } from "next-sanity/studio";
import config from "sanity.config";

export default function AdminPage() {
  return (
    <section  className="absolute !z-[999] top-0 w-full left-0 [&_*]:!pointer-events-all">
      <NextStudio config={config} />
    </section>
  );
}
