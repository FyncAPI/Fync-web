import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Navbar } from "@/components/Navbar.tsx";
import { WithSession } from "fresh-session";

export const handler: Handlers<{}, WithSession> = {
  GET(_req, ctx) {
    const { session } = ctx.state;
    const user = session.get("user");
    console.log(user, "getting session");

    session.clear();

    return ctx.render();
  },
};
export default function Logout() {
  return (
    <>
      <div class="h-screen p-4 mx-auto bg-gradient-to-br from-fuchsia-900 via-indigo-900 to-primary-800 hue-rotate-15 bg-opacity-40 pt-20 flex items-center justify-center">
        <div className="p-4 -mt-56 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg backdrop-brightness-75 bg-opacity-10  w-full max-w-md min-w-min">
          <h1 class="text-5xl font-extrabold text-transparent md:text-6xl lg:text-8xl max-w-2xl m-4  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            You have been logged out
          </h1>
          <a
            href="/"
            class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-primary-600 hover:from-pink-500 hover:to-yellow-500"
          >
            Go back to home
          </a>
        </div>
      </div>
    </>
  );
}
