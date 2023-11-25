import { JSX } from "preact";
import { App, Interaction } from "@/utils/type.ts";
import { Partial } from "$fresh/runtime.ts";
import InteractionsEditor from "@/islands/InteractionsEditor.tsx";
import AppDataEditor from "@/islands/AppDataEditor.tsx";
import DiscordAuthEditor from "@/islands/DiscordAuthEditor.tsx";

export default function TabNavPartial(
  {
    appId,
    slug,
  }: {
    slug: string;
    appId: string;
  } & JSX.HTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <Partial name="tab-nav">
      <aside class="text-primary-200 text-2xl gap-3 flex flex-row pt-4">
        <a
          href={`/dev/dashboard/app/${appId}/`}
          f-partial={`/partials/dev/dashboard/app/${appId}/`}
          class={" hover:text-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-2 rounded-md bg-gray-400 " +
            (slug == "" ? "text-white bg-slate-300 bg-opacity-30" : "")}
        >
          OAuth Settings
        </a>
        <a
          href={`/dev/dashboard/app/${appId}/interactions`}
          f-partial={`/partials/dev/dashboard/app/${appId}/interactions`}
          class={" hover:text-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-2 rounded-md bg-gray-400 " +
            (slug == "interactions"
              ? "text-white bg-slate-300 bg-opacity-30"
              : "")}
        >
          Edit interactions
        </a>
        <a
          href={`/dev/dashboard/app/${appId}/discord`}
          f-partial={`/partials/dev/dashboard/app/${appId}/discord`}
          class={" hover:text-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-2 rounded-md bg-gray-400 " +
            (slug == "discord" ? "text-white bg-slate-300 bg-opacity-30" : "")}
        >
          Discord Flow
        </a>
      </aside>
    </Partial>
  );
}
