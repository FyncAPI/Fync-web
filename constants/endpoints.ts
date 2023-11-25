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
    discord: `${url}/auth/discord/`,
    flow: {
      discord: `${url}/v1/auth/flow/discord/{cid}`,
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
      interactions: `${url}/v1/apps/{id}/interactions/`,
      update: `${url}/dev/apps/`,
    },
  },
  user: {
    create: {
      discord: `${url}/v1/users/create/discord/`,
    },
    me: `${url}/v1/users/@me`,
    get: `${url}/v1/users/`,
    getByEmail: `${url}/v1/users/email/`,
    addFriend: `${url}/v1/users/{id}/add-friend`,
    acceptFriend: `${url}/v1/{id}/accept-friend`,
    rejectFriend: `${url}/v1/{id}/decline-friend`,
    cancelFriend: `${url}/v1/{id}/cancel-friend`,
    requests: `${url}/v1/friend-requests/@me/`,
  },
  // Home
};
