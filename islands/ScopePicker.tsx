import { effect, Signal, useSignal } from "@preact/signals";
import { scopes } from "@/constants/scopes.ts";

export default function ScopePicker({
  selectedScope,
  selectedScopeSignal,
}: {
  selectedScope?: string[] | undefined;
  selectedScopeSignal?: Signal<string[]>;
}) {
  const selected = useSignal<string[]>(
    selectedScope || selectedScopeSignal?.value || [],
  );

  effect(() => {
    if (selectedScopeSignal) {
      selectedScopeSignal.value = selected.value;
    }
  });
  return (
    <div>
      {Object.entries(scopes).map(([key, values]) =>
        key != "dev" && (
          <div class={"bg-slate-800 m-2 p-2 rounded-sm"}>
            <h3>
              {key}
            </h3>
            {values.map((value) => (
              <label for={value} class={"p-2"}>
                <input
                  name={value}
                  type={"checkbox"}
                  id={value}
                  class="mr-2"
                  checked={selected.value.includes(value)}
                  value={value}
                  onChange={() => {
                    console.log(selected.value, value);
                    if (selected.value.includes(value)) {
                      selected.value = selected.value.filter((
                        v,
                      ) => v !== value);
                    } else {
                      selected.value = [
                        ...selected.value,
                        value,
                      ];
                    }
                  }}
                />
                {value}
              </label>
            ))}
          </div>
        )
      )}
    </div>
  );
}
