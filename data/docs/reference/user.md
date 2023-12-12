---
description: |
  Fync is a platform for finding yourself, and others like you. It provides a public opensouce API for letting other applications connect your friends network to their own. It also provides a web interface for managing your friends network, and a mobile app to Fync(sync) with your friends.
---

# User Object Reference

| Field                    | Type                                                       | Description                                                                                    |
| ------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `_id`                    | String                                                     | Unique identifier for the user.                                                                |
| `provider`               | Array of Enums: ["google", "facebook", "email"] - Optional | Authentication providers associated with the user (e.g., Google, Facebook, Email).             |
| `devId`                  | String - Optional                                          | Developer identifier, if applicable.                                                           |
| `username`               | String                                                     | User's username.                                                                               |
| `name`                   | String                                                     | User's full name.                                                                              |
| `avatar`                 | String - Optional                                          | URL or reference to the user's avatar image.                                                   |
| `age`                    | Number - Optional                                          | User's age.                                                                                    |
| `profilePicture`         | String - Optional                                          | URL or reference to the user's profile picture.                                                |
| `friends`                | Array of Objects                                           | List of user's friends, each represented by an object with `friendship` and `user` properties. |
| `inwardFriendRequests`   | Array of Strings - Optional                                | List of inward friend requests.                                                                |
| `outwardFriendRequests`  | Array of Strings - Optional                                | List of outward friend requests.                                                               |
| `declinedFriendRequests` | Array of Strings - Optional                                | List of declined friend requests.                                                              |
| `canceledFriendRequests` | Array of Strings - Optional                                | List of canceled friend requests.                                                              |
| `email`                  | String                                                     | User's email address.                                                                          |
| `password`               | String - Optional                                          | User's password, optional for cases where the user has a password.                             |
| `verified`               | Boolean                                                    | Indicates whether the user's email is verified.                                                |
| `createdAt`              | Date or String                                             | Date when the user profile was created.                                                        |
| `phoneNumber`            | String - Optional                                          | User's phone number.                                                                           |
| `birthdate`              | String - Optional                                          | User's birthdate.                                                                              |
| `apps`                   | Array of Strings                                           | List of apps associated with the user.                                                         |
| `appUsers`               | String                                                     | List of users associated with the apps.                                                        |
| `location`               | Object                                                     | User's location information, including `country` and `city`.                                   |
| `interests`              | Array of Strings - Optional                                | User's interests.                                                                              |
| `hobbies`                | Array of Strings - Optional                                | User's hobbies.                                                                                |
| `bio`                    | String - Optional                                          | User's biography or description.                                                               |

---
