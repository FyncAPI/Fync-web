import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { endpoints } from "@/constants/endpoints.ts";
import { App, User } from "@/utils/type.ts";
import { DevNavbar } from "@/components/DevNavbar.tsx";
import CopyText from "@/islands/CopyText.tsx";
import { Input } from "@/components/Input.tsx";

type Data = {
  user: User;
  app?: App;
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

    return ctx.render({ app, user: session.get("user") });
  },
};
export default function AppData({ data }: PageProps<Data>) {
  return (
    <>
      <DevNavbar user={data.user} />
      <div class="h-screen">
        {data.app && (
          <>
            <div class="flex flex-row m-5 md:m-10 rounded-md items-center justify-between ">
              <div>
                <div class="rounded-full items-center justify-center bg-gray-500 w-16 flex h-16 m-2">
                  <h2 class="text-4xl font-medium text-white self-center text-center">
                    {data.app.name}
                  </h2>
                </div>
                <p class="text-primary-200 text-lg m-4">
                  {data.app.description}
                </p>
              </div>
            </div>
            <div class="m-5 ">
              <h1 class="text-3xl font-medium text-white">App data</h1>

              <div class=" mt-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
                <div class="flex flex-col">
                  <h4 class="text-primary-200 text-lg mt-4">
                    Client id
                  </h4>
                  <CopyText text={data.app.clientId} />
                  <h4 class="text-primary-200 text-lg mt-4">
                    Client secret
                  </h4>
                  <CopyText text={data.app.clientSecret} />
                </div>
              </div>

              <div class=" mt-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
                <div class="flex flex-col">
                  <h4 class="text-primary-200 text-lg mt-4">
                    App name
                  </h4>
                  <Input value={data.app.name} disabled />
                  <h4 class="text-primary-200 text-lg mt-4">
                    App description
                  </h4>
                  <Input value={data.app.description} disabled />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
