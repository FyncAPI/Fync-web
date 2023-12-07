/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "https://deno.land/std@0.145.0/dotenv/load.ts";
import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import { z } from "zod";
import tailwind from "$fresh/plugins/tailwind.ts";

const envParser = z.object({
  ENV: z.string(),
  // GOOGLE_CLIENT_ID: z.string(),
  // GOOGLE_CLIENT_SECRET: z.string(),
  APP_KEY: z.string(),
});

const result = envParser.safeParse(Deno.env.toObject());

if (!result.success) {
  console.log(result.error);
  // Deno.exit(1);
}

await start(manifest, { plugins: [tailwind()] });
