import { Input } from "@/components/Input.tsx";
import { effect, useSignal } from "@preact/signals";
import { Button } from "@/components/Button.tsx";
import IconX from "tabler/x.tsx";

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
      <div class={"flex items-center  flex-1 grow justify-between"}>
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
      </div>
      {data.value?.map((item, i) => {
        return (
          <div class={"flex items-center  flex-1 grow"}>
            <Input
              class={"flex-1"}
              name={name + i}
              value={item}
              disabled={disabled}
              onChange={update(i)}
            />
            {!disabled && (
              <IconX
                class="cursor-pointer w-5 h-5 text-red-500 flex-grow-0"
                onClick={() => {
                  const temp = [...data.value];
                  temp.splice(i, 1);
                  data.value = temp;
                  onChange(temp);
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
