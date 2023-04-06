export default function UserNavbar() {
  return (
    <nav class="flex items-center justify-between flex-wrap  h-full w-full bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <div class="flex items-center text-white mr-6 p-3">
        <a href="/home">
          <h1 class="font-bold text-white  text-3xl ">
            Fync
          </h1>
        </a>
      </div>
      <div class="flex items-center justify-center ml-auto mr-5 self-center">
        <NavButton href="/friends" text="friends" />
        <NavButton href="/apps" text="apps" />
        <NavButton href="/logout" text="logout" />
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
