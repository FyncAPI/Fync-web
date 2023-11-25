import { App, appParser } from "@/utils/type.ts";
import { computed, effect, useSignal } from "@preact/signals";
import Banner from "@/islands/Banner.tsx";
import DataInput from "@/islands/DataInput.tsx";
import { Button } from "@/components/Button.tsx";
import CopyText from "@/islands/CopyText.tsx";
import { z } from "zod";
import Select from "@/islands/Select.tsx";
import ScopePicker from "@/islands/ScopePicker.tsx";

export default function DiscordAuthEditor(
  { app, env }: { app: App; env: string },
) {
  // const enabled = useSignal(app.discordClientId !== "");
  const error = useSignal("");
  const appData = useSignal<App>(app);
  const changedData = useSignal<Partial<App>>({});
  const validated = useSignal(false);
  const edited = computed(() => {
    return JSON.stringify(appData.value) !== JSON.stringify(changedData.value);
  });
  const selectedScopes = useSignal<string[]>(app.discordScopes || []);
  const update = (
    field: keyof App,
  ) =>
  (value: Event) => {
    const target = value.target as HTMLInputElement;
    console.log(target.value, "target", field);
    changedData.value = {
      ...changedData.value,
      [field]: target.value,
    };
  };

  effect(() => {
    if (changedData.value) {
      try {
        const result = appParser.partial().parse(changedData.value);

        console.log(result, "res");
        validated.value = true;
        return result;
      } catch (e) {
        console.log(e.message);
        error.value = e.message;
        validated.value = false;
        return;
      }
    }
  });

  return (
    <div class=" mt-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      {error.value && (
        <Banner text={JSON.stringify(error.value)} type={"error"} />
      )}
      <form
        class="flex flex-col gap-4"
        method={"POST"}
      >
        <input
          type="hidden"
          name="changes"
          value={JSON.stringify(changedData.value)}
        />
        <DataInput
          label={"Discord Client id"}
          value={changedData.value["discordClientId"] ||
            appData.value["discordClientId"]}
          name={"discordClientId"}
          type={"string"}
          onChange={update("discordClientId")}
        />
        <DataInput
          label={"Discord Client secret"}
          value={changedData.value["discordClientSecret"] ||
            appData.value["discordClientSecret"]}
          name={"discordClientSecret"}
          type={"string"}
          onChange={update("discordClientSecret")}
        />
        <DataInput
          label={"Discord Redirect uri"}
          value={changedData.value["discordRedirectUri"] ||
            appData.value["discordRedirectUri"]}
          name={"discordRedirectUri"}
          type={"string"}
          onChange={update("discordRedirectUri")}
        />
        <h4 class="text-primary-200 text-lg mt-4">
          scopes
        </h4>
        <ScopePicker
          selectedScopeSignal={selectedScopes}
          onChange={(value) => {
            console.log(value);
            changedData.value = {
              ...changedData.value,
              discordScopes: value,
            };
          }}
        />

        {edited.value && (
          <Button
            class={"self-end"}
            type={validated.value ? "submit" : "button"}
            onClick={(e) => {
              console.log(changedData.value);
              try {
                const result = appParser.partial().parse(changedData.value);

                console.log(result, "rsx");
                return result;
              } catch (ex) {
                console.log(ex.message);
                error.value = ex.message;

                e.preventDefault();
                return;
              }
            }}
          >
            Save
          </Button>
        )}
      </form>

      <h4 class="text-primary-200 text-lg mt-4">
        Redirect uri
      </h4>
      <CopyText
        text={`${
          (env == "dev" ? "http://localhost:8000" : "https://fync.in") +
          "/oauth2/discord/df/" +
          app.clientId +
          "/cb"
        }`}
      />
      <h4 class="text-primary-200 text-lg mt-4">
        Discord Auth Url
      </h4>
      {app.discordClientId
        ? (
          <CopyText
            text={`https://discord.com/api/oauth2/authorize?client_id=${app.discordClientId}&redirect_uri=${
              (env == "dev"
                ? "http%3A%2F%2Flocalhost%3A8000"
                : "https%3A%2F%2Ffync.in") +
              "%2Foauth2%2Fdiscord%2Fdf%2F"
            }${app.clientId}%2Fcb&response_type=code&scope=identify%20email`}
          />
        )
        : (
          <p class="text-primary-200 text-lg mt-4">
            Please add a discord client id and secret
          </p>
        )}
    </div>
  );
}
