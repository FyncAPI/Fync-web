import DenoGrant, { Providers } from "deno_grant";

export const denoGrant = new DenoGrant({
  base_uri: Deno.env.get("ENV") == "dev"
    ? "http://localhost:8000"
    : "https://fync.deno.dev",
  strategies: [
    {
      provider: Providers.google,
      client_id: Deno.env.get("GOOGLE_CLIENT_ID")!,
      client_secret: Deno.env.get("GOOGLE_CLIENT_SECRET")!,
      redirect_path: "/oauth2/google/callback",
      scope: "email openid profile",
    },
    {
      provider: Providers.discord,
      client_id: "...",
      client_secret: "...",
    },
  ],
});

export const googleAuthorizationURI = denoGrant.getAuthorizationUri(
  Providers.google,
)?.toString();
