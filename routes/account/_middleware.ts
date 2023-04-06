// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createEmailUserParser, createGoogleUserParser } from "@/utils/type.ts";
import { State } from "@/routes/_middleware.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const { session } = ctx.state;
  //   console.log(session.data, "zx");

  if (!session.data) {
    return new Response("", {
      status: 302,
      headers: {
        "Location": "oauth2/auth",
      },
    });
  }

  const result = createEmailUserParser.or(createGoogleUserParser).safeParse(
    session.data.createUser,
  );

  if (!result.success) {
    return new Response("", {
      status: 302,
      headers: {
        "Location": "oauth2/auth",
      },
    });
  }

  console.log(result.data, "result.data", result);

  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}
