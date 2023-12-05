import { User } from "@/utils/type.ts";
import ProfileNavButton from "@/islands/ProfileNavButton.tsx";
import IconSearch from "tabler/search.tsx";
import SearchBox from "@/components/SearchBox.tsx";

export default function UserNavbar({ type, user }: {
  type?: string;
  user?: User;
}) {
  return (
    <nav className="sticky top-0 flex items-center justify-between flex-wrap h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 z-30">
      <div className="flex items-center text-white mr-6 p-3">
        <a href="/home">
          <h1 className="font-bold text-white text-2xl">
            Fync
          </h1>
        </a>
      </div>
      <div className="flex items-center justify-center ml-auto mr-5 self-center">
        <SearchBox action="/search" />
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
