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
          { name: "version", label: "Interaction Version" },
          { name: "title", label: "Interaction Title" },
          { name: "description", label: "Interaction Description" },
          // { name: "url", label: "Interaction Website" },
          // { name: "redirects", label: "Interaction Redirects", type: "array" },
          // { name: "androidPackageName", label: "Android Package Name" },
          // { name: "interactionStoreId", label: "iOS Bundle ID" },
        ].map((item) => (
          <DataInput
            label={item.label}
            value={(changedData.value[item.name as keyof Interaction] ||
              interactionData.value[item.name as keyof Interaction]).toString()}
            name={item.name}
            disabled={!editing.value}
            type={"string"}
            onChange={update(item.name as keyof Interaction)}
          />
        ))}
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
              // e.preventDefault();
              try {
                const result = interactionParser.partial().parse(
                  changedData.value,
                );

                //console.log("res", result);
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
      </form>
    </div>
  );
}
