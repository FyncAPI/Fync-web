import { Input } from "@/components/Input.tsx";
import { JSX } from "preact";

const DataInput = (
  { label, value, disabled, name, type, onChange, ...rest }: {
    label: string;
    value: string | undefined;
    disabled?: boolean;
    type?: "string" | "number" | "array" | "object" | "checkbox";
    name: string;
    onChange?: (e: Event) => void;
  } & JSX.HTMLAttributes<HTMLInputElement>,
) => {
  return (
    <>
      <h4 class="text-primary-200 text-lg">
        {label}
      </h4>
      <Input
        label={label}
        name={name}
        value={value}
        type={type}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
    </>
  );
};

export default DataInput;
