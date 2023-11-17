// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { cookieSession, WithSession } from "fresh-session";

export type State = {} & WithSession;

const session = cookieSession();

function sessionHandler(req: Request, ctx: MiddlewareHandlerContext<State>) {
  return session(req, ctx);
}
async function protector(req: Request, ctx: MiddlewareHandlerContext<State>) {
  // const protectedRoutes = [
  //   "/",
  //   "/signup",
  //   "/dev",
  // ];
  const { session } = ctx.state;

  const path = new URL(req.url).pathname;
  // console.log("path", path);

  if (path === "/") {
    const user = session.get("user");
    if (user) {
      return new Response("Already logged in", {
        status: 302,
        headers: {
          Location: "/home",
        },
      });
    }
  }

  if (path == "/login") {
    const user = session.get("user");
    const accessToken = session.get("accessToken");
    if (user && accessToken) {
      return new Response("Already logged in", {
        status: 302,
        headers: {
          Location: "/home",
        },
      });
    }
  }
  // if (!allowed.includes(path) && !session.get("user")) {
  //   return new Response("Not allowed", {
  //     status: 403,
  //   });
  // }

  const resp = await ctx.next();

  return resp;
}
export const handler = [sessionHandler, protector];
