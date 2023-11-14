import { Handlers } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Providers } from "deno_grant";
import { fyncOauthClient } from "@/oauthClient.ts";
import { endpoints } from "@/constants/endpoints.ts";
import { cx } from "twind";
import axios from "npm:axios";

export type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession // indicate with Typescript that the session is in the `ctx.state`
> = {
  async POST(req, ctx) {
    // redirect the req to the backend
    try {
      const form = await req.formData();

      const headers = req.headers;
      console.log(headers, "headers");

      // const { code, client_id, client_secret, grant_type } = body;
      const code = form.get("code");
      const client_id = form.get("client_id") ||
        atob(headers.get("Authorization")?.split(" ")[1] || "").split(":")[0];
      const client_secret = form.get("client_secret") ||
        atob(headers.get("Authorization")?.split(" ")[1] || "").split(":")[1];
      const grant_type = form.get("grant_type");

      console.log(form, "headerx");
      console.log(code, "code");
      console.log(client_id, "client_id");
      console.log(client_secret, "client_secret");
      console.log(grant_type, "grant_type");
      const newHeader = new Headers();
      newHeader.set("Content-Type", "application/x-www-form-urlencoded");
      newHeader.set(
        "Authorization",
        "Basic " + btoa(client_id + ":" + client_secret),
      );
      console.log(newHeader, "newHeader");

      const res = await axios.post(endpoints.auth.token, {
        code,
        client_id,
        client_secret,
        grant_type,
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(client_id + ":" + client_secret),
        },
      });

      console.log(res.data, "rerx");

      // setTimeout(() => {
      return new Response(
        JSON.stringify(res.data),
        {
          status: 200,
        },
      );
      // }, 2000);
      //   return res.data;
    } catch (error) {
      console.log(Object.keys(error), "erx");
      //400

      return new Response(
        JSON.stringify({
          error: "invalid_request",
          error_description: error,
        }),
        {
          status: 400,
        },
      );
    }
  },
};
