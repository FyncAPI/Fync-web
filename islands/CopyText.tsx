import { IconButton } from "@/islands/IconButton.tsx";

export const CopyText = (props: { text: string }) => {
  const copyText = () => {
    navigator.clipboard.writeText(props.text);
    alert("Copied to clipboard!");
  };
  return (
    <div class="p-2 rounded-md items-center justify-between h-full bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-sm ">
      <div
        class="flex flex-row justify-between p-2 z-20"
        onClick={copyText}
      >
        <p class="font-mono text-center self-center text-yellow-100 text-md">
          {props.text}
        </p>
        <IconButton icon="clipboard" onClick={copyText} />
      </div>
    </div>
  );
};
