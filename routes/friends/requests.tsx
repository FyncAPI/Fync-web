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
  outwards: User[];
  inwards: User[];
  user: User;
};

export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    const query = new URL(req.url).searchParams;
    const user = ctx.state.session.get("user");
    const url = endpoints.user.requests;

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${ctx.state.session.get("accessToken")}`,
        },
      });
      console.log(data, "data");
      return await ctx.render({
        user: user,
        inwards: data.inwardFriendRequests,
        outwards: data.outwardFriendRequests,
      });
    } catch (e) {
      console.log(e.response.data, "e");
      return await ctx.render({
        error: e.data,
        user,
        inwards: [],
        outwards: [],
      });
    }
  },
};

export default function Requests({ data }: PageProps<Data>) {
  const { error, user, inwards, outwards } = data;
  return (
    <>
      <UserNavbar user={user} />
      <div class="p-6 gap-3 flex flex-row align-middle justify-between">
        <h1 class="text-2xl font-medium text-white text-center self-center">
          Friend Requests
        </h1>
      </div>
      <div class="p-6 gap-3 flex flex-row align-middle justify-between">
        <h1 class="text-2xl font-medium text-white text-center self-center">
          inwards
        </h1>
      </div>
      <UserList user={user} users={inwards} acceptable={true} />
      <div class="p-6 gap-3 flex flex-row align-middle justify-between">
        <h1 class="text-2xl font-medium text-white text-center self-center">
          pending
        </h1>
      </div>
      <UserList user={user} users={outwards} friendable={true} />
    </>
  );
}
