import { Handlers, PageProps } from "$fresh/server.ts";
import { User } from "@/utils/type.ts";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";
import { Navbar } from "@/components/Navbar.tsx";
import { WithSession } from "fresh-session";
import UserNavbar from "@/islands/UserNavbar.tsx";
import { UserList } from "@/components/UserList.tsx";

type Data = {
  error?: string | null;
  user?: User;
  users: User[];
  query?: string;
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
        query: q || "",
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
  const { error, users, user, query } = data;
  return (
    <>
      <UserNavbar user={user} />
      <div class="p-6 gap-3 flex flex-row align-middle justify-between">
        <h1 class="text-2xl font-medium text-white text-center self-center">
          Search Results for "{query}"
        </h1>
      </div>

      <UserList user={user} users={users} friendable={true} />
    </>
  );
}
