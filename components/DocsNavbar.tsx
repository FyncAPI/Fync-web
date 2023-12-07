import { asset } from "$fresh/runtime.ts";
import { JSX } from "preact/jsx-runtime";
import ProfileNavButton from "../islands/ProfileNavButton.tsx";
import { User } from "../utils/type.ts";
import { NavButton } from "@/islands/UserNavbar.tsx";

export const DocsNavbar = ({ bg, user }: { bg?: string; user?: User }) => (
  <>
    {/* <div class="bg-grey-500"> */}
    <nav class="flex items-center justify-between flex-wrap h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 sticky top-0 z-10 -mb-16 ">
      <div class="flex items-center text-white mr-6 p-3">
        <a href="/">
          <h1 class="font-bold text-white  text-2xl ">
            Fync Docs
          </h1>
        </a>
      </div>
      <div class="flex items-center justify-center ml-auto mr-5 self-center">
        <NavButton
          href="https://github.com/fyncAPI"
          target="_blank"
          rel="noopener noreferrer"
          text="github"
        />
        <NavButton href="/docs" text="docs" />
        {user?._id
          ? <ProfileNavButton {...user} />
          : <NavButton href="/login" text="login" />}
      </div>
    </nav>
    {/* </div> */}
    <nav
      class={`flex items-center justify-between flex-wrap  h-full w-full ${
        bg || "bg-transparent"
      }`}
    >
      <div class="flex items-center text-white mr-6 p-3">
        <a href="/">
          <h1 class="font-bold text-transparent  text-2xl ">
            Fync
          </h1>
        </a>
      </div>
    </nav>
  </>
);
