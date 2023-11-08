import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "twind_fresh_plugin/twind.ts";
import twindConfig from "./twind.config.ts";
import { z } from "zod";
console.log("yoyo");
const envParser = z.object({
  ENV: z.string(),
  // GOOGLE_CLIENT_ID: z.string(),
  // GOOGLE_CLIENT_SECRET: z.string(),
  APP_KEY: z.string(),
});

export const globalEnv = envParser.parse(Deno.env.toObject());

export default defineConfig({
  plugins: [twindPlugin(twindConfig)],
});
