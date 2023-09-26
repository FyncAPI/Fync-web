import { App } from "@/utils/type.ts";
import { Input } from "@/components/Input.tsx";
import { useSignal } from "@preact/signals";
import { Button } from "@/components/Button.tsx";

export default function AppDataEditor({ app }: { app: App }) {
  const editing = useSignal(false);

  return (
    <div class=" mt-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <form class="flex flex-col" method="POST">
        <DataInput
          label="App name"
          value={app.name}
          disabled={!editing.value}
        />
        <DataInput
          label="App description"
          value={app.description}
          disabled={!editing.value}
        />
        <DataInput label="website" value={app.url} disabled={!editing.value} />
        <DataInput
          label="redirect url"
          value={app.redirectUrl}
          disabled={!editing.value}
        />
        <DataInput
          label="android package name"
          value={app.androidPackageName}
          disabled={!editing.value}
        />
        <DataInput
          label="ios bundle id"
          value={app.appStoreId}
          disabled={!editing.value}
        />
      </form>

      <Button
        type={editing.value ? "submit" : "button"}
        onClick={() => editing.value = !editing.value}
      >
        {editing.value ? "Save" : "Edit"}
      </Button>
    </div>
  );
}

const DataInput = (
  { label, value, disabled }: {
    label: string;
    value: string | undefined;
    disabled?: boolean;
  },
) => {
  return (
    <>
      <h4 class="text-primary-200 text-lg mt-4">
        {label}
      </h4>
      <Input value={value} disabled={disabled} />
    </>
  );
};
