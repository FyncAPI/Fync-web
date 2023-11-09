import { JSX } from "preact";

export function Input(
  props: JSX.HTMLAttributes<HTMLInputElement> & {
    variant?: "primary" | "secondary" | "cancel";
  },
) {
  const { class: addClass, ...rest } = props;
  return (
    <input
      {...rest}
      class={`shadow-md  hover:shadow-lg m-2 py-2 px-4 rounded-lg ${
        props.disabled
          ? "bg-gray-800 text-yellow-100 bg-opacity-100"
          : props.variant == "secondary"
          ? "bg-secondary-50 text-black"
          : "bg-primary-800 bg-opacity-30 text-white"
      } ${addClass}`}
    />
  );
}
