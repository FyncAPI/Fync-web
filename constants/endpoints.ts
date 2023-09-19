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
  },
  dev: {
    login: `${url}/dev/login/`,
  },
  // Home
};
