import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Button } from "@/components/Button.tsx";
import { Input } from "@/components/Input.tsx";
import { endpoints } from "../../constants/endpoints.ts";
import { App, User } from "@/utils/type.ts";
import { LinkButton } from "@/components/LinkButton.tsx";

type Data = {
  error?: string | null;
  redirectUri?: string | null;
  responseType?: string | null;
  clientId?: string | null;
  scope?: string | null;
  state?: string | null;
  app?: App | null;
  user?: User;
};

export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    const user = ctx.state.session.get("user");
    // ctx.state.session.set("authUrl", req.url);

    if (!user) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/oauth2/login",
        },
      });
    }

    const query = new URL(req.url).searchParams;
    console.log(query.toString(), "query");
    // follo oauth2 query params
    const redirectUri = query.get("redirect_uri");
    const responseType = query.get("response_type");
    const clientId = query.get("client_id");
    const scope = query.get("scope");
    const state = query.get("state");

    console.log(clientId, "xlii");

    if (!clientId) return ctx.render({ error: "Invalid client id" });
    if (!redirectUri) return ctx.render({ error: "Invalid redirect uri" });
    if (!responseType) return ctx.render({ error: "Invalid response type" });
    if (!scope) return ctx.render({ error: "Invalid scope" });

    const app = await fetch(endpoints.apps.clientId + clientId);

    if (!app.ok) {
      return ctx.render({ error: "Invalid client id" });
    }

    return ctx.render({
      redirectUri,
      responseType,
      clientId,

      scope,
      state,
      app: await app.json(),
      user,
    });
  },

  async POST(req, ctx) {
    const query = new URL(req.url).searchParams;
    const clientId = query.get("client_id");
    const scope = query.get("scope");
    const redirectUri = query.get("redirect_uri");
    const responseType = query.get("response_type");

    if (!clientId) return ctx.render({ error: "Invalid client id" });
    if (!redirectUri) return ctx.render({ error: "Invalid redirect uri" });
    if (!responseType) return ctx.render({ error: "Invalid response type" });
    if (!scope) return ctx.render({ error: "Invalid scope" });

    const { session } = ctx.state;

    const { _id: userId } = session.get("user") as User;
    const body = {
      clientId,
      userId,
      scopes: scope?.split(","),
    };

    try {
      const url = endpoints.auth.authorize;

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      });

      console.log(res);

      if (res.ok) {
        console.log("ok");
        const { code } = await res.json();

        if (!code) {
          return ctx.render({ error: "Something went wrong" });
        }
        // add code to redirect uri
        const url = new URL(redirectUri);
        url.searchParams.append("code", code);

        return new Response(null, {
          status: 302,
          headers: {
            Location: url.toString(),
          },
        });
      }

      return ctx.render({ error: "Something went wrong" });
    } catch (e) {
      console.log(e);

      return ctx.render({ error: "Something wrong" });
    }
  },
};

export default function AuthScreen({
  data: { app, error, scope, user, redirectUri },
}: PageProps<Data>) {
  return (
    <>
      <div class="h-screen p-4 bg-gradient-to-br from-gray-900 via-fuchsia-950 to-secondary-900 hue-rotate-15 bg-opacity-40 pt-20 flex items-center justify-center">
        <div className="p-4 -mt-56 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg backdrop-brightness-25 bg-opacity-10  w-full max-w-lg min-w-min">
          {error == "Invalid client id"
            ? (
              <div class=" ">
                <h1 class="text-3xl font-bold lg:text-4xl m-4 text-white overflow-visible">
                  Invalid client id
                </h1>
                <p class="text-gray-400 text-md m-4">
                  The client id you provided is invalid
                </p>
              </div>
            )
            : (
              <>
                {error && (
                  <div
                    class="bg-red-100 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <span class="block sm:inline">{error}</span>
                  </div>
                )}
                <>
                  <h1 class="text-2xl font-medium lg:text-4xl m-4 text-white overflow-visible">
                    Authorize{" "}
                    <strong>
                      {app?.name}
                    </strong>
                  </h1>
                  <h3 class="text-gray-400 text-md m-4">
                    by <strong>{app?.owner}</strong>
                  </h3>
                  <p class="text-gray-400 text-md m-4">
                    <strong class={"text-white"}>{app?.name}</strong>{" "}
                    will be able to:
                  </p>
                  <ul class="text-primary-200 text-lg m-4">
                    {scope?.split(",").map((s) => {
                      s = s.trim();
                      const text = s == "dev:admin"
                        ? "turn you into a developer"
                        : s;
                      return <li>{text}</li>;
                    })}
                  </ul>

                  <form method="POST" class="grid grid-cols-1 ">
                    <div class="flex flex-row justify-between">
                      <LinkButton
                        type="cancel"
                        variant="cancel"
                        class="hover:brightness-75 p-2"
                        href={redirectUri + "?error=access_denied"}
                      >
                        Cancel
                      </LinkButton>
                      <Button type="submit" class="hover:brightness-75 p-2">
                        Authorize {app?.name}
                      </Button>
                    </div>
                  </form>
                  <p class="self-center text-gray-400 text-center">
                    authorizing will redirect you to{"  "}
                    <strong>
                      {redirectUri}
                    </strong>
                  </p>
                </>
              </>
            )}
        </div>
      </div>
    </>
  );
}
