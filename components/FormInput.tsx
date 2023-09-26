import { JSX } from "preact/jsx-runtime";

export const FormInput = (
  props: {
    label: string;
    type: string;
    name: string;
    placeholder: string;
  } & JSX.HTMLAttributes<HTMLInputElement>,
) => {
  return (
    <div class="flex flex-col gap-2">
      <label class="text-white" for={props.name}>{props.label}</label>
      <input
        {...props}
        class="p-2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
};
