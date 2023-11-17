import { Handlers, PageProps } from "$fresh/server.ts";
import { User } from "@/utils/type.ts";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";

type Data = {
  error?: string | null;
  users: User[];
};
export const handler: Handlers = {
  async GET(req, ctx) {
    const query = new URL(req.url).searchParams;
    const q = query.get("q");
    const url = q ? endpoints.user.get + "?q=" + q : endpoints.user.get;
    console.log(q, "q");
    try {
      const users = await axios.get(url);
      console.log(users.data);
      return await ctx.render({
        users: users.data,
      });
    } catch (e) {
      //   console.log(e);
      return await ctx.render({
        error: e.data,
      });
    }
  },
};
export default function Search(props: PageProps<Data>) {
  return (
    <div>
      Hello {JSON.stringify(props.data.error)}{" "}
      {JSON.stringify(props.data.users)}
    </div>
  );
}
