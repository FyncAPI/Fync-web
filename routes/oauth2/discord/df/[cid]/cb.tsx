import { Handlers } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Providers } from "deno_grant";
import { denoGrant } from "@/utils/grant.ts";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";
import { App } from "@/utils/type.ts";

export type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession // indicate with Typescript that the session is in the `ctx.state`
> = {
  async GET(req, ctx) {
    try {
      console.log("teti", ctx.params, req.url);
      const code = new URL(req.url).searchParams.get("code");
      const cid = ctx.params.cid;

      if (!code || !cid) {
        return new Response(
          JSON.stringify({
            error: "no code",
          }),
          {
            status: 400,
          },
        );
      }

      const appData: App =
        (await axios.get(endpoints.apps.clientId + cid)).data;

      const dcid = appData.discordClientId;
      const dcsecret = appData.discordClientSecret;
      const dcRedirectUri = appData.discordRedirectUri!;

      const redirectUri = `${
        (req.url.includes("http://localhost:8000")
          ? "http://localhost:8000"
          : "https://fync.in") +
        "/oauth2/discord/df/" +
        cid +
        "/cb"
      }`;

      const tokenRequestData = {
        client_id: dcid,
        client_secret: dcsecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        scope: "identify email", // Adjust the scope based on your requirements
      };

      // Make a POST request to the Discord token endpoint
      const res = await axios.post(
        "https://discord.com/api/oauth2/token",
        tokenRequestData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      const tokens = res.data;
      // {
      //   "access_token": "6qrZcUqja7812RVdnEKjpzOL4CvHBFG",
      //   "token_type": "Bearer",
      //   "expires_in": 604800,
      //   "refresh_token": "D43f5y0ahjqew82jZ4NViEr2YafMKhue",
      //   "scope": "identify"
      // }
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
        tokens.access_token,
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
      // check email if exists in server

      const existedRes = (await axios.post(
        endpoints.auth.email.check,
        { email: profile.email },
      )).data;

      const existed = !existedRes.available;

      if (!existed) {
        // https://cdn.discordapp.com/avatars/userId/avatar
        const user = (await axios.post(endpoints.user.create.discord, {
          email: profile.email,
          discordId: profile.id,
          username: profile.username,
          name: profile.global_name || "",
          profilePicture:
            `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
        })).data;
        const res = await axios.post(endpoints.auth.authorize, {
          clientId: cid,
          userId: user._id,
          scopes: ["identify", "email"],
        });

        const { code } = res.data;

        const url = new URL(dcRedirectUri);
        url.searchParams.append("code", code);

        return new Response(null, {
          status: 302,
          headers: {
            Location: url.toString(),
          },
        });

        // return new Response("", {
        //   status: 302,
        //   headers: { Location: "/account/create" },
        // });
        // Just create the user for it
      } else {
        const user = await axios.get(endpoints.user.getByEmail + profile.email);
        // gen code and redirect back to redirectUri
        const res = await axios.post(endpoints.auth.authorize, {
          clientId: cid,
          userId: user.data._id,
          scopes: ["identify", "email"],
        });
        const { code } = res.data;

        const url = new URL(dcRedirectUri);
        url.searchParams.append("code", code);

        return new Response(null, {
          status: 302,
          headers: {
            Location: url.toString(),
          },
        });
      }

      return new Response(JSON.stringify(profile));
      //redirect to create user page
      // return new Response("", {
      //   status: 302,
      //   headers: { Location: "/account/create" },
      // });
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
