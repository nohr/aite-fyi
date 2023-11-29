import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: "yfo4gx0z",
  dataset: "production",
  title: "aite-fyi",
  apiVersion: "2023-04-30",
  basePath: "/admin",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemas,
  },
  useCdn: true,
});

export default config;
