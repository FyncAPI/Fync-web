import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { User } from "@/utils/type.ts";
import UserNavbar from "@/islands/UserNavbar.tsx";
import * as cookie from "https://deno.land/std@0.182.0/http/cookie.ts";
import { WithSession } from "fresh-session";
import { DevNavbar } from "@/components/DevNavbar.tsx";
import { Button } from "@/components/Button.tsx";
import { Input } from "@/components/Input.tsx";
import { LinkButton } from "@/components/LinkButton.tsx";
import Banner from "@/islands/Banner.tsx";
import { endpoints } from "@/constants/endpoints.ts";

type Data = {
  user?: User;
  error?: string | null;
};

export const handler: Handlers<Data, WithSession> = {
  GET(req, ctx) {
    const cookies = cookie.getCookies(req.headers);
    const { session } = ctx.state;

    console.log(session.data, "session");
    // const user = await ctx.state.db.collection("users").findOne({
    //   _id: ctx.state.session.get("userId"),
    // });
    const user = session.get("user");

    if (!user) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/dev/login",
        },
      });
    }

    return ctx.render({ user });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const name = form.get("appname");
    const description = form.get("appdesc");
    const url = form.get("appurl");
    const term = form.get("terms");

    console.log(name, description, term);

    if (!term) {
      return ctx.render({ error: "Please agree to the terms" });
    }

    const { session } = ctx.state;
    const token = session.get("devToken");

    const res = await fetch(endpoints.dev.app.create, {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        url,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log(res);
      return ctx.render({ error: "Something went wrong" });
    }

    const appId = await res.json();

    console.log(appId, "app");
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dev/dashboard/app/" + appId,
      },
    });
  },
};

export default function CreateAppPage(props: PageProps<Data>) {
  const { data } = props;
  return (
    <>
      <DevNavbar user={data.user} />
      <div class="h-screen">
        <div class="flex flex-col p-8 gap-3 md:p-20">
          <h1 class="text-2xl font-medium text-white">Create app</h1>
          <div class="p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 sticky top-0 z-10">
            {data.error && (
              <Banner type="error" text={data.error} />
              // <div class="bg-red-500 text-white p-2 rounded-md m-2">
              //   {data.error}
              // </div>
            )}
            <form method="POST" class="grid grid-cols-1 gap-2 ">
              <h3 class="text-xl font-medium text-white ml-3">App Name</h3>
              <Input
                type="appname"
                name="appname"
                placeholder="App name"
                required
              />
              <h3 class="text-xl font-medium text-white ml-3">
                Description
              </h3>
              <Input
                type="appdesc"
                name="appdesc"
                placeholder="App description"
                required
              />
              <h3 class="text-xl font-medium text-white ml-3">
                Website
              </h3>
              <Input
                type="appurl"
                name="appurl"
                placeholder="App website"
                // required
              />
              <div class="flex flex-row items-center gap-2 ml-2">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  required
                  class="rounded-md"
                />
                <label for="terms" class="text-white">
                  I agree to the{" "}
                  <a
                    href="/dev/terms"
                    class="text-primary-400 hover:text-primary-300"
                  >
                    terms of service
                  </a>
                </label>
              </div>
              <div class="flex flex-row ">
                <Button type="submit" variant="primary">
                  Create app
                </Button>
                <LinkButton
                  type="button"
                  variant="cancel"
                  href="/dev/dashboard"
                >
                  Cancel
                </LinkButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
