import { Head } from "$fresh/runtime.ts";
import { Button } from "@/components/Button.tsx";
import Hero from "@/components/Hero.tsx";
import { LinkButton } from "@/components/LinkButton.tsx";

export default function NotFound() {
  return (
    <>
      <div class="flex items-center self-center ml-auto mr-auto justify-center h-800 flex-col max-w-xl ">
        <h1 class="text-5xl font-extrabold text-transparent md:text-6xl lg:text-8xl max-w-2xl m-4 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          NOt found
        </h1>
      </div>
    </>
  );
}
