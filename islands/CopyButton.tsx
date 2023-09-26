import { JSX } from "preact";
import { Signal, useSignal } from "@preact/signals";
import IconClipboard from "tabler/clipboard.tsx";
import IconClipboardCheck from "tabler/clipboard-check.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function CopyButton(
  { text, clicked, ...props }: { text: string; clicked: Signal<boolean> },
) {
  return (
    <button
      disabled={!IS_BROWSER}
      type="button"
      class="p-2 rounded-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  text-white"
      onClick={() => {
        navigator.clipboard.writeText(text);
        clicked.value = true;
      }}
      {...props}
    >
      {!clicked.value
        ? <IconClipboard class="w-6 h-6" />
        : <IconClipboardCheck class="w-6 h-6 " />}
    </button>
  );
}
