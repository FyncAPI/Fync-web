import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: (req, ctx) => {
    console.log(ctx.state.query, ctx.state.query || "", "query");
    return new Response("", {
      status: 302,
      headers: {
        "Location": "/account/create/1" + (ctx.state.query || ""),
      },
    });
  },
};
