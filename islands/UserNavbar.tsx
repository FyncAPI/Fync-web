import { User } from "@/utils/type.ts";
import ProfileNavButton from "@/islands/ProfileNavButton.tsx";
import IconSearch from "tabler/search.tsx";

export default function UserNavbar({ type, user }: {
  type?: string;
  user?: User;
}) {
  return (
    <nav className="sticky top-0 flex items-center justify-between flex-wrap h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      <div className="flex items-center text-white mr-6 p-3">
        <a href="/home">
          <h1 className="font-bold text-white text-2xl">
            Fync
          </h1>
        </a>
      </div>
      <div className="flex items-center justify-center ml-auto mr-5 self-center">
        <form action="/search" method="get" className="flex items-center">
          <div>
            <IconSearch class="absolute mt-2 ml-2" />
            <input
              type="text"
              id="searchQuery"
              name="q"
              className="py-2 pl-10 pr-4 rounded-full text-white bg-gray-800 blur-5 w-64 focus:outline-none"
              placeholder="Search"
            >
            </input>
          </div>
        </form>
        <NavButton href="/friends" text="friends" />
        <NavButton href="/apps" text="apps" />
        {user?._id
          ? <ProfileNavButton {...user} />
          : <NavButton href="/login" text="login" />}
      </div>
    </nav>
  );
}

const NavButton = ({ href, text }) => (
  <a href={href}>
    <div className="hover:text-gray-100 mx-5 text-gray-500">
      {text}
    </div>
  </a>
);
