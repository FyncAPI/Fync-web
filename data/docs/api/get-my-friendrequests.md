---
description: | 
  Fync is a platform for finding yourself and others like you. It provides a public open-source API for letting other applications connect to your friends' network. Fync also offers a web interface for managing your friends' network and a mobile app to sync with your friends.
---

# Friend Requests - Get Current User's Friend Requests

**Endpoint:** `GET /v1/friend-requests/@me`

**Authentication:**

- Requires authentication with `scopes.read.friends` scope.
- The user making the request must be authenticated.

**Request:**

- No request body.

**Response:**

- **Success (200 OK):**
  ```json
  {
    "outwardFriendRequests": [
      {
        "userId": "user_id_1",
        "timestamp": "2023-01-01T12:00:00Z"
      },
      {
        "userId": "user_id_2",
        "timestamp": "2023-01-02T14:30:00Z"
      },
      ...
    ],
    "inwardFriendRequests": [
      {
        "userId": "user_id_3",
        "timestamp": "2023-01-03T10:45:00Z"
      },
      {
        "userId": "user_id_4",
        "timestamp": "2023-01-04T16:20:00Z"
      },
      ...
    ]
  }
  ```
