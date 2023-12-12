---
description: |
  Fync is a platform for finding yourself, and others like you. It provides a public opensouce API for letting other applications connect your friends network to their own. It also provides a web interface for managing your friends network, and a mobile app to Fync(sync) with your friends.
---

# Interaction Object Reference

| Field          | Type                                          | Description                                                |
| -------------- | --------------------------------------------- | ---------------------------------------------------------- |
| `_id`          | ObjectId or String                            | Unique identifier for the interaction.                     |
| `version`      | Number                                        | Version number of the interaction.                         |
| `app`          | ObjectId or String                            | Identifier of the associated app.                          |
| `title`        | String                                        | Title of the interaction.                                  |
| `description`  | String                                        | Description providing details about the interaction.       |
| `rewardDetail` | String                                        | Details about the rewards associated with the interaction. |
| `urlSlug`      | String                                        | URL-friendly slug for the interaction.                     |
| `frequency`    | Number - Optional                             | Frequency of the interaction (optional).                   |
| `type`         | Enum: ["friendship", "event", "game", "life"] | Type or category of the interaction.                       |
| `options`      | Array of Objects                              | List of options, each with a title and description.        |
| `startDate`    | Date - Optional                               | Start date of the interaction (optional).                  |
| `endDate`      | Date - Optional                               | End date of the interaction (optional).                    |
| `createdAt`    | Date                                          | Date when the interaction was created.                     |

---
