import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Button } from "@/components/Button.tsx";
import { Input } from "@/components/Input.tsx";
import { endpoints } from "../../constants/endpoints.ts";

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
  async POST(req, ctx) {
    const form = await req.formData();
    const { session } = ctx.state;

    const body = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };
    const query = new URL(req.url).searchParams;

    const dev = query.get("dev") === "true";
    const error = query.get("error");
    const redirect = query.get("redirect");
    try {
      const url = endpoints.auth.email.login;

      const user = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (user.ok) {
        console.log("ok");
        const userBody = await user.json();

        console.log(userBody, "userBody");
        if (userBody.error) {
          return ctx.render({ dev, error: userBody.error });
        }
        if (userBody.userData) {
          session.set("user", userBody.userData);

          if (redirect) {
            return new Response(null, {
              status: 302,
              headers: {
                Location: redirect,
              },
            });
          }

          if (dev) {
            const devUser = await fetch(
              endpoints.dev.login + userBody.userData._id,
            );

            console.log(devUser, "devUser");
            return new Response(null, {
              status: 302,
              headers: {
                Location: "/dev/dashboard",
              },
            });
          }

          console.log("gogogo");

          return new Response("", {
            status: 302,
            headers: {
              Location: "/",
            },
          });
        }
      }
    } catch (e) {
      console.log(e);

      return ctx.render({ dev, error: "Something went wrong" });
    }

    return ctx.render({ dev, error });
  },
};
export default function AuthScreen({
  data: { dev, error },
}: PageProps<Data>) {
  return (
    <>
      <div class="h-screen p-4 mx-auto bg-gradient-to-br from-gray-900 via-fuchsia-950 to-secondary-900 hue-rotate-15 bg-opacity-40 pt-20 flex items-center justify-center">
        <div className="p-4 -mt-56 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg backdrop-brightness-25 bg-opacity-10  w-full max-w-md min-w-min">
          {error && (
            <div
              class="bg-red-100 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{error}</span>
            </div>
          )}
          <div class=" ">
            <h1 class="text-3xl font-bold lg:text-4xl m-4 text-white overflow-visible">
              Sign in to Fync
            </h1>
            <p class="text-gray-400 text-md m-4">
              using your Fync account
            </p>

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

              <a href="/account/forgot" class="text-primary-400 text-md m-4">
                Forgot your password?
              </a>
              <div class="mt-5" />
              <div class="flex flex-row justify-between">
                <a href="/signup" class="text-primary-400 text-md m-4">
                  Create an account
                </a>

                <Button type="submit" class="hover:brightness-75 p-2">
                  Next
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
