import { z, ZodObject } from "zod";
export const interactionParser = z.object({
  _id: z.string(),
  app: z.string(),
  version: z.number(),
  title: z.string(),
  description: z.string(),
  // type: z.string(),
  // data: z.any().optional(),

  // createdAt: z.date().or(z.string()),
});
export type Interaction = z.infer<typeof interactionParser>;

export const friendParser = z.object({
  _id: z.string(),
  friend1Id: z.string(),
  friend2Id: z.string(),

  friendship: z.number(),

  images: z.array(z.string()),
  videos: z.array(z.string()),

  markdown: z.string(),
  userId: z.string().optional(),
});

const HttpsUrlSchema = z.custom((value) => {
  // Regular expressions to validate URLs
  const httpRegex = /^http:\/\/[^\s/$.?#].[^\s]*$/;
  const httpsRegex = /^https:\/\/[^\s/$.?#].[^\s]*$/;

  if (
    typeof value === "string" &&
    (value.match(httpRegex) || value.match(httpsRegex))
  ) {
    return value; // Valid URL with "http://" or "https://"
  } else {
    throw new Error("Invalid URL (must start with 'http://' or 'https://')");
  }
});

export type Friendship = z.infer<typeof friendshipParser>;

export const friendshipParser = z.object({
  _id: z.string(),
  adder: z.string(),
  accepter: z.string(),
  removed: z.boolean().optional(),

  friendship: z.number(),

  images: z.array(z.string()),
  videos: z.array(z.string()),

  // sameApps: z.array(
  createdAt: z.date().or(z.string()),
});

export const appParser = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),

  clientId: z.string(),
  clientSecret: z.string(),
  discordClientId: z.string().optional(),
  discordClientSecret: z.string().optional(),

  appStoreId: z.string().optional(),
  androidPackageName: z.string().optional(),
  url: z.string().regex(/^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/)
    .optional(),

  redirects: z.array(z.string().url()).optional(),

  image: z.string().optional(),
  users: z.array(z.string()),
  events: z.array(z.string()),
  interactions: z.array(z.string()),

  createdAt: z.date().or(z.string()),
});

export const appUserParser = z.object({
  _id: z.string(),
  app: z.string(),

  fyncId: z.string(),
  appUserId: z.string(),
  friends: z.array(z.string()),

  appInteraction: z.object({
    friendshipCount: z.number(),
    eventCount: z.number(),
    lastInteraction: z.date(),
  }),
  createdAt: z.date().or(z.string()),
});

export const createEmailUserParser = z.object({
  email: z.string(),
  password: z.string(),
});

export type CreateEmailUser = z.infer<typeof createEmailUserParser>;

export const createGoogleUserParser = z.object({
  sub: z.string(),
  name: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  picture: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  locale: z.string(),
});

export type CreateGoogleUser = z.infer<typeof createGoogleUserParser>;

export const userParser = z.object({
  _id: (z.string()),
  provider: z.array(z.enum(["google", "facebook", "email"])).optional(),
  devId: (z.string()).optional(),

  username: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  age: z.number().optional(),

  profilePicture: z.string().optional(),

  friends: z.array(
    z.object({
      friendship: friendshipParser.or(z.string()),
      user: z.string(),
    }),
  ),

  inwardFriendRequests: z
    .array(z.string())
    .optional(),
  outwardFriendRequests: z
    .array(z.string())
    .optional(),
  declinedFriendRequests: z
    .array(z.string())
    .optional(),
  canceledFriendRequests: z
    .array(z.string())
    .optional(),

  email: z.string(),
  password: z.string().optional(),
  verified: z.boolean(),
  createdAt: z.date().or(z.string()),

  phoneNumber: z.string().optional(),
  birthdate: z.string().optional(),

  apps: z.array(z.string()),
  appUsers: (z.string()).array(),

  location: z
    .object({
      country: z.string(),
      city: z.string(),
    })
    .optional(),

  interests: z.array(z.string()).optional(),
  hobbies: z.array(z.string()).optional(),
  bio: z.string().optional(),
});

export type User = z.infer<typeof userParser>;
export type App = z.infer<typeof appParser>;
