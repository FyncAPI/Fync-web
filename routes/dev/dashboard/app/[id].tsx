import { Handlers, PageProps } from "$fresh/server.ts";
import { Data } from "@/routes/oauth2/fync/index.tsx";
import { WithSession } from "fresh-session";
import { endpoints } from "@/constants/endpoints.ts";

export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const { session } = ctx.state;
    const token = session.get("authToken");

    if (!token) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/dev/login",
        },
      });
    }

    const res = await fetch(endpoints.dev.app.get + id, {});
  },
};
export default function Greet(props: PageProps) {
  return <div>Hello {props.params.id}</div>;
}
