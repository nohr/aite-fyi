"use client";

import useLoading from "@hooks/useLoading";
import { NextStudio } from "next-sanity/studio";
import config from "sanity.config";

export default function AdminPage() {
  useLoading();
  return (
    <section className="absolute -top-1 left-0 !z-[1100] h-full w-full overflow-hidden">
      <NextStudio config={config} />
    </section>
  );
}
