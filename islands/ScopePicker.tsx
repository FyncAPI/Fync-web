import { effect, Signal, useSignal } from "@preact/signals";
import { scopes } from "@/constants/scopes.ts";

export default function ScopePicker({
  selectedScope,
  selectedScopeSignal,
  onChange,
}: {
  selectedScope?: string[] | undefined;
  selectedScopeSignal?: Signal<string[]>;
  onChange?: (value: string[]) => void;
}) {
  const selected = useSignal<string[]>(
    selectedScope || selectedScopeSignal?.value || [],
  );

  effect(() => {
    if (selectedScopeSignal && selected.value !== selectedScopeSignal.value) {
      selectedScopeSignal.value = selected.value;
      onChange && onChange(selected.value);
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
            {Object.entries(values).map(([k, v]) => (
              <label for={v} class={"p-2"}>
                <input
                  name={v}
                  type={"checkbox"}
                  id={v}
                  class="mr-2"
                  checked={selected.value.includes(v)}
                  value={v}
                  onChange={() => {
                    console.log(selected.value, v);
                    if (selected.value.includes(v)) {
                      selected.value = selected.value.filter((
                        va,
                      ) =>
                        va !== v
                      );
                    } else {
                      selected.value = [
                        ...selected.value,
                        v,
                      ];
                    }
                  }}
                />
                {k}
              </label>
            ))}
          </div>
        )
      )}
    </div>
  );
}
