import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function LinkButton(
  {
    variant = "primary",
    ...props
  }: JSX.HTMLAttributes<HTMLAnchorElement> & {
    variant?: "primary" | "secondary" | "cancel";
  },
) {
  return (
    <a
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`shadow-md hover:shadow-lg m-2 font-semibold py-2 px-4 rounded-full ${
        variant == "secondary"
          ? "bg-secondary-50 text-black"
          : variant == "cancel"
          ? "bg-gray-50 bg-opacity-30 text-white"
          : "bg-primary-500 text-white"
      }`}
    />
  );
}
