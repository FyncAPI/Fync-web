import { Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";
import { WithSession } from "fresh-session";

type Data = {};
export const handler: Handlers<Data, WithSession> = {
  async POST(req, ctx) {
    const id = ctx.params.id;
    const { session } = ctx.state;

    console.log(session.get("accessToken"));
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

    return new Response(data.success, {
      status: 302,
      headers: {
        Location: "/users/" + id,
      },
    });
  },
};
