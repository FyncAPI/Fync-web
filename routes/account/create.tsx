import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Navbar } from "../../components/Navbar.tsx";

type Data = {
  session: Record<string, string>;
  userData: Object;
};

export const handler: Handlers<Data, WithSession> = {
  GET(_req, ctx) {
    const { session } = ctx.state;
    const user = session.get("createUser");
    console.log(user, "getting session");
    return ctx.render(user);
  },
};

export default function CreateAccount(props: PageProps<Data>) {
  return (
    <>
      <Navbar />
      <div class="h-screen p-4 mx-auto ">
        <div class="flex items-center self-center ml-auto mr-auto justify-center flex-col max-w-xl ">
          <h1 class="text-xl font-extrabold text-transparent md:text-md lg:text-md max-w-2xl m-4  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {JSON.stringify(props.data)}
          </h1>
        </div>
      </div>
    </>
  );
}

const GoogleLoginButton = () => {
  return (
    <a
      href="/oauth2/google"
      class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:shadow-lg focus:outline-none  focus:ring-2 focus:ring-offset-2  shadow-md"
    >
      <span class=" left-0 inset-y-0 flex items-center pr-2">
        <img
          src="/google.svg"
          class="h-5 w-5 text-yellow-300 group-hover:text-yellow-400"
        />
      </span>
      Sign in with Google
    </a>
  );
};
