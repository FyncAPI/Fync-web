import { Handlers } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Providers } from "deno_grant";
import { endpoints } from "@/constants/endpoints.ts";
import { scopes } from "@/constants/scopes.ts";
import { fyncOauthClient } from "@/utils/fyncClient.ts";

export type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession // indicate with Typescript that the session is in the `ctx.state`
> = {
  async GET(req, ctx) {
    console.log(req);
    try {
      const tokens = await fyncOauthClient.code.getToken(req.url);
      console.log(tokens);
      const { accessToken, scope } = tokens;
      const { session } = ctx.state;

      if (!scope || !scope.includes(scopes.dev.admin)) {
        console.log(!scope, scope, scopes.dev.admin);
        return new Response(
          JSON.stringify({
            error: "sumting wong",
          }),
          {
            status: 400,
          },
        );
      }

      session.set("devToken", accessToken);

      const res = await fetch(endpoints.dev.profile, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        return new Response(
          JSON.stringify({
            error: "sumting wong",
          }),
          {
            status: 400,
          },
        );
      }
      const dev = await res.json();

      session.set("user", dev);

      return new Response("", {
        status: 302,
        headers: { Location: "/dev/dashboard" },
      });
    } catch (error) {
      console.log(error, "error");
      return new Response(
        `<div>
<h1>
        ${
          JSON.stringify({
            error,
          })
        }
        </h1>
        <a href="/dev/login">Login</a>
        </div>`,
        {
          status: 400,
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }
  },
};
