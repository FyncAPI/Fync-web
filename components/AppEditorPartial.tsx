import { App, Interaction } from "@/utils/type.ts";
import { Partial } from "$fresh/runtime.ts";
import InteractionsEditor from "@/islands/InteractionsEditor.tsx";
import AppDataEditor from "@/islands/AppDataEditor.tsx";
import DiscordAuthEditor from "@/islands/DiscordAuthEditor.tsx";

export default function AppEditorPartial(props: {
  env: string;
  app?: App;
  interactions?: Interaction[] | null;
  slug: string;
}) {
  /*console.log("props.slug:", props.slug);
  console.log("props.app:", props.app);
  console.log("props.interactions:", props.interactions);
  console.log("props.env:", props.env);*/
  return (
    <Partial name="app-editor">
      {props.slug == "discord"
        ? <DiscordAuthEditor app={props.app} env={props.env} />
        : props.slug == "interactions"
        ? (
          <InteractionsEditor
            app={props.app as App}
            interactions={props.interactions || []}
            env={props.env}
          />
        )
        : <AppDataEditor app={props.app || {} as App} />}
    </Partial>
  );
}
