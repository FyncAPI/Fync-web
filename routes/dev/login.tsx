import { Head } from "$fresh/runtime.ts";
import { DevNavbar } from "@/components/DevNavbar.tsx";
import { Handlers } from "$fresh/server.ts";
import { User } from "@/utils/type.ts";
import { WithSession } from "fresh-session";

type Data = {
  user: User;
};

export const handler: Handlers<Data, WithSession> = {
  GET(req, ctx) {
    const { session } = ctx.state;

    console.log(session.data, "session");
    // const user = await ctx.state.db.collection("users").findOne({
    //   _id: ctx.state.session.get("userId"),
    // });
    const user = session.get("user");
    const token = session.get("accessToken");

    if (token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/dev/dashboard",
        },
      });
    }

    return ctx.render({ user });
  },
};

export default function SignIn() {
  return (
    <>
      <DevNavbar />
      <div class="h-screen p-4 mx-auto ">
        <div class="flex items-center self-center ml-auto mr-auto justify-center h-800 flex-col max-w-xl ">
          <h1 class="text-5xl font-extrabold text-transparent md:text-5xl lg:text-6xl max-w-2xl m-4  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Login to Fync Developer
          </h1>
          <div class="self-start flex flex-col p-5 gap-2">
            {
              /* <Button href="/start">Get started</Button>
            <Button href="/learn" variant="secondary">learn more</Button> */
            }
            <FyncLoginButton />
            {/* <GoogleLoginButton /> */}
          </div>
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

const FyncLoginButton = () => {
  return (
    <a
      href="/oauth2/fync?dev=true"
      class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md "
    >
      <h2 class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-blue-600 hover:from-blue-500 hover:to-cyan-400 transition">
        Sign in with Fync
      </h2>
    </a>
  );
};
