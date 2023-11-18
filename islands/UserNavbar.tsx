import { User } from "@/utils/type.ts";
import ProfileNavButton from "@/islands/ProfileNavButton.tsx";

export default function UserNavbar({ type, user }: {
  type?: string;
  user?: User;
}) {
  return (
    <nav class="flex items-center justify-between flex-wrap  h-full w-full bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <div class="flex items-center text-white mr-6 p-3">
        <a href="/home">
          <h1 class="font-bold text-white  text-2xl ">
            Fync
          </h1>
        </a>
      </div>
      <div class="flex items-center justify-center ml-auto mr-5 self-center">
        <NavButton href="/friends" text="friends" />
        <NavButton href="/apps" text="apps" />

        <form action="/search" method="get">
          <input
            type="text"
            id="searchQuery"
            name="q"
            placeholder="Enter your search query"
          />
          <button type="submit">Search</button>
        </form>
        {user?._id
          ? <ProfileNavButton {...user} />
          : <NavButton href="/dev/login" text="login" />}
        {/* <NavButton href="/login" text="Login" /> */}
      </div>
    </nav>
  );
}
const NavButton = ({ href, text }) => (
  <a href={href}>
    <div class="hover:text-gray-800 mx-4 text-gray-500">
      {text}
    </div>
  </a>
);
