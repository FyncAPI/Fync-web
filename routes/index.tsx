import { Head } from "$fresh/runtime.ts";
import { Button } from "@/components/Button.tsx";
import Hero from "@/components/Hero.tsx";
import { LinkButton } from "@/components/LinkButton.tsx";
import { Navbar } from "@/components/Navbar.tsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <div class="h-screen p-4 mx-auto">
        <div class="flex items-center self-center ml-auto mr-auto justify-center h-800 flex-col max-w-xl ">
          <h1 class="text-6xl font-extrabold text-transparent md:text-7xl lg:text-8xl max-w-2xl m-4  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Develop Friendships Everywhere
          </h1>
          <div class="self-start p-4">
            <LinkButton href="/signup">Get started</LinkButton>
            {
              /* <LinkButton href="/learn" variant="secondary">
              learn more
            </LinkButton> */
            }
          </div>
        </div>

        <div class="my-10" />

        <Hero />
      </div>
    </>
  );
}
