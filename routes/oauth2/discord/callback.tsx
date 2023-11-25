import { Handlers } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Providers } from "deno_grant";
import { denoGrant } from "../../../utils/grant.ts";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";

export type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession // indicate with Typescript that the session is in the `ctx.state`
> = {
  async GET(req, ctx) {
    try {
      const state = new URL(req.url).searchParams.get("state");
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
      //   {
      //   "id": "417624995770925077",
      //   "username": "xb1g",
      //   "avatar": "8a5cdee178327d692f5dc8efd4fc2d15",
      //   "discriminator": "0",
      //   "public_flags": 4194432,
      //   "premium_type": 0,
      //   "flags": 4194432,
      //   "banner": null,
      //   "accent_color": 1708830,
      //   "global_name": "big",
      //   "avatar_decoration_data": null,
      //   "banner_color": "#1a131e",
      //   "mfa_enabled": false,
      //   "locale": "en-US",
      //   "email": "big168bk@gmail.com",
      //   "verified": true
      //   }

      const userRes = await axios.post(endpoints.auth.discord, profile, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { session } = ctx.state;
      session.set("discordProfile", profile);

      if (userRes.status == 200) {
        const { user, accessToken } = userRes.data;
        session.set("user", user);
        session.set("accessToken", accessToken);

        if (state) {
          const url = new URL(decodeURIComponent(state.split("authUrl=")[1]));
          return new Response(null, {
            status: 302,
            headers: {
              location: url.toString(),
            },
          });
        }

        return new Response(null, {
          status: 302,
          headers: {
            location: "/home",
          },
        });
      }
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
};
