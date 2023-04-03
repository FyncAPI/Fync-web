import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Navbar } from "@/components/Navbar.tsx";
import { WithSession } from "fresh-session";

type Data = {
  dev: boolean | null;
  error?: string | null;
};

export const handler: Handlers<Data, WithSession> = {
  GET(req, ctx) {
    const query = new URL(req.url).searchParams;

    const dev = query.get("dev") === "true";
    const error = query.get("error");

    return ctx.render({ dev, error });
  },
};
export default function Login({
  data,
}: PageProps<Data>) {
  {
    data.error && (
      <div
        class="bg-red-100 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span class="block sm:inline">{data.error}</span>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div class="h-screen p-4 mx-auto ">
        <div class="flex items-center self-center ml-auto mr-auto justify-center h-800 flex-col max-w-xl ">
          <h1 class="text-6xl font-extrabold text-transparent md:text-7xl lg:text-8xl max-w-2xl m-4  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Login to Fync
          </h1>
          <div class="self-start flex flex-col p-5">
            {
              /* <Button href="/start">Get started</Button>
            <Button href="/learn" variant="secondary">learn more</Button> */
            }
            <GoogleLoginButton />
          </div>
        </div>

        {
          /* <a href="/oauth2/auth" class="text-blue-500">
          <h2>login</h2>
        </a> */
        }
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
