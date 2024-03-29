import { asset } from "$fresh/runtime.ts";
import { User } from "@/utils/type.ts";
import ProfileNavButton from "@/islands/ProfileNavButton.tsx";
import { NavButton } from "@/islands/UserNavbar.tsx";

export const Navbar = ({ type, user }: {
  type?: string;
  user?: User;
}) => (
  <>
    {/* <div class="bg-grey-500"> */}
    <nav class="flex items-center justify-between flex-wrap  h-full w-full bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 z-30 ">
      <div class="flex items-center text-white mr-6 p-3">
        <a href="/">
          <h1 class="font-bold text-white  text-2xl ">
            Fync
          </h1>
        </a>
      </div>
      {type !== "create" &&
        (
          <div class="flex items-center justify-center ml-auto mr-5 self-center">
            <NavButton href="/dev" text="develop" />
            {user?._id
              ? <ProfileNavButton {...user} />
              : <NavButton href="/login" text="login" />}
            {/* <NavButton href="/login" text="Login" /> */}
            {/* <NavButton href="/sign-up" text="Sign up" /> */}
          </div>
        )}
    </nav>
    {/* </div> */}
  </>
);
