import { Handlers, PageProps } from "$fresh/server.ts";
import InteractionEditor from "@/islands/InteractionEditor.tsx";
import { App, Interaction, User } from "@/utils/type.ts";
import { endpoints } from "@/constants/endpoints.ts";
import { WithSession } from "fresh-session";
import axios from "npm:axios";
import { DevNavbar } from "@/components/DevNavbar.tsx";
import Banner from "@/islands/Banner.tsx";
import { Button } from "@/components/Button.tsx";
import InteractionsEditor from "@/islands/InteractionsEditor.tsx";
// import { Interaction } from "https://esm.sh/v118/@types/scheduler@0.16.3/tracing.js";

type Data = {
  user: User;
  interactions: Interaction[];
  //   updateUrl?: string;
  error?: string;
  env?: string;
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
    const { session } = ctx.state;
    const token = session.get("devToken");

    if (!token) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/dev/login",
        },
      });
    }

    try {
      const interactions = await getInteractions(id, token);

      return ctx.render({
        interactions,
        user: session.get("user"),
        // updateUrl: endpoints.dev.app.update + id,
        env: domain == "http://localhost:8000" ? "dev" : "prod",
      });
    } catch (e) {
      return ctx.render({
        user: session.get("user"),
        interactions: [],
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
export default function Interactions(props: PageProps<Data>) {
  const { interactions, user, error } = props.data;

  return (
    <div>
      <DevNavbar user={user} />
      {error && (
        <Banner
          text={JSON.stringify(error)}
          type={"error"}
        />
      )}
      <div class="flex flex-row m-5 md:m-10 rounded-md items-center justify-between ">
        <div>
          <InteractionsEditor interactions={interactions} />
          <h1 class="text-2xl font-medium text-white">Interactions</h1>{" "}
          <Button
            type={"button"}
            onClick={() => {
            }}
          >
            {"add"}
          </Button>
          {interactions.map((interaction) => {
            return <InteractionEditor interaction={interaction} />;
          })}
        </div>
      </div>
    </div>
  );
}
