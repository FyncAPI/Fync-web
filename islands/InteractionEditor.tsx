import { Interaction, interactionParser } from "@/utils/type.ts";
import { computed, effect, useSignal } from "@preact/signals";
import { Button } from "@/components/Button.tsx";
import Banner from "@/islands/Banner.tsx";
import ArrayInput from "@/islands/ArrayInput.tsx";
import DataInput from "@/islands/DataInput.tsx";
import Select from "@/islands/Select.tsx";
import CopyText from "@/islands/CopyText.tsx";

export default function InteractionEditor(
  { interaction, env }: { interaction: Interaction; env: string },
) {
  const editing = useSignal(false);
  const error = useSignal("");
  const interactionData = useSignal<Interaction>(interaction);
  const changedData = useSignal<Partial<Interaction>>({});
  const validated = useSignal(false);
  const strigified = computed(() => JSON.stringify(changedData.value));

  const update = <T extends string[] | Event>(
    field: keyof Interaction,
  ) =>
  (value: T) => {
    if (
      value instanceof Event
    ) {
      const target = value.target as HTMLInputElement;

      console.log("value", target.value);
      changedData.value = {
        ...changedData.value,
        [field]: parseInt(target.value) ? parseInt(target.value) : target.value,
      };
    }
  };

  effect(() => {
    if (changedData.value) {
      try {
        const result = interactionParser.partial().parse(changedData.value);

        validated.value = true;
        return result;
      } catch (e) {
        console.log("e", e.message);
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
      {!editing.value && (
        <div class="p-3 gap-2">
          <h3 class="text-primary-200 text-xl">
            Interaction Url
          </h3>

          <CopyText
            text={`${
              env == "dev" ? "http://localhost:8080" : "https://api.fync.in"
            }/i/${interactionData.value.urlSlug}`}
          />
        </div>
      )}
      <form
        class="flex flex-col gap-4"
        method={"POST"}
      >
        <input
          type="hidden"
          name="_id"
          value={interactionData.value._id}
        />
        <input
          type="hidden"
          name="changes"
          value={strigified.value}
        />
        {[
          // { name: "version", label: "Interaction Version" },
          { name: "title", label: "Title" },
          { name: "description", label: "Description" },
          { name: "urlSlug", label: "Url Slug" },
          {
            name: "type",
            label: "Type",
            type: "select",
            choices: ["friendship", "event", "game"],
          },
          // { name: "redirects", label: "Interaction Redirects", type: "array" },
          // { name: "androidPackageName", label: "Android Package Name" },
          // { name: "interactionStoreId", label: "iOS Bundle ID" },
        ].map((item) =>
          item?.type == "select"
            ? (
              <>
                <Select
                  choices={item.choices!}
                  label={item.label}
                  disabled={!editing.value}
                  selectedChoice={(changedData
                    .value[item.name as keyof Interaction] ||
                    interactionData.value[item.name as keyof Interaction])
                    ?.toString()}
                  name={item.name}
                />
              </>
            )
            : (
              <DataInput
                label={item.label}
                value={(changedData.value[item.name as keyof Interaction] ||
                  interactionData.value[item.name as keyof Interaction])
                  ?.toString()}
                name={item.name}
                disabled={!editing.value}
                type={"string"}
                onChange={update(item.name as keyof Interaction)}
              />
            )
        )}
        <div class="flex flex-row items-end justify-between self-end gap-4">
          <Button
            type="button"
            onClick={() => {
              editing.value = !editing.value;
              if (editing.value) {
                changedData.value = {};
                interactionData.value = interaction;
              }
            }}
            variant={editing.value ? "cancel" : "secondary"}
          >
            {editing.value ? "Cancel" : "Edit"}
          </Button>
          {editing.value && (
            <Button
              type="submit"
              onClick={(e) => {
                try {
                  const result = interactionParser.partial().parse(
                    changedData.value,
                  );
                  console.log("success new data:", result);
                  return result;
                } catch (e) {
                  console.log("error new data:", e.message);
                  error.value = e.message;
                  e.preventDefault();

                  return;
                }
              }}
            >
              Save
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
