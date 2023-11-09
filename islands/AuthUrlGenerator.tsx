import CopyText from "@/islands/CopyText.tsx";
import { useSignal } from "@preact/signals";
import Select from "@/islands/Select.tsx";
import { scopes } from "@/constants/scopes.ts";

export default function AuthUrlGenerator({ urls }: {
  urls: string[];
}) {
  const selectedUrl = useSignal(urls[0]);
  const selectedScope = useSignal<string[]>([]);

  return (
    <div>
      <Select choices={urls} selected={selectedUrl} />
      <div class={"flex flex-col bg-slate-900 p-4 rounded-md"}>
        <h2 class={"text-3xl"}>
          scopes
        </h2>
        <div class="flex flex-row">
          <div>
            {Object.entries(scopes).map(([key, values]) => (
              <div class={"bg-slate-800 m-2 p-2 rounded-sm"}>
                <h3>
                  {key}
                </h3>
                {values.map((value) => (
                  <label for={value} class={"p-2"}>
                    <input
                      name={value}
                      type={"checkbox"}
                      class="mr-2"
                      checked={selectedScope.value.includes(value)}
                      value={value}
                      onChange={() => {
                        console.log(selectedScope.value, value);
                        if (selectedScope.value.includes(value)) {
                          selectedScope.value = selectedScope.value.filter((
                            v,
                          ) => v !== value);
                        } else {
                          selectedScope.value = [...selectedScope.value, value];
                        }
                      }}
                    />
                    {value}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {JSON.stringify(selectedScope.value)}
      {selectedUrl.value
        ? (
          <CopyText
            text={`https://fync.in/oauth2/auth/${selectedUrl.value}?scopes=${
              selectedScope.value.join(",")
            } `}
          />
        )
        : (
          <h1>
            No url selected
          </h1>
        )}
    </div>
  );
}
