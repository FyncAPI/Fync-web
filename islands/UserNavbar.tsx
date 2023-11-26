import { User } from "@/utils/type.ts";
import ProfileNavButton from "@/islands/ProfileNavButton.tsx";

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
          <div className="relative">
            <searchIcon class="w-5 h-5 absolute ml-3" />
            <input
              type="text"
              id="searchQuery"
              name="q"
              className="py-2 pl-10 pr-4 rounded-full text-white bg-gray-800 blur-5 w-64 focus:outline-none"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-search"
              className="absolute left-3 top-2.5 h-5 w-5 text-black"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </div>
        </form>
        <NavButton href="/friends" text="friends" />
        <NavButton href="/apps" text="apps" />
        {user
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
