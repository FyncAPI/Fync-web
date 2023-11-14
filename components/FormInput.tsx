import { JSX } from "preact/jsx-runtime";
import { Input } from "@/components/Input.tsx";

export const FormInput = (
  props: {
    label: string;
    type: string;
    name: string;
    placeholder: string;
  } & JSX.HTMLAttributes<HTMLInputElement>,
) => {
  return (
    <div class="flex flex-col">
      <h4 class="text-primary-200 text-lg">
        {props.label}
      </h4>
      <Input
        {...props}
        // class="p-2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
};
