import { Handlers } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Providers } from "deno_grant";
import { endpoints } from "@/constants/endpoints.ts";
import axios from "npm:axios";

export type Data = { session: Record<string, string> };

export const handler: Handlers<
  Data,
  WithSession // indicate with Typescript that the session is in the `ctx.state`
> = {
  async GET(req, ctx) {
    // redirect the req to the backend
    try {
      const { session } = ctx.state;
      const urlToken = new URL(req.url).searchParams.get("token");
      const token = urlToken || session.get("accessToken");
      console.log(token, "tk");

      const res = await axios.get(endpoints.user.me, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
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
      console.log(error.message, "erx");
      //400

      return new Response(
        JSON.stringify(error.response.data),
        {
          status: 400,
        },
      );
    }
  },
};
