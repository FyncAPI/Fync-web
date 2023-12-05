import IconSearch from "tabler/search.tsx";

export default function SearchBox({ action }: { action: string }) {
  return (
    <form action={action} method="get" className="flex items-center">
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
  );
}
