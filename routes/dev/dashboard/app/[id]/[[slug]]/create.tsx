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

export const handler: Handlers<Data, WithSession> = {
  async POST(req, ctx) {
    const id = ctx.params.id;
    const slug = ctx.params.slug;
    const action = ctx.params.action;

    const { session } = ctx.state;
    const devToken = session.get("devToken");

    if (slug == "interactions") {
      console.log("creating interaction", id);
      const res = await fetch(
        endpoints.apps.interaction.create.replace(
          "{id}",
          id,
        ),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${devToken}`,
          },
        },
      );

      if (!res.ok) {
        console.log(res);
        return new Response(
          JSON.stringify(res.body),
          {
            status: 400,
          },
        );
      }

      const json = await res.json();
      return new Response("", {
        status: 302,
        headers: {
          Location: `/dev/dashboard/app/${id}/interactions`,
        },
      });
    }

    return await ctx.renderNotFound();
  },
};

/*export const handler: Handlers<Data, WithSession> = {
    async GET(req, ctx) {
      const domain = req.url.split("/").slice(0, 3).join("/");
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

        const interactions = await getInteractions(id, token);

        //console.log("token", token);
        console.log("interactions", interactions);

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
      const slug = ctx.params.slug;
      const action = ctx.params.action;
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
*/
