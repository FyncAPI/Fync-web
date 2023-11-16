import { Handlers, PageProps } from "$fresh/server.ts";
import { Friendship, User } from "@/utils/type.ts";
import { WithSession } from "fresh-session";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";

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

    console.log(user, accessToken, "user");
    if (!user || !accessToken) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }

    try {
      const res = await axios.get(endpoints.user.friends);

      const friends = res.data;

      return ctx.render({
        friends,
      });
    } catch (e) {
      console.log(e.data);
      // return ctx.render({ user, apps: [] });
      if (e.response.status === 401) {
        session.clear();
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/login",
          },
        });
      } else {
        return ctx.render({ friends: [], error: e.data });
      }
    }
  },
};

export default function Page(props: PageProps) {
  const { friends } = props.data;
  return (
    <main>
      <h1>Friends</h1>
      {JSON.stringify(friends)}
      <p>This is the about page.</p>
    </main>
  );
}
