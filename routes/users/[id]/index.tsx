import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { endpoints } from "@/constants/endpoints.ts";
import CopyText from "@/islands/CopyText.tsx";
import { Input } from "@/components/Input.tsx";
import { DevNavbar } from "@/components/DevNavbar.tsx";
import axios from "npm:axios";
import Banner from "@/islands/Banner.tsx";
import { Button } from "@/components/Button.tsx";
import AuthUrlGenerator from "@/islands/AuthUrlGenerator.tsx";
import { User } from "@/utils/type.ts";
import UserNavbar from "@/islands/UserNavbar.tsx";

type Data = {
  user: User;
  me: User;
  error?: string;
  env?: string;
};

const getUser = async (id: string, token: string) => {
  const res = await fetch(endpoints.user.get + id, {
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

  const user = await res.json();
  return user;
};
export const handler: Handlers<Data, WithSession> = {
  async GET(req, ctx) {
    const domain = req.url.split("/").slice(0, 3).join("/");
    const id = ctx.params.id;
    const { session } = ctx.state;
    const token = session.get("accessToken");

    if (!token) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }

    try {
      const res = await fetch(endpoints.user.get + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return ctx.render({
          user: {} as User,
          me: session.get("user"),
          error: "error fetching user",
        });
      }

      const user = await res.json();

      return ctx.render({
        user,
        me: session.get("user"),
        env: domain == "http://localhost:8000" ? "dev" : "prod",
      });
    } catch (e) {
      return ctx.render({
        user: session.get("user"),
        me: session.get("user"),
        error: e.message,
      });
    }
  },
};
export default function UserData(props: PageProps<Data>) {
  const { user, me, error } = props.data;
  console.log(user.username, "uu");
  return (
    <>
      <UserNavbar user={me} />
      {error && <Banner text={error} type={"error"} />}
      <div>
        <div class="magicpattern -z-10 top-0 absolute w-full h-full  bg-gradient-to-b from-current to-transparent" />
        {error && (
          <Banner
            text={JSON.stringify(error)}
            type={"error"}
          />
        )}
        {user && (
          <>
            <div class="flex flex-row m-5 md:m-10 rounded-md items-center justify-between ">
              <div>
                <div class="rounded-md items-center justify-center bg-gray-500 flex w-24 h-24 m-2 gradient-grid">
                  {user?.profilePicture
                    ? (
                      <img
                        src={user?.profilePicture}
                        class="rounded-md"
                      />
                    )
                    : (
                      <h2 class="text-4xl font-medium text-white self-center text-center -mt-1">
                        {user?.name?.substring(0, 3)}
                      </h2>
                    )}
                </div>
              </div>
              <div class={"flex flex-col ml-2 mr-auto text-left"}>
                <h2 class="text-3xl font-medium text-white  ">
                  {user.name}
                </h2>
                {
                  /* <p class="text-primary-200 text-lg ">
                  {data.user.description}
                </p> */
                }
              </div>
            </div>
            <div class="m-5 ">
              <h1 class="text-2xl font-medium text-white">User data</h1>

              <div class="my-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
                <div class="flex flex-col">
                  <h4 class="text-primary-200 text-lg">
                    Client id
                  </h4>
                  {/* <CopyText text={data.user.clientId} /> */}
                  <h4 class="text-primary-200 text-lg mt-4">
                    Client secret
                  </h4>
                  {/* <CopyText text={data.user.clientSecret} /> */}
                </div>
              </div>
              <h1 class="text-2xl font-medium text-white">OAuth data</h1>

              {/* <UserDataEditor user={data.user} />{" "} */}
              <div class="mt-5 ">
                <h1 class="text-2xl font-medium text-white">
                  Auth Url Generator
                </h1>

                <div class="my-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
                  {
                    /* <AuthUrlGenerator
                    urls={data.user.redirects || []}
                    clientId={data.user.clientId}
                    env={data.env}
                  /> */
                  }
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
