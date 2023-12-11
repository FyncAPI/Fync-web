// need to update scopes in the backend as well
export const scopes = {
  profile: { read: "profile.read" },
  posts: { read: "posts.read" },
  apps: { read: "apps.read" },
  friend: {
    read: "friend.read",
    write: "friend.write",
  },
  friendship: {
    read: "friendship.read",
    write: "friendship.write",
  },
  interaction: {
    read: "interaction.read",
    write: "interaction.write",
  },
  dev: { admin: "dev:admin" },
} as const;

export const allScopes = Object.values(scopes)
  .map((scope) => Object.values(scope))
  .flat();

allScopes.find((s) => !"profile.read".includes(s));
