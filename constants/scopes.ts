export const scopes = {
  profile: ["profile.read"],
  posts: ["posts.read"],
  apps: ["apps.read"],
  friend: ["friends.read", "friendrequest.send", "friendrequest.read"],
  dev: ["dev:admin"],
} as const;
