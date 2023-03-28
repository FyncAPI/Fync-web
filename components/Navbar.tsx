import { asset } from "$fresh/runtime.ts";

export const Navbar = () => (
  <>
    {/* <div class="bg-grey-500"> */}
    <nav class="flex items-center justify-between flex-wrap  h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
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
          <h1 class="font-bold text-black  text-3xl ">
            Fync
          </h1>
        </a>
      </div>
      <div class="flex items-center justify-center ml-auto mr-5 self-center">
        <NavButton href="/dev" text="develop" />
        <NavButton href="/login" text="Login" />
        {/* <NavButton href="/sign-up" text="Sign up" /> */}
      </div>
    </nav>
    {/* </div> */}
  </>
);

const NavButton = ({ href, text }) => (
  <a href={href}>
    <div class="hover:text-gray-800 mx-4 text-gray-500">
      {text}
    </div>
  </a>
);
