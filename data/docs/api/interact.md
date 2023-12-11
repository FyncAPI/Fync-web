---
description: | 
  Fync is a platform for finding yourself and others like you. It provides a public open-source API for letting other applications connect to your friends' network. Fync also offers a web interface for managing your friends' network and a mobile app to sync with your friends.
---

# Interact - Increase Friendshiup

**Endpoint:** `POST /i/:slug`

**Authentication:**

- Requires authentication with `scopes.friendship.write` scope.
- The user making the request must be authenticated.

**Parameters:**

- `slug` (path parameter): Slug of the interaction to increase friendship for.

**Request:**

- body:
  ```json
  {
      "users": ["user_id_1", "user_id_2", ...]
  }
  ```

**Response:**

- **Success (200 OK):**
  ```json
  [
      {
          "_id": "user_id_1",
          "adder": "user_id_2",
          "accepter": "user_id_1",
          "friendship": 3,
          "interactions": ["interaction_id_1", "interaction_id_2", ...],
          "images":[],
          "videos": [],
          "createdAt": "2023-01-01T12:00:00Z",
      },
      ...
  ]
  ```
- **Error (400 Bad Request):**
  ```json
  {
    "message": "Validation error message"
  }
  ```
- **Error (404 Not Found):**
  ```json
  {
    "message": "Interaction not found"
  }
  ```
- **Error (404 Not Found):**
  ```json
  {
    "message": "Friendship not found"
  }
  ```
- **Error (500 Internal Server Error):**
  ```json
  {
    "message": "An unexpected error occurred"
  }
  ```

**Example:**

```bash
curl -X POST -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -d '{"users": ["USER_ID_1", "USER_ID_2"]}' http://api.fync.in/i/interaction-slug
```
