import CopyButton from "@/islands/CopyButton.tsx";
import { effect, useSignal } from "@preact/signals";

export default function CopyText(props: { text: string }) {
  const clicked = useSignal(false);
  effect(() => {
    setTimeout(() => {
      clicked.value = false;
    }, 5000);
  });
  const copyText = () => {
    navigator.clipboard.writeText(props.text);
    clicked.value = true;
  };

  return (
    <div
      class={`px-2 rounded-md items-center justify-between h-full  bg-clip-padding backdrop-filter backdrop-blur-sm ${
        clicked.value ? "bg-gray-600" : "bg-gray-800"
      }`}
    >
      <div
        class="flex flex-row justify-between p-2 z-20"
        onClick={copyText}
      >
        <p class="font-mono text-start self-center text-yellow-100 text-md">
          {props.text}
        </p>
        <CopyButton text={props.text} clicked={clicked} />
      </div>
    </div>
  );
}
