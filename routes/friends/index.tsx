import { Handlers, PageProps } from "$fresh/server.ts";
import {
  Friendship,
  friendshipParser,
  User,
  userParser,
} from "@/utils/type.ts";
import { WithSession } from "fresh-session";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";
import { z } from "zod";
import Banner from "@/islands/Banner.tsx";
import { LinkButton } from "@/components/LinkButton.tsx";

type Data = {
  friends: { user: User; friendship: Friendship }[];
  error?: string | null;
};

export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    const { session } = ctx.state;

    console.log(session.data, "session");
    // const user = await ctx.state.db.collection("users").findOne({
    //   _id: ctx.state.session.get("userId"),
    // });
    const user = session.get("user");
    const accessToken = session.get("accessToken");

    if (!user || !accessToken) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }

    try {
      const res = await axios.get(endpoints.friends.get, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const friends = z.object({
        user: userParser,
        friendship: friendshipParser,
      }).array().parse(res.data);

      return ctx.render({
        friends,
      });
    } catch (e) {
      console.log(e);
      // return ctx.render({ user, apps: [] });
      if (e?.response?.status === 401) {
        session.clear();
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/login",
          },
        });
      } else {
        return ctx.render({ friends: [], error: e?.error || "sum wong" });
      }
    }
  },
};

export default function Page(props: PageProps) {
  const { friends, error } = props.data;
  return (
    <main>
      <Banner text={error} type="error" />
      <h1>About</h1>
      <LinkButton href="/friends/requests">
        reqs
      </LinkButton>
      {JSON.stringify(friends)}
      <p>This is the about page.</p>
    </main>
  );
}
