import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "twind_fresh_plugin/twind.ts";
import twindConfig from "./twind.config.ts";
console.log("yoyo");
export default defineConfig({
  plugins: [twindPlugin(twindConfig)],
});
