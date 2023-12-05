import { Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";
import { WithSession } from "fresh-session";

type Data = {};
export const handler: Handlers<Data, WithSession> = {
  async POST(req, ctx) {
    const id = ctx.params.id;
    try {
      const { session } = ctx.state;

      console.log("ACCESSTOKEN", session.get("accessToken"));
      const res = await axios.post(
        endpoints.user.addFriend.replace("{id}", id),
        {},
        {
          headers: {
            Authorization: `Bearer ${session.get("accessToken")}`,
          },
        },
      );

      const data = await res.data;
      console.log(data);
      // Get the Referer header to determine the previous page
      const referer = req.headers.get("Referer");

      return new Response("", {
        status: 302,
        headers: {
          Location: referer || "/users/" + id, // Use Referer if available, otherwise redirect to a default location
        },
      });
      // return new Response("", {
      //   status: 302,
      //   headers: {
      //     Location: "/users/" + id,
      //   },
      // });
    } catch (e) {
      return new Response(e.response.data.error, {
        status: 400,
      });
      // return new Response(e, {
      //   status: 302,
      //   headers: {
      //     Location: "/users/" + id,
      //   },
      // });
    }
  },
};
