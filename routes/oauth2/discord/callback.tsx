import { Handlers } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Providers } from "deno_grant";
import { denoGrant } from "../../../utils/grant.ts";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";
import "$std/dotenv/load.ts";

export type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession // indicate with Typescript that the session is in the `ctx.state`
> = {
  async GET(req, ctx) {
    try {
      const state = new URL(req.url).searchParams.get("state");
      const tokens = await denoGrant.getToken(Providers.discord, req.url);

      console.log(tokens, "discord tokens");
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
      const { session } = ctx.state;
      session.set("discordProfile", profile);

      const userRes = await axios.post(endpoints.auth.discord.login, profile, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${
            btoa(
              Deno.env.get("FYNC_CLIENT_ID") + ":" +
                Deno.env.get("FYNC_CLIENT_SECRET"),
            )
          }`,
        },
      });

      console.log(userRes.status, "userRes");
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
      } else if (userRes.status == 204) {
        console.log("no user");
        let registerUrl = "/account/create";
        state && (registerUrl += `?authUrl=${state.split("authUrl=")[1]}`);
        console.log(registerUrl, "registerUrl");
        return new Response(null, {
          status: 302,
          headers: {
            location: registerUrl,
          },
        });
      }

      //redirect to create user page
      return new Response("", {
        status: 302,
        headers: { Location: "/account/create" },
      });
    } catch (e) {
      console.log(e);
      console.log(e.error, "error");
      if (e?.error?.response?.status == 404) {
        return new Response("", {
          status: 302,
          headers: { Location: "/account/create" },
        });
      }
      console.log(e, "ex");
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
