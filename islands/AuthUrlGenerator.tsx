import CopyText from "@/islands/CopyText.tsx";
import { useSignal } from "@preact/signals";
import Select from "@/islands/Select.tsx";
import { scopes } from "@/constants/scopes.ts";
import ScopePicker from "@/islands/ScopePicker.tsx";

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
      <div class={"flex flex-col bg-slate-900 p-4 rounded-md mb-4"}>
        <h2 class={"text-2xl"}>
          scopes
        </h2>
        <div class="flex flex-row">
          <ScopePicker selectedScopeSignal={selectedScope} />
        </div>
      </div>
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
