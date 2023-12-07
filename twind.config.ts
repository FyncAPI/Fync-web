import { Options } from "twind_fresh_plugin/twind.ts";
import { apply, defineConfig } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";
import { src } from "https://deno.land/std@0.193.0/semver/_shared.ts";

export default {
  selfURL: import.meta.url,

  ...defineConfig({
    presets: [
      presetAutoPrefix(),
      presetTailWind(),
    ],
    preflight: {
      "@font-face": {
        "fontFamily": "Outfit",
        src: 'url("/fonts/Outfit-VariableFont_wght.ttf")',
      },

      "@layer base": {
        "*": {
          color: "#fff",
        },
      },
    },
    theme: {
      extend: {
        fontFamily: {
          sans: ["Outfit", "sans-serif"],
        },
        color: {
          default: "#1c358c",
        },
        textColor: {
          default: "#1c358c",
        },
        colors: {
          "primary": {
            "50": "#eff5ff",
            "100": "#dae9ff",
            "200": "#bfd9ff",
            "300": "#91c1ff",
            "400": "#5e9ffc",
            "500": "#387af9",
            "600": "#225aee",
            "700": "#1a46db",
            "800": "#1c39b1",
            "900": "#1c358c",
          },
          "secondary": {
            "50": "#fff1f3",
            "100": "#ffe0e4",
            "200": "#fecdd6",
            "300": "#fda4b4",
            "400": "#fb718d",
            "500": "#f43f68",
            "600": "#e11d53",
            "700": "#be1245",
            "800": "#9f1241",
            "900": "#88133d",
          },
        },
      },
    },
  }),
} as Options;
