import { Handlers } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Providers } from "deno_grant";
import { fyncOauthClient } from "@/oauthClient.ts";
import { endpoints } from "@/constants/endpoints.ts";
import { scopes } from "@/constants/scopes.ts";

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

      if (JSON.stringify(scope) != JSON.stringify(scopes.dev)) {
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
  //   try {
  //     const tokens = await fyncOauthClient.code.getToken(req.url);

  //     // const params = new URLSearchParams(new URL(req.url).search);
  //     // console.log(params.getAll("code"), "code");
  //     // const request = buildTokenRequest(
  //     //   params.get("code") as string,
  //     //   params.get("redirect_uri") as string,
  //     // );

  //     // const accessTokenResponse = await fetch(request);

  //     // console.log(accessTokenResponse);
  //     // if (!accessTokenResponse.ok) {
  //     //   return new Response(
  //     //     JSON.stringify({
  //     //       error: "no token",
  //     //     }),
  //     //     {
  //     //       status: 400,
  //     //     },
  //     //   );
  //     // }

  //     // const tokens = await accessTokenResponse.json();

  //     console.log(tokens.accessToken, "tpkensit");

  //     if (!tokens) {
  //       return new Response(
  //         JSON.stringify({
  //           error: "no token",
  //         }),
  //         {
  //           status: 400,
  //         },
  //       );
  //     }
  //     return new Response(
  //       JSON.stringify({
  //         tokens,
  //       }),
  //       {
  //         status: 200,
  //       },
  //     );
  //     const profile = await denoGrant.getProfile(
  //       Providers.google,
  //       tokens.accessToken,
  //     );

  //     if (!profile) {
  //       return new Response(
  //         JSON.stringify({
  //           error: "no profile",
  //         }),
  //         {
  //           status: 400,
  //         },
  //       );
  //     }

  //     const { session } = ctx.state;
  //     session.set("createUser", profile);
  //     console.log(profile, "setting session");

  //     //redirect to create user page
  //     return new Response("", {
  //       status: 302,
  //       headers: { Location: "/account/create" },
  //     });
  //   } catch (error) {
  //     console.log(error, "error");
  //     return new Response(
  //       JSON.stringify(error),
  //       {
  //         status: 400,
  //       },
  //     );
  //   }
  // },
  POST(req, ctx) {
    console.log("post");
  },
};
