import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { App, User } from "@/utils/type.ts";
import UserNavbar from "@/islands/UserNavbar.tsx";
import * as cookie from "https://deno.land/std@0.182.0/http/cookie.ts";
import { WithSession } from "fresh-session";
import { DevNavbar } from "@/components/DevNavbar.tsx";
import { Button } from "@/components/Button.tsx";
import { LinkButton } from "@/components/LinkButton.tsx";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";
import { AppsList } from "@/components/AppsList.tsx";

type Data = {
  user: User;
  apps: App[];
};

export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
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

    try {
      const res = await axios.get(endpoints.dev.app.get, {
        headers: {
          Authorization: `Bearer ${session.get("accessToken")}`,
        },
      });

      console.log(res, res.data, "res");
      const apps = res.data;

      return ctx.render({ user, apps });
    } catch (e) {
      console.log(e);
      // return ctx.render({ user, apps: [] });
      if (e.response.status === 401) {
        session.clear();
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/dev/login",
          },
        });
      }
    }
  },
};

export default function DashboardPage(props: PageProps<Data>) {
  const { data } = props;
  return (
    <>
      <DevNavbar user={data.user} />
      <div class="h-screen">
        <div class="p-6 gap-3 flex flex-row align-middle justify-between">
          <h1 class="text-3xl font-medium text-white text-center self-center">
            Dashboard
          </h1>
          <LinkButton variant="primary" href="/dev/dashboard/create-app">
            Create app
          </LinkButton>
        </div>
        {/* create a apps list */}

        <AppsList apps={data.apps} />

        {props.data.user
          ? (
            <div>
              {JSON.stringify(props.data.user)}
            </div>
          )
          : (
            <div>
              hell no
            </div>
          )}
      </div>
    </>
  );
}
