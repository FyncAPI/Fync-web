import { Handlers } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Providers } from "deno_grant";
import { denoGrant } from "@/utils/grant.ts";

export type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession // indicate with Typescript that the session is in the `ctx.state`
> = {
  async GET(req, ctx) {
    try {
      console.log("teti", ctx.params, req.url);
      const tokens = await denoGrant.getToken(Providers.discord, req.url);

      if (!tokens) {
        return new Response(
          JSON.stringify({
            error: "no token",
          }),
          {
            status: 400,
          },
        );
      }

      const profile = await denoGrant.getProfile(
        Providers.discord,
        tokens.accessToken,
      );

      if (!profile) {
        return new Response(
          JSON.stringify({
            error: "no profile",
          }),
          {
            status: 400,
          },
        );
      }

      console.log(profile);

      const { session } = ctx.state;
      session.set("createUser", profile);
      console.log(profile, "setting session");

      //redirect to create user page
      return new Response("", {
        status: 302,
        headers: { Location: "/account/create" },
      });
    } catch (error) {
      console.log(error, "error");
      return new Response(
        JSON.stringify({
          error: "Invalid token",
        }),
        {
          status: 400,
        },
      );
    }
  },
  POST(req, ctx) {
    console.log("post");

    return new Response("yo");
  },
};
