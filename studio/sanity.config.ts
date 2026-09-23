import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { VistrowIcon } from "./components/VistrowIcon";

// "Vistrow Blog" was the name from when this Studio only held blog posts -
// it now also runs the content calendar, cron diagnostics, and client
// discovery responses, so "Vistrow" is the accurate name going forward.
export default defineConfig({
  name: "default",
  title: "Vistrow",
  icon: VistrowIcon,
  projectId: "uenz7w4c",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
