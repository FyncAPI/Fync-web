// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { State } from "@/routes/_middleware.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const { session } = ctx.state;
  // console.log(session.data, "zx");
  if (!session.get("devToken")) {
    return new Response("", {
      status: 302,
      headers: {
        Location: "/dev/login",
      },
    });
  }

  const resp = await ctx.next();
  // resp.headers.set("server", "fresh server");
  return resp;
}
