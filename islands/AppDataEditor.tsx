import { App, appParser } from "@/utils/type.ts";
import { computed, effect, useSignal } from "@preact/signals";
import { Button } from "@/components/Button.tsx";
import { endpoints } from "@/constants/endpoints.ts";
import Banner from "@/islands/Banner.tsx";
import ArrayInput from "@/islands/ArrayInput.tsx";
import DataInput from "@/islands/DataInput.tsx";
import { string } from "zod";

export default function AppDataEditor(
  { app }: { app: App },
) {
  const editing = useSignal(false);
  const error = useSignal("");
  const appData = useSignal<App>(app);
  const changedData = useSignal<Partial<App>>({});
  const validated = useSignal(false);
  const strigified = computed(() => JSON.stringify(changedData.value));

  const update = <T extends string[] | Event>(
    field: keyof App,
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
          value={strigified.value}
        />
        {[
          { name: "name", label: "App Name" },
          { name: "description", label: "App Description" },
          { name: "url", label: "App Website" },
          { name: "redirects", label: "App Redirects", type: "array" },
          { name: "androidPackageName", label: "Android Package Name" },
          { name: "appStoreId", label: "iOS Bundle ID" },
        ].map((item) =>
          item.type == "array"
            ? (
              <ArrayInput
                label={item.label}
                value={changedData.value.redirects || appData.value.redirects}
                name={item.name}
                disabled={!editing.value}
                onChange={update(item.name as keyof App)}
              />
            )
            : (
              <DataInput
                label={item.label}
                value={changedData.value[item.name as keyof App] ||
                  appData.value[item.name as keyof App]}
                name={item.name}
                disabled={!editing.value}
                type={"string"}
                onChange={update(item.name as keyof App)}
              />
            )
        )}
        {
          /* <DataInput
          label="App name"
          value={changedData.value.name || appData.value.name}
          name="name"
          disabled={!editing.value}
          onChange={update("name")}
        />
        <DataInput
          label="App description"
          value={appData.value.description}
          name="description"
          disabled={!editing.value}
          onChange={update("description")}
        />
        <DataInput
          label="website"
          name="url"
          value={appData.value.url}
          disabled={!editing.value}
          onChange={update("url")}
        />
        <ArrayInput
          label="redirects"
          value={appData.value.redirects}
          name="redirects"
          disabled={!editing.value}
          onChange={update("redirects")}
        />
        <DataInput
          label="android package name"
          value={appData.value.androidPackageName}
          name="androidPackageName"
          disabled={!editing.value}
          onChange={update("androidPackageName")}
        />
        <DataInput
          label="ios bundle id"
          value={appData.value.appStoreId}
          name="appStoreId"
          disabled={!editing.value}
          onChange={update("appStoreId")}
        />{" "} */
        }
        <Button
          type="button"
          onClick={() => {
            editing.value = !editing.value;
            if (editing.value) {
              changedData.value = {};
              appData.value = app;
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
                const result = appParser.partial().parse(changedData.value);

                console.log(result, "res");
                return result;
              } catch (e) {
                console.log(e.message);
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
