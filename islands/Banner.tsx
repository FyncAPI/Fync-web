import { useState } from "preact/hooks";
import { Button } from "@/components/Button.tsx";

interface BannerProps {
  text: string;
  type: "error" | "warning" | "info";
}

export default function Banner({ text, type }: BannerProps) {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
  };

  return (
    <div>
      {!dismissed && (
        <div
          className={"rounded-md flex row justify-between m-2 " +
            (type == "error"
              ? "bg-red-500 text-white p-2 px-4"
              : "bg-slate-800 text-white p-4")}
        >
          <p>{text}</p>
          <button
            onClick={handleDismiss}
            className="text-white font-bold ml-2 focus:outline-none"
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
