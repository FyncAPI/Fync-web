import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { endpoints } from "@/constants/endpoints.ts";
import { App, appParser, User } from "@/utils/type.ts";
import CopyText from "@/islands/CopyText.tsx";
import { Input } from "@/components/Input.tsx";
import AppDataEditor from "@/islands/AppDataEditor.tsx";
import { DevNavbar } from "@/components/DevNavbar.tsx";
import axios from "npm:axios";
import Banner from "@/islands/Banner.tsx";
import { Button } from "@/components/Button.tsx";
import AuthUrlGenerator from "@/islands/AuthUrlGenerator.tsx";

type Data = {
  user: User;
  app?: App;
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
export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const { session } = ctx.state;
    const token = session.get("accessToken");

    if (!token) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/dev/login",
        },
      });
    }

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
    const token = session.get("accessToken");

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

    // const res = await fetch(endpoints.dev.app.update + id, {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: data,
    // });
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
export default function AppData({ data }: PageProps<Data>) {
  // const saveApp = (changed: Partial<App>) => {
  //   const res = axios.put(endpoints.apps.update + data.app!._id, {
  //     ...changed,
  //   }).then((res) => {
  //     console.log(res.data);
  //   });
  // };
  return (
    <>
      <DevNavbar user={data.user} />
      <div>
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
                      <h2 class="text-5xl font-medium text-white self-center text-center -mt-1">
                        {data.app.name.substring(0, 3)}
                      </h2>
                    )}
                </div>
              </div>
              <div class={"flex flex-col ml-2 mr-auto text-left"}>
                <h2 class="text-4xl font-medium text-white  ">
                  {data.app.name}
                </h2>
                <p class="text-primary-200 text-lg ">
                  {data.app.description}
                </p>
              </div>
            </div>
            <div class="m-5 ">
              <h1 class="text-3xl font-medium text-white">App data</h1>

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
              <h1 class="text-3xl font-medium text-white">OAuth data</h1>

              <AppDataEditor app={data.app} />{" "}
              <div class="mt-5 ">
                <h1 class="text-3xl font-medium text-white">
                  Auth Url Generator
                </h1>

                <div class="my-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
                  <AuthUrlGenerator urls={data.app.redirects || []} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
