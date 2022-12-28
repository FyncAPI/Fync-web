import Login from "@/islands/Login.tsx";
import { Layout } from "@/routes/index.jsx";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET: (_req, ctx) => {
    return ctx.render({ ...ctx.state });
  },
  POST: async (req, ctx) => {
    const login = await fetch(`${ctx.API_URL}/auth/local`, {
      method: "POST",
      body: await req.formData(),
    }).then(async (res) => await res.json());
    console.log(login);
    // Redirect if we got a login success, else render the form with an error
    if (login.error) {
      return ctx.render({ ...ctx.state, error: login.error });
    } else {
      const { user, jwt } = login;
      // Put the login into the redis store
      const state = Object.assign(ctx.state, { user, jwt, webview: false });
      return await ctx.store.set(ctx.REDIS_KEY, JSON.stringify(state)).then(
        () => {
          // Redirect. Next request will get the session from it's cookie
          const res = new Response(null, {
            status: 302,
            headers: new Headers({
              location: ctx.BASE_URL + `/account`,
            }),
          });
          return res;
        },
      );
    }
  },
};

export default function PageLogin({ data }) {
  const { error } = data;
  return (
    <>
      <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
          <div>
            <img
              class="mx-auto h-12 w-auto"
              src="/logo.svg"
              alt="Workflow"
            />
            <h2 class="mt-6 mb-8 text-center text-3xl tracking-tight font-bold text-gray-900">
              Sign in to your account
            </h2>
            {error ? <p class="text-red-500">{error.message}</p> : ""}
          </div>
          <Login />
        </div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </>
  );
}
