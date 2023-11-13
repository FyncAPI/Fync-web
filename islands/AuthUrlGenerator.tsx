import CopyText from "@/islands/CopyText.tsx";
import { useSignal } from "@preact/signals";
import Select from "@/islands/Select.tsx";
import { scopes } from "@/constants/scopes.ts";

export default function AuthUrlGenerator({ urls, clientId, env }: {
  urls: string[];
  clientId: string;
  env?: string;
}) {
  const selectedUrl = useSignal(urls[0]);
  const selectedScope = useSignal<string[]>([]);

  return (
    <div>
      <Select choices={urls} selectedChoice={selectedUrl} />
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
      {selectedUrl.value && selectedScope.value.length
        ? (
          <CopyText
            text={`${
              env == "dev" ? "http://localhost:8000" : "https://fync.in"
            }/oauth2/auth?redirect_uri=${selectedUrl.value}&scope=${
              selectedScope.value.join(",")
            }&client_id=${clientId}&response_type=code`}
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
