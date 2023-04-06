import { JSX } from "preact";

export function Input(
  props: JSX.HTMLAttributes<HTMLInputElement> & {
    variant?: "primary" | "secondary";
  },
) {
  return (
    <input
      {...props}
      class={`shadow-md hover:shadow-lg m-2 py-2 px-4 rounded-lg  ${
        props.variant == "secondary"
          ? "bg-secondary-50 text-black"
          : "bg-primary-800 bg-opacity-30 text-white"
      }`}
    />
  );
}
