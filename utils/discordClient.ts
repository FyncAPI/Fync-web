import { OAuth2Client } from "oauth2Client";
import { scopes } from "@/constants/scopes.ts";

const serverURI = Deno.env.get("ENV") == "dev"
  ? "http://localhost:8000"
  : "https://fync.in";

const apiURI = Deno.env.get("ENV") == "dev"
  ? "http://localhost:8080"
  : "https://api.fync.in";

export const discordClient = new OAuth2Client({
  clientId: "...",
  clientSecret: "...",
  authorizationEndpointUri: serverURI + "/oauth2/auth",
  tokenUri: apiURI + "/auth/access_token",
  redirectUri: serverURI + "/oauth2/dev/fync/callback",
  defaults: {
    scope: scopes.dev,
  },
});
