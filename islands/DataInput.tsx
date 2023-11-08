import { Input } from "@/components/Input.tsx";

const DataInput = (
  { label, value, disabled, name, type, onChange }: {
    label: string;
    value: string | undefined;
    disabled?: boolean;
    type?: "string" | "number" | "array" | "object";
    name: string;
    onChange?: (e: Event) => void;
  },
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
        disabled={disabled}
        onChange={onChange}
      />
    </>
  );
};

export default DataInput;
