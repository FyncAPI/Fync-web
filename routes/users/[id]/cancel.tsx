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
      console.log(endpoints.user.cancelFriend.replace("{id}", id), "sassd");
      const res = await axios.post(
        endpoints.user.cancelFriend.replace("{id}", id),
        {},
        {
          headers: {
            Authorization: `Bearer ${session.get("accessToken")}`,
          },
        },
      );

      const data = await res.data;
      console.log(data, "resdata");
      // Get the Referer header to determine the previous page
      const referer = req.headers.get("Referer");

      return new Response("", {
        status: 302,
        headers: {
          Location: referer || "/users/" + id, // Use Referer if available, otherwise redirect to a default location
        },
      });
    } catch (e) {
      console.log(e.response, "er");

      return new Response(e, {
        status: 302,
        headers: {
          Location: "/users/" + id + "/shit error",
        },
      });
    }
  },
};
