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
  // effect(() => data.value.length && onChange(data.value));

  const update = (i: number) => (e: Event) => {
    console.log("updating array input");
    const target = e.target as HTMLInputElement;
    const temp = [...data.value];
    temp[i] = target.value;
    data.value = temp;
    onChange(temp);
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
            name={name + i}
            value={item}
            disabled={disabled}
            onChange={update(i)}
          />
        );
      })}
    </>
  );
}
