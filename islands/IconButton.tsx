import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import IconClipboard from "tabler/clipboard.tsx";
import IconClipboardCheck from "tabler/clipboard-check.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function IconButton(
  { icon, ...props }: { icon: string } & JSX.HTMLAttributes<HTMLButtonElement>,
) {
  const clicked = useSignal(false);
  return (
    <button
      disabled={!IS_BROWSER || props.disabled}
      type="button"
      class="p-2 rounded-sm bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
      onClick={() => {
        clicked.value = true;
        props.onClick;
      }}
      {...props}
    >
      <p>
        {clicked}
      </p>
      {icon == "clipboard" && (
        !clicked.value
          ? <IconClipboard class="w-6 h-6 text-white" />
          : <IconClipboardCheck class="w-6 h-6" />
      )}
    </button>
  );
}