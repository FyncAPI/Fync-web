import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { User } from "@/utils/type.ts";
import UserNavbar from "@/islands/UserNavbar.tsx";
import * as cookie from "https://deno.land/std@0.182.0/http/cookie.ts";
import { WithSession } from "fresh-session";
import Counter from "@/islands/Counter.tsx";

type Data = {
  user: User;
};

export const handler: Handlers<Data, WithSession> = {
  GET(req, ctx) {
    const cookies = cookie.getCookies(req.headers);
    const { session } = ctx.state;
    console.log(session.data, "session data");

    // const user = await ctx.state.db.collection("users").findOne({
    //   _id: ctx.state.session.get("userId"),
    // });
    const user = session.get("user");
    console.log(user, "usdfd");

    if (!user) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }

    return ctx.render({ user });
  },
};

export default function HomePage(props: PageProps<Data>) {
  const { data } = props;
  return (
    <>
      <UserNavbar user={data.user} />
      <div class="h-screen">
        {props.data.user
          ? (
            <div>
              {JSON.stringify(props.data.user)}
              <image class={"w-20 h-20"} src={props.data.user.profilePicture} />
              <div>
                <h2>{props.data.user.name}</h2>
              </div>
            </div>
          )
          : (
            <div>
              hell no
            </div>
          )}
      </div>
    </>
  );
}
