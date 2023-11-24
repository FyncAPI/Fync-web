import { Interaction, interactionParser } from "@/utils/type.ts";
import { computed, effect, useSignal } from "@preact/signals";
import { Button } from "@/components/Button.tsx";
import Banner from "@/islands/Banner.tsx";
import ArrayInput from "@/islands/ArrayInput.tsx";
import DataInput from "@/islands/DataInput.tsx";

export default function InteractionEditor(
  { interaction }: { interaction: Interaction },
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
    if (field === "redirects") {
      changedData.value = {
        ...changedData.value,
        [field]: value as string[],
      };
    } else if (
      field !== "interactions" &&
      field !== "users" &&
      field !== "createdAt" &&
      field !== "events" &&
      value instanceof Event
    ) {
      const target = value.target as HTMLInputElement;
      console.log(target.value, "target", field);
      changedData.value = {
        ...changedData.value,
        [field]: target.value,
      };
    }
  };

  effect(() => {
    if (changedData.value) {
      try {
        const result = interactionParser.partial().parse(changedData.value);

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
          value={strigified.value}
        />
        {[
          { name: "title", label: "Interaction Title" },
          { name: "description", label: "Interaction Description" },
          // { name: "url", label: "Interaction Website" },
          // { name: "redirects", label: "Interaction Redirects", type: "array" },
          // { name: "androidPackageName", label: "Android Package Name" },
          // { name: "interactionStoreId", label: "iOS Bundle ID" },
        ].map((item) =>
          item?.type == "array"
            ? (
              // <ArrayInput
              //   label={item.label}
              //   value={changedData.value.redirects ||
              //     interactionData.value.redirects}
              //   name={item.name}
              //   disabled={!editing.value}
              //   onChange={update(item.name as keyof Interaction)}
              // />
              <></>
            )
            : (
              <DataInput
                label={item.label}
                value={changedData.value[item.name as keyof Interaction] ||
                  interactionData.value[item.name as keyof Interaction]}
                name={item.name}
                disabled={!editing.value}
                type={"string"}
                onChange={update(item.name as keyof Interaction)}
              />
            )
        )}
        {
          /* <DataInput
          label="Interaction name"
          value={changedData.value.name || interactiondata.value.name}
          name="name"
          disabled={!editing.value}
          onChange={update("name")}
        />
        <DataInput
          label="Interaction description"
          value={interactiondata.value.description}
          name="description"
          disabled={!editing.value}
          onChange={update("description")}
        />
        <DataInput
          label="website"
          name="url"
          value={interactiondata.value.url}
          disabled={!editing.value}
          onChange={update("url")}
        />
        <ArrayInput
          label="redirects"
          value={interactiondata.value.redirects}
          name="redirects"
          disabled={!editing.value}
          onChange={update("redirects")}
        />
        <DataInput
          label="android package name"
          value={interactiondata.value.androidPackageName}
          name="androidPackageName"
          disabled={!editing.value}
          onChange={update("androidPackageName")}
        />
        <DataInput
          label="ios bundle id"
          value={interactiondata.value.interactionStoreId}
          name="interactionStoreId"
          disabled={!editing.value}
          onChange={update("interactionStoreId")}
        />{" "} */
        }
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
            type={validated.value ? "submit" : "button"} // onClick={() => {
            // type="button"
            onClick={(e) => {
              console.log(changedData.value);
              // e.preventDefault();
              try {
                const result = interactionParser.partial().parse(
                  changedData.value,
                );

                console.log(result, "res");
                return result;
              } catch (e) {
                console.log(e.message);
                error.value = e.message;

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
