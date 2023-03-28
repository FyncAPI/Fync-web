import { asset } from "$fresh/runtime.ts";
import { JSX } from "preact/jsx-runtime";

export const DevNavbar = ({ bg }: { bg?: string }) => (
  <>
    {/* <div class="bg-grey-500"> */}
    <nav class="flex items-center justify-between flex-wrap h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 sticky top-0 z-10 -mb-16 ">
      <div class="flex items-center text-white mr-6 p-3">
        {
          /* <a href="/" class="mr-3">
          <img
            src={asset("/logo.svg")}
            width={50}
            alt="logo"
          />
        </a> */
        }
        <a href="/">
          {
            /* <span class="font-semibold text-xl tracking-tight ">
            Fync
          </span> */
          }
          <h1 class="font-bold text-white  text-3xl ">
            Fync Dev
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
        <NavButton href="/dev/docs" text="docs" />
        <NavButton href="/dev/login" text="sign in" />
        {/* <NavButton href="/sign-up" text="Sign up" /> */}
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
          <h1 class="font-bold text-transparent  text-3xl ">
            Fync
          </h1>
        </a>
      </div>
    </nav>
  </>
);

const NavButton = (
  { href, text, ...props }: JSX.HTMLAttributes<HTMLAnchorElement> & {
    text: string;
  },
) => (
  <a href={href} {...props}>
    <div class="hover:text-white mx-4 text-gray-500">
      {text}
    </div>
  </a>
);
