import { App, Interaction } from "@/utils/type.ts";
import { Partial } from "$fresh/runtime.ts";
import InteractionsEditor from "@/islands/InteractionsEditor.tsx";
import AppDataEditor from "@/islands/AppDataEditor.tsx";

export default function AppEditorPartial(props: {
  app?: App;
  interactions?: Interaction[] | null;
  slug: string;
}) {
  return (
    <Partial name="app-editor">
      {props.slug == "discord"
        ? <div>dis</div>
        : props.slug == "interactions"
        ? <InteractionsEditor interactions={props.interactions || []} />
        : <AppDataEditor app={props.app || {} as App} />}
    </Partial>
  );
}
