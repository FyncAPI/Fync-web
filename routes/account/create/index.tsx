import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: (req, ctx) => {
    const search = req.url.split("authUrl=")[1];
    console.log(search, "sss");
    return new Response("", {
      status: 302,
      headers: {
        "Location": "/account/create/1" + ("?authUrl=" + search || ""),
      },
    });
  },
};
