const url = Deno.env.get("ENV") == "dev"
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
  },
  dev: {
    login: `${url}/dev/login/`,
    profile: `${url}/dev/profile/`,
    app: {
      "create": `${url}/dev/app/create/`,
      get: `${url}/dev/app/get/`,
    },
  },
  user: {
    profile: `${url}/user/profile/`,
  },
  // Home
};
