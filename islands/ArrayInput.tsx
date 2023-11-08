import { Input } from "@/components/Input.tsx";
import { effect, useSignal } from "@preact/signals";
import { Button } from "@/components/Button.tsx";

export default function ArrayInput(
  { label, value, disabled, name, type, onChange }: {
    label: string;
    value: string[] | undefined;
    disabled?: boolean;
    type?: "string" | "number" | "array" | "object";
    name: string;
    onChange: (data: string[]) => void;
  },
) {
  const data = useSignal(value || []);
  effect(() => data.value && onChange(data.value));

  const update = (i: number) => (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    data.value[i] = value;
    // onChange?.(e);
  };

  return (
    <>
      <h4 class="text-primary-200 text-lg">
        {label}
      </h4>
      {!disabled && (
        <Button
          type={"button"}
          onClick={() => {
            data.value = [...data.value, ""];
          }}
        >
          {"add"}
        </Button>
      )}
      {data.value?.map((item, i) => {
        return (
          <Input
            name={name}
            value={item}
            disabled={disabled}
            onChange={update(i)}
          />
        );
      })}
    </>
  );
}
