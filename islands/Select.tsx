import { JSX } from "preact";
import { Signal } from "@preact/signals";

export default function Select({
  choices,
  selectedChoice,
  disabled,
  ...props
}: {
  choices: string[] | { label: string; value: string }[];
  selectedChoice: Signal<string> | Signal<string>["value"];
} & JSX.HTMLAttributes<HTMLSelectElement>) {
  // check type
  const isSignal = selectedChoice instanceof Signal;
  return (
    <>
      {props.label && (
        <h4 class="text-primary-200 text-lg">
          {props.label}
        </h4>
      )}
      <select
        disabled={disabled}
        onChange={(e) => {
          const target = e.target as HTMLSelectElement;
          if (isSignal) {
            (selectedChoice as Signal<string>).value = target.value;
          } else {
            selectedChoice = target.value;
          }
        }}
        value={isSignal
          ? (selectedChoice as Signal<string>).value
          : selectedChoice}
        class={`p-2  rounded-md bg-slate-800 ${props.class} m-2 pr-2`}
      >
        {choices?.map((choice) => (
          <option
            value={typeof choice === "object" ? choice.value : choice}
            selectedChoice={selectedChoice?.value === choice ||
              selectedChoice === choice}
          >
            {typeof choice === "object" ? choice.label : choice}
          </option>
        ))}
      </select>
    </>
  );
}
