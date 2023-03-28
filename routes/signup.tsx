import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Button } from "../components/Button.tsx";
import { Input } from "../components/Input.tsx";

type Data = {
  dev: boolean | null;
  error?: string | null;
};

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const query = new URL(req.url).searchParams;

    const dev = query.get("dev") === "true";
    const error = query.get("error");

    return ctx.render({ dev, error });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email");
    const password = form.get("password");
    const password2 = form.get("password2");

    console.log(email, password, password2);

    const query = new URL(req.url).searchParams;

    const dev = query.get("dev") === "true";
    const error = query.set("error", "Passwords do not match");

    if (password !== password2) {
      return ctx.render({ dev, error: "Passwords do not match" });
    }

    return new Response(JSON.stringify({ email, password, password2, dev }));
  },
};

export default function Signup({
  data: { dev, error },
}: PageProps<Data>) {
  return (
    <>
      <div class="h-screen p-4 mx-auto bg-gradient-to-br from-fuchsia-900 via-indigo-900 to-primary-800 hue-rotate-15 bg-opacity-40 pt-20 flex items-center justify-center">
        <div className="p-4 -mt-56 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg backdrop-brightness-75 bg-opacity-10  w-full max-w-md min-w-min">
          {error && (
            <div
              class="bg-red-100 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{error}</span>
            </div>
          )}
          <div class=" ">
            <h1 class="text-3xl font-bold lg:text-4xl m-4  text-white overflow-visible">
              Join Fync
            </h1>
          </div>

          <form method="POST" class="grid grid-cols-1 ">
            <Input
              type="email"
              name="email"
              placeholder="Email"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
            />

            <Input
              type="password"
              name="password2"
              placeholder="Confirm Password"
            />

            <Button type="submit">
              Sign up
            </Button>
          </form>

          {
            /* <a href="/oauth2/login" class="text-blue-500">
                    <h2>login</h2>
                    </a> */
          }

          <div class="p-2">
            <a href="/oauth2/login" class="text-blue-500">
              <h2>already have an account?</h2>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
