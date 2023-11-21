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
import UserNavbar from "@/islands/UserNavbar.tsx";
import { UserList } from "@/components/UserList.tsx";
import { FriendList } from "@/components/FriendList.tsx";

type Data = {
  friends: { user: User; friendship: Friendship }[];
  me: User;
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
      console.log(res.data);

      const friends = z.object({
        user: userParser,
        friendship: friendshipParser,
      }).array().parse(res.data.data);

      return ctx.render({
        friends,
        me: user,
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
        return ctx.render({
          friends: [],
          error: e?.error || "sum wong",
          me: user,
        });
      }
    }
  },
};

export default function Friends(props: PageProps) {
  const { friends, me, error } = props.data;
  return (
    <>
      <UserNavbar user={me} />
      {error && <Banner text={error} type="error" />}
      <LinkButton href="/friends/requests">
        reqs
      </LinkButton>
      <FriendList friends={friends} me={me} />
      {JSON.stringify(friends)}
      <p>This is the about page.</p>
    </>
  );
}
