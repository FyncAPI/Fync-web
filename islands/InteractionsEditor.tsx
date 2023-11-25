import { Button } from "@/components/Button.tsx";
import { computed, effect, useSignal } from "@preact/signals";
import DataInput from "@/islands/DataInput.tsx";
import CopyText from "@/islands/CopyText.tsx";
import IconX from "tabler/x.tsx";
import { App, appParser } from "@/utils/type.ts";
import { endpoints } from "@/constants/endpoints.ts";
import { Interaction } from "@/utils/type.ts";
import InteractionEditor from "../islands/InteractionEditor.tsx";
import { z } from "zod";

export default function InteractionsEditor(
  { interactions, app, env }: {
    app: App;
    interactions: Interaction[];
    env: string
  },
) {
  const error = useSignal("");
  const datas = useSignal(interactions || []);
  const data = useSignal<Interaction>(datas.value[0]);
  const changedData = useSignal<Partial<Interaction>>(data.value);
  const validated = useSignal(false);
  const edited = computed(() => {
    return JSON.stringify(data.value) !== JSON.stringify(changedData.value);
  });

  const update = (
    field: keyof Interaction,
  ) =>
  (value: Event) => {
    const target = value.target as HTMLInputElement;
    console.log(target.value, "target", field);
    changedData.value = {
      ...changedData.value,
      [field]: target.value,
    };
  };

  console.log("data value", data.value);

  return (
    <div class=" mt-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <div class={"flex items-center  flex-1 grow justify-between"}>
        <h4 class="text-primary-200 text-lg">
          Interactions
        </h4>
        <form
          action={`/dev/dashboard/app/${app._id}/interactions/create`}
          method="post"
        >
          <Button
            type={"submit"}
          >
            {"add"}
          </Button>
        </form>
      </div>
      {datas.value.map((interaction) => {
          /*<>
            <p>{JSON.stringify(interaction)}</p>
            <br />
          </>*/
        return <InteractionEditor interaction={interaction} />;
        // return <InteractionEditor interaction={interaction} />;
      })}

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
          label={"Interaction Version"}
          value={(changedData.value["version"] ||
          data.value["version"]).toString()}
          name={"version"}
          type={"string"}
          onChange={update("version")}
        />
        <DataInput
          label={"Interaction Title"}
          value={changedData.value["title"] ||
          data.value["title"]}
          name={"title"}
          type={"string"}
          onChange={update("title")}
        />
        <DataInput
          label={"Interaction Description"}
          value={changedData.value["description"] ||
          data.value["description"]}
          name={"description"}
          type={"string"}
          onChange={update("description")}
        />
        {edited.value && (
          <Button
            class={"self-end"}
            type={validated.value ? "submit" : "button"}
            onClick={(e) => {
              console.log("changedData", changedData.value);
              try {
                const result = z.object({
                  discordClientId: z.string(),
                  discordClientSecret: z.string(),
                }).parse(changedData.value);

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
      {/* generate link like this https://discord.com/api/oauth2/authorize?client_id=1133644259552141452&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foauth2%2Fdiscord%2Fdf%2F9c8d1087-0e20-4445-9cc4-9a2999b3782f%2Fcb&response_type=code&scope=identify%20email */}
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
