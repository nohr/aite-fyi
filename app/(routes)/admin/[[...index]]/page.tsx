"use client";

import useLoading from "@hooks/useLoading";
import { NextStudio } from "next-sanity/studio";
import config from "sanity.config";

export default function AdminPage() {
  useLoading();
  return (
    <section className="absolute -top-1 left-0 !z-[999] w-full [&>*]:!h-[calc(100dvh-7rem)]">
      <NextStudio config={config} />
    </section>
  );
}
