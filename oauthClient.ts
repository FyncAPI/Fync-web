import { OAuth2Client } from "oauth2Client";

const serverURI = Deno.env.get("ENV") == "dev"
  ? "http://localhost:8000"
  : "https://fync.in";

const apiURI = Deno.env.get("ENV") == "dev"
  ? "http://localhost:8080"
  : "https://api.fync.in";

export const fyncOauthClient = new OAuth2Client({
  clientId: Deno.env.get("FYNC_CLIENT_ID")!,
  clientSecret: Deno.env.get("FYNC_CLIENT_SECRET")!,
  authorizationEndpointUri: serverURI + "/oauth2/auth",
  tokenUri: apiURI + "/auth/access_token",
  redirectUri: serverURI + "/oauth2/fync/callback",
  defaults: {
    scope: "read:profile",
  },
});

export const scopes = {
  read: {
    profile: "read:profile",
    email: "read:email",
    friends: "read:friends",
    posts: "read:posts",
  },
  write: {
    profile: "write:profile",
    email: "write:email",
    friends: "write:friends",
    apps: "write:apps",
    friendship: "write:friendship",
  },
  dev: {
    admin: "dev:admin",
  },
} as const;
