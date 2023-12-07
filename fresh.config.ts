import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
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
  plugins: [tailwind()],
});
