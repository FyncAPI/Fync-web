import { JSX } from "preact";
import { Signal } from "@preact/signals";

export default function Select({
  choices,
  selectedChoice,
  ...props
}: {
  choices: string[] | { label: string; value: string }[];
  selectedChoice: Signal<string>;
} & JSX.HTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      // onSelect={(e) => {
      //   selected.value = e.target?.value!;
      // }}
      onChange={(e) => {
        const target = e.target as HTMLSelectElement;
        selectedChoice.value = target.value;
      }}
      value={selectedChoice.value}
      class={`p-2 text-slate-900 rounded-md bg-secondary-50 ${props.class}`}
    >
      {choices?.map((choice) => (
        <option
          value={typeof choice === "object" ? choice.value : choice}
          selectedChoice={selectedChoice.value === choice}
        >
          {typeof choice === "object" ? choice.label : choice}
        </option>
      ))}
    </select>
  );
}
