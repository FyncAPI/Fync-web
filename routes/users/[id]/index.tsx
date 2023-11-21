import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { endpoints } from "@/constants/endpoints.ts";
import axios from "npm:axios";
import Banner from "@/islands/Banner.tsx";
import { Button } from "@/components/Button.tsx";
import { User } from "@/utils/type.ts";
import UsersPlusIcon from "tabler/users-plus.tsx";
import UsersMinusIcon from "tabler/users-minus.tsx";
import IconX from "tabler/x.tsx";
import IconPen from "tabler/pencil.tsx";
import UserNavbar from "@/islands/UserNavbar.tsx";
import { LinkButton } from "@/components/LinkButton.tsx";
import IconCheck from "tabler/check.tsx";

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

      console.log(user, "uusx");
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
                  {user.username}
                </h2>
                <p class="text-primary-200 text-lg ">
                  {user.name}
                </p>
                <p class="text-primary-200 text-lg ">
                  {user.interests?.join(", ") || "No interests set for now"}
                </p>
              </div>

              {user._id == me._id
                ? (
                  <LinkButton
                    type={"submit"}
                    variant={"secondary"}
                    href={`/users/${user._id}/edit`}
                  >
                    Edit
                    <IconPen />
                  </LinkButton>
                )
                : user?.friends?.find((friend) => friend.user == me._id)
                ? (
                  <Button
                    type={"submit"}
                    variant={"secondary"}
                  >
                    <UsersMinusIcon />
                  </Button>
                )
                : user?.inwardFriendRequests?.find((id) => id == me._id)
                ? (
                  <Button
                    type={"submit"}
                    variant={"cancel"}
                    value={"Cancel"}
                  >
                    Cancel
                    <IconX />
                  </Button>
                )
                : user?.outwardFriendRequests?.includes(me._id)
                ? (
                  <form method={"post"}>
                    <Button
                      method={"post"}
                      type={"submit"}
                      formaction={`/users/${user._id}/reject-friend`}
                      variant={"cancel"}
                    >
                      <IconX />
                    </Button>
                    <Button
                      method={"post"}
                      type={"submit"}
                      formaction={`/users/${user._id}/accept-friend`}
                      variant={"primary"}
                    >
                      <IconCheck />
                    </Button>
                  </form>
                )
                : (
                  <Button
                    type={"submit"}
                    variant={"primary"}
                    value={"Cancel"}
                  >
                    <UsersPlusIcon />
                  </Button>
                )}
            </div>
            <div class="m-5 ">
              <h1 class="text-2xl font-medium text-white">Some Data</h1>

              <div class="my-5 p-4 rounded-md items-center justify-between h-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
                <div class="flex flex-col">
                  <h4 class="text-primary-200 text-lg">
                    Mutual Friends
                  </h4>
                  {user?.friends?.filter((f) => {
                    return me?.friends?.find((f2) => f2.user == f.user);
                  }).map((friend) => (
                    <p>
                      {JSON.stringify(friend)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
