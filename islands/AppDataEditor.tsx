import { App, appParser } from "@/utils/type.ts";
import { Input } from "@/components/Input.tsx";
import { useSignal } from "@preact/signals";
import { Button } from "@/components/Button.tsx";
import { endpoints } from "@/constants/endpoints.ts";

export default function AppDataEditor({ app }: { app: App }) {
  const editing = useSignal(false);
  const appData = useSignal<App>(app);
  const changedData = useSignal<Partial<App>>({});

  // const saveApp = async (changed: Partial<App>) => {
  //   // const res = await fetch(endpoints.dev.app.update + app._id, {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify(changed),
  //   // });

  //   if (!res.ok) {
  //     console.log("error");
  //   }
  //   const data = await res.json();
  //   console.log(data);
  // };

  const update = (field: keyof App) => (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (typeof appData.value[field] === "string") {
      appData.value[field] = target.value as string;
      changedData.value[field] = target.value as string;
    }
  };

  return (
    <div class=" mt-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <form class="flex flex-col" type="POST">
        <DataInput
          label="App name"
          value={appData.value.name}
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
        <DataInput
          label="redirect url"
          value={appData.value.redirectUrl}
          name="redirectUrl"
          disabled={!editing.value}
          onChange={update("redirectUrl")}
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
        />
        {editing.value && (
          <Button
            type="submit" // onClick={() => {
            onClick={(e) => {
              e.preventDefault();
              const result = appParser.partial().safeParse(changedData.value);

              if (!result.success) {
                console.log(result.error);

                return;
              }
              console.log(result.data, "res parse");
            }}
            //   // saveApp(changedData.value);
            // }}
          >
            Save
          </Button>
        )}
      </form>
      <Button
        onClick={() => {
          editing.value = !editing.value;
          if (editing.value) {
            changedData.value = {};
            appData.value = app;
          }
        }}
      >
        {editing.value ? "Cancel" : "Edit"}
      </Button>
    </div>
  );
}

const DataInput = (
  { label, value, disabled, name, onChange }: {
    label: string;
    value: string | undefined;
    disabled?: boolean;
    name: string;
    onChange?: (e: Event) => void;
  },
) => {
  return (
    <>
      <h4 class="text-primary-200 text-lg mt-4">
        {label}
      </h4>
      <Input
        label={label}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </>
  );
};
