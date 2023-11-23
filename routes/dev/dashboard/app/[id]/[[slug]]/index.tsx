import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { endpoints } from "@/constants/endpoints.ts";
import { App, appParser, Interaction, User } from "@/utils/type.ts";
import CopyText from "@/islands/CopyText.tsx";
import { Input } from "@/components/Input.tsx";
import AppDataEditor from "@/islands/AppDataEditor.tsx";
import { DevNavbar } from "@/components/DevNavbar.tsx";
import axios from "npm:axios";
import Banner from "@/islands/Banner.tsx";
import { Button } from "@/components/Button.tsx";
import AuthUrlGenerator from "@/islands/AuthUrlGenerator.tsx";
import InteractionEditor from "@/islands/InteractionEditor.tsx";
import { Partial } from "$fresh/runtime.ts";
import InteractionsEditor from "@/islands/InteractionsEditor.tsx";
import AppEditorPartial from "@/components/AppEditorPartial.tsx";

type Data = {
  user: User;
  app?: App;
  interactions?: Interaction[];
  updateUrl?: string;
  error?: string;
  env?: string;
};

const getApp = async (id: string, token: string) => {
  const res = await fetch(endpoints.dev.app.get + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return new Response("", {
      status: 302,
      headers: {
        Location: "/dev/dashboard",
      },
    });
  }

  const app = await res.json();
  return app;
};
const getInteractions = async (id: string, token: string) => {
  const res = await axios.get(
    endpoints.dev.app.interactions.replace(
      "{id}",
      id,
    ),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const interactions = await res.data;
  console.log(interactions, "iiio");
  return interactions;
};
export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    const domain = req.url.split("/").slice(0, 3).join("/");
    const id = ctx.params.id;
    const slug = ctx.params.slug;
    const { session } = ctx.state;
    const token = session.get("devToken");

    try {
      const res = await fetch(endpoints.dev.app.get + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return new Response("", {
          status: 302,
          headers: {
            Location: "/dev/dashboard",
          },
        });
      }

      const app = await res.json();

      return ctx.render({
        app,
        user: session.get("user"),
        updateUrl: endpoints.dev.app.update + id,
        env: domain == "http://localhost:8000" ? "dev" : "prod",
      });
    } catch (e) {
      return ctx.render({
        user: session.get("user"),
        error: e.message,
      });
    }
  },
  async POST(req, ctx) {
    const id = ctx.params.id;
    console.log("putshit", id);

    // return new Response("ok");
    const { session } = ctx.state;
    const token = session.get("devToken");

    const form = await req.formData();
    const data = form.get("changes");
    console.log(data);

    if (!token) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/dev/login",
        },
      });
    }

    try {
      const res = await axios.put(endpoints.dev.app.update + id, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.statusText, "response update");

      if (!res.data) {
        const app = await getApp(id, token);
        return ctx.render({
          app,
          user: session.get("user"),
          error: "error updating ",
        });
      }

      console.log(res.data, "should beok");

      return ctx.render({ app: res.data, user: session.get("user") });
    } catch (e) {
      console.log(e);
      return ctx.render({
        app: await getApp(id, token),
        user: session.get("user"),
        error: e.message,
      });
    }
  },
};
export default function AppData(props: PageProps<Data>) {
  const { data, params } = props;

  return (
    <>
      <DevNavbar user={data.user} />
      <div f-client-nav>
        <div class="magicpattern -z-10 top-0 absolute w-full h-full  bg-gradient-to-b from-current to-transparent" />
        {data.error && (
          <Banner
            text={JSON.stringify(data.error)}
            type={"error"}
          />
        )}
        {data.app && (
          <>
            <div class="flex flex-row m-5 md:m-10 rounded-md items-center justify-between ">
              <div>
                <div class="rounded-md items-center justify-center bg-gray-500 flex w-24 h-24 m-2 gradient-grid">
                  {data.app.image
                    ? (
                      <img
                        src={data.app.image}
                        class="rounded-md"
                      />
                    )
                    : (
                      <h2 class="text-4xl font-medium text-white self-center text-center -mt-1">
                        {data?.app?.name?.substring(0, 3)}
                      </h2>
                    )}
                </div>
              </div>
              <div class={"flex flex-col ml-2 mr-auto text-left"}>
                <h2 class="text-3xl font-medium text-white  ">
                  {data.app.name}
                </h2>
                <p class="text-primary-200 text-lg ">
                  {data.app.description}
                </p>
              </div>
            </div>
            <div class="m-5 ">
              <h1 class="text-2xl font-medium text-white">App data</h1>

              <div class="my-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
                <div class="flex flex-col">
                  <h4 class="text-primary-200 text-lg">
                    Client id
                  </h4>
                  <CopyText text={data.app.clientId} />
                  <h4 class="text-primary-200 text-lg mt-4">
                    Client secret
                  </h4>
                  <CopyText text={data.app.clientSecret} />
                </div>
              </div>
              <h1 class="text-2xl font-medium text-white">OAuth data</h1>
              <aside class="text-primary-200 text-lg gap-3 mx-4">
                <a
                  href={`/dev/dashboard/app/${data.app._id}/`}
                  f-partial={`/partials/dev/dashboard/app/${data.app._id}/`}
                >
                  Oauth
                </a>
                <a
                  href={`/dev/dashboard/app/${data.app._id}/interactions`}
                  f-partial={`/partials/dev/dashboard/app/${data.app._id}/interactions`}
                >
                  Edit interactions
                </a>
                <a
                  href={`/dev/dashboard/app/${data.app._id}/discord`}
                  f-partial={`/partials/dev/dashboard/app/${data.app._id}/discord`}
                >
                  Discord
                </a>
              </aside>

              <AppEditorPartial
                slug={params.slug}
                app={data.app}
                interactions={data.interactions}
              />
              <div class="mt-5 ">
                <h1 class="text-2xl font-medium text-white">
                  Auth Url Generator
                </h1>

                <div class="my-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
                  <AuthUrlGenerator
                    urls={data.app.redirects || []}
                    clientId={data.app.clientId}
                    env={data.env}
                  />
                </div>
                A
              </div>
              <a
                class="text-2xl font-medium text-white"
                href={`/dev/dashboard/app/${data.app._id}/interactions`}
              >
                interactions
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
