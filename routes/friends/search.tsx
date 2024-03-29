import { Handlers, PageProps } from "$fresh/server.ts";
import { User } from "@/utils/type.ts";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";
import { Navbar } from "@/components/Navbar.tsx";
import { WithSession } from "fresh-session";

type Data = {
  error?: string | null;
  user?: User;
  users: User[];
};
export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    const query = new URL(req.url).searchParams;
    const user = ctx.state.session.get("user");
    const q = query.get("q");
    const url = q ? endpoints.user.get + "?q=" + q : endpoints.user.get;
    console.log(q, "q");
    try {
      const users = await axios.get(url);
      console.log(users.data);
      return await ctx.render({
        users: users.data,
        user: user,
      });
    } catch (e) {
      //   console.log(e);
      return await ctx.render({
        error: e.data,
        user,
        users: [],
      });
    }
  },
};
export default function Search({ data }: PageProps<Data>) {
  const { error, users, user } = data;
  return (
    <>
      <Navbar user={user} />
      Hello {JSON.stringify(error)} {JSON.stringify(users)}
      {users?.map((user) => (
        <div key={user._id}>
          {user?.username} {user.email}
        </div>
      ))}
    </>
  );
}
