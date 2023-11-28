"use client";

import { NextStudio } from "next-sanity/studio";
import config from "sanity.config";

export default function AdminPage() {
  return (
    <section className="absolute left-0 !z-[999] w-full [&>*]:!h-[calc(100dvh-90px)] [&>*]:md:!top-20">
      <NextStudio config={config} />
    </section>
  );
}
