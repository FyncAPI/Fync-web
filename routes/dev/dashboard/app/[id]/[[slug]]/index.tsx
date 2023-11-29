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
import TabNavPartial from "@/components/TabNavPartial.tsx";

type Data = {
  user: User;
  app?: App;
  interactions?: Interaction[];
  updateUrl?: string;
  error?: string;
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
  const res = await fetch(
    endpoints.dev.app.interactions.replace(
      "{id}",
      id,
    ),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const interactions_data = await res.json();
  const interactions = interactions_data.success ? interactions_data.data : [];
  //console.log("json", interactions);
  return interactions as Interaction[];
};

export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    const domain = req.url.split("/0").slice(0, 3).join("/");
    const id = ctx.params.id;
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
        interactions: await getInteractions(id, token) as Interaction[],
        updateUrl: endpoints.dev.app.update + id,
      });
    } catch (e) {
      return ctx.render({
        user: session.get("user"),
        interactions: await getInteractions(id, token) as Interaction[],
        error: e.message,
      });
    }
  },
  async POST(req, ctx) {
    const id = ctx.params.id;
    const slug = ctx.params.slug;
    const action = ctx.params.action;
    console.log("putshit", id);

    // return new Response("ok");
    const { session } = ctx.state;
    const token = session.get("devToken");

    const form = await req.formData();

    if (!token) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/dev/login",
        },
      });
    }

    if (slug == undefined) {
      try {
        const data = form.get("changes");

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
            interactions: await getInteractions(id, token) as Interaction[],
            error: "error updating ",
          });
        }

        console.log(res.data, "should beok");

        return ctx.render({
          app: res.data,
          user: session.get("user"),
          interactions: await getInteractions(id, token) as Interaction[],
        });
      } catch (e) {
        console.log(e);
        return ctx.render({
          app: await getApp(id, token),
          user: session.get("user"),
          interactions: await getInteractions(id, token) as Interaction[],
          error: e.message,
        });
      }
    } else if (slug == "interactions") {
      try {
        if (form.get("_id") && form.get("changes")) {
          const data = form.get("changes");
          const interaction_id = form.get("_id") || "";

          const res = await axios.put(
            endpoints.apps.interaction.update.replace(
              "{id}",
              interaction_id.toString(),
            ),
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          console.log(res.statusText, "response update");

          if (!res.data) {
            return ctx.render({
              app: await getApp(id, token),
              user: session.get("user"),
              interactions: await getInteractions(id, token) as Interaction[],
              error: "error updating ",
            });
          }

          console.log(res.data, "should beok");

          return ctx.render({
            app: await getApp(id, token),
            user: session.get("user"),
            interactions: await getInteractions(id, token) as Interaction[],
          });
        }
      } catch (e) {
        console.log(e);
        return ctx.render({
          app: await getApp(id, token),
          user: session.get("user"),
          interactions: await getInteractions(id, token) as Interaction[],
          error: e.message,
        });
      }
    }

    return ctx.render({
      app: await getApp(id, token),
      user: session.get("user"),
      interactions: await getInteractions(id, token) as Interaction[],
    });
  },
};

export default function AppData(props: PageProps<Data>) {
  const { data, params } = props;
  const env = props.url.hostname == "localhost" ? "dev" : "prod";

  console.log(props.url.toString().split("/0").slice(0, 3).join("/"), env);
  console.log("have data:", data?.interactions != undefined);

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
              <TabNavPartial slug={params.slug} appId={data.app._id} />
              {env}
              <AppEditorPartial
                env={env}
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
                    env={env}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
