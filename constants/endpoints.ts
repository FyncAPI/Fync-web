const url = Deno.env.get("ENV") == "dev"
  // ? "https://fync-api-5jmm43qs87pw.deno.dev"
  ? "http://localhost:8080"
  : "https://fync-api.deno.dev";
export const endpoints = {
  // Auth
  auth: {
    email: {
      check: `${url}/auth/email/check/`,
      login: `${url}/auth/email/`,
      register: `${url}/auth/email/register/`,
    },
    authorize: `${url}/auth/authorize/`,
    token: `${url}/auth/access_token/`,
  },
  apps: {
    clientId: `${url}/apps/clientId/`,
    update: `${url}/apps/`,
  },
  friends: {
    get: `${url}/v1/friends/@me`,
  },
  dev: {
    login: `${url}/dev/login/`,
    profile: `${url}/dev/profile/`,
    app: {
      "create": `${url}/dev/app/create/`,
      get: `${url}/dev/apps/`,
      update: `${url}/dev/apps/`,
    },
  },
  user: {
    me: `${url}/v1/users/@me`,
    get: `${url}/v1/users/`,
    addFriend: `${url}/v1/users/{id}/add-friend/`,
    requests: `${url}/v1/friend-requests/@me/`,
  },
  // Home
};
