import { Handlers } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { discordClient } from "@/utils/discordClient.ts";
import { denoGrant } from "@/utils/grant.ts";
import { Providers } from "deno_grant";

export type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession // indicate with Typescript that the session is in the `ctx.state`
> = {
  GET(req, ctx) {
    const search = new URL(req.url).search;
    let uri = denoGrant.getAuthorizationUri(Providers.discord);
    if (search) {
      uri?.searchParams.append("state", search);
    }

    return new Response("", {
      status: 302,
      headers: {
        Location: uri,
      },
    });
  },
  async POST(req, ctx) {
    // wait for profile and token from backend after oauth2
    const userData = await req.json();
    // save user data in session
    console.log(userData, "sdfxx");

    const { session } = ctx.state;
    session.set("createUser", userData);

    //redirect to create user page
    return new Response("", {
      status: 307,
      headers: { Location: "/account/create" },
    });
  },
};
