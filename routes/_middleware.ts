// routes/_middleware.ts
import { Handlers, MiddlewareHandlerContext } from "$fresh/server.ts";
import { cookieSession, WithSession } from "fresh-session";

export type State = {} & WithSession;

const session = cookieSession();

function sessionHandler(req: Request, ctx: MiddlewareHandlerContext<State>) {
  return session(req, ctx);
}

// export async function protector(
//   req: Request,
//   ctx: MiddlewareHandlerContext<State>,
// ) {
//   const protectedRoutes = [
//     "today",
//     "car",
//     "work",
//     "container",
//     "customer",
//     "driver",
//     "summary",
//   ];
//   const paths = req.url.split("/");
//   const inProtected = protectedRoutes.includes(
//     paths[3],
//   );

//   if (inProtected) {
//     if (!ctx.state.session.has("sessionId")) {
//       console.log("no session id");
//       return new Response("Unauthorized", {
//         status: 401,
//         headers: {
//           "content-type": "text/plain",
//         },
//       });
//     }

//     const sessionId = ctx.state.session.get("sessionId");
//     // check if session is valid
//     // if not, return 401

//     const sessionData = await Sessions.findOne({
//       _id: new ObjectId(sessionId),
//     });

//     if (!sessionData) {
//       console.log("sessionId not found");
//       return new Response("Unauthorized", {
//         status: 401,
//         headers: {
//           "content-type": "text/plain",
//         },
//       });
//     } else {
//       const now = new Date();
//       const expiresAt = sessionData.expiresAt;
//       if (now > expiresAt) {
//         console.log("session expired");
//         return new Response("Unauthorized", {
//           status: 401,
//           headers: {
//             "content-type": "text/plain",
//           },
//         });
//       }

//       // update session
//       console.log("update session");
//       await Sessions.updateOne(
//         { _id: sessionId },
//         {
//           $set: {
//             expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
//           },
//         },
//       );
//     }
//   }
//   console.log("next");
//   const resp = await ctx.next();
//   // resp.headers.set("server", "fresh server");
//   return resp;
// }
export const handler = [sessionHandler];
