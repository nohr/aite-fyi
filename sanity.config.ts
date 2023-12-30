import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";

import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: "yfo4gx0z",
  dataset: "production",
  title: "aite-fyi",
  apiVersion: "2023-04-30",
  basePath: "/admin",
  plugins: [deskTool(), visionTool(), media()],
  schema: {
    types: schemas,
  },
  useCdn: false,
});

export default config;
