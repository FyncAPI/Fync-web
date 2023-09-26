import { z, ZodObject } from "zod";

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

export const appParser = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),

  clientId: z.string(),
  clientSecret: z.string(),

  appStoreId: z.string().optional(),
  androidPackageName: z.string().optional(),
  url: z.string().url().optional(),

  redirectUrl: HttpsUrlSchema.optional(),

  image: z.string().optional(),
  users: z.array(z.string()),
  events: z.array(z.string()),
  interactions: z.array(z.string()),

  createdAt: z.date(),
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
  createdAt: z.date(),
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
  _id: z.string(),
  provider: z.array(z.enum(["google", "facebook", "email"])).optional(),

  username: z.string(),
  name: z.string(),
  avatar: z.string().optional(),

  profilePicture: z.string().optional(),

  friends: z.array(friendParser),
  email: z.string(),
  password: z.string().optional(),
  verified: z.boolean(),
  createdAt: z.date(),

  phoneNumber: z.string().optional(),
  birthday: z.string().optional(),

  apps: z.array(z.string().or(appParser)),
  appUsers: z.array(z.string().or(appUserParser)),
});

export type User = z.infer<typeof userParser>;
export type App = z.infer<typeof appParser>;
