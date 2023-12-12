---
description: |
  Fync is a platform for finding yourself, and others like you. It provides a public opensouce API for letting other applications connect your friends network to their own. It also provides a web interface for managing your friends network, and a mobile app to Fync(sync) with your friends.
---

# App Object Reference

| Field                 | Type                              | Description                                                        |
| --------------------- | --------------------------------- | ------------------------------------------------------------------ |
| `_id`                 | ObjectId or String                | Unique identifier for the app.                                     |
| `name`                | String                            | Name of the app.                                                   |
| `description`         | String                            | Description providing details about the app.                       |
| `clientId`            | String                            | Client ID for OAuth 2.0 authentication.                            |
| `clientSecret`        | String                            | Client secret for OAuth 2.0 authentication.                        |
| `discordClientId`     | String - Optional                 | Discord client ID (optional).                                      |
| `discordClientSecret` | String - Optional                 | Discord client secret (optional).                                  |
| `discordRedirectUri`  | String - Optional                 | Discord redirect URI (optional).                                   |
| `discordScopes`       | Array of Strings - Optional       | Discord scopes (optional).                                         |
| `appStoreId`          | String - Optional                 | App Store ID (optional).                                           |
| `androidPackageName`  | String - Optional                 | Android package name (optional).                                   |
| `url`                 | String - Optional                 | URL of the app, validated against a regular expression (optional). |
| `redirects`           | Array of Strings (URL) - Optional | List of redirect URLs (optional).                                  |
| `image`               | String - Optional                 | URL or reference to the app's image (optional).                    |
| `users`               | Array of Strings                  | List of users associated with the app.                             |
| `events`              | Array of Strings                  | List of events associated with the app.                            |
| `interactions`        | Array of Objects                  | List of interactions, each with an `_id` and rarity.               |
| `createdAt`           | Date                              | Date when the app was created.                                     |

---
