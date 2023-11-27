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
    env: string;
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
    </div>
  );
}
