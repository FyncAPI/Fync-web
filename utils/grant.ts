import DenoGrant, { Providers } from "deno_grant";
import "$std/dotenv/load.ts";

export const denoGrant = new DenoGrant({
  base_uri: Deno.env.get("ENV") == "dev"
    ? "http://localhost:8000"
    : "https://fync.in",
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
      client_id: Deno.env.get("DISCORD_CLIENT_ID")!,
      client_secret: Deno.env.get("DISCORD_CLIENT_SECRET")!,
      scope: "identify email",
      redirect_uri: Deno.env.get("ENV") == "dev"
        ? "http://localhost:8000/oauth2/discord/callback"
        : "https://fync.in/oauth2/discord/callback",
    },
  ],
});

export const googleAuthorizationURI = denoGrant.getAuthorizationUri(
  Providers.google,
)?.toString();
