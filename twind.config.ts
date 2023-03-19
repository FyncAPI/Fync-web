import { Options } from "twind_fresh_plugin/twind.ts";
import { defineConfig } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";

export default {
  selfURL: import.meta.url,
  ...defineConfig({
    presets: [
      presetAutoPrefix(),
      presetTailWind(),
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Outfit", "sans-serif"],
        },
      },
    },
  }),
} as Options;
