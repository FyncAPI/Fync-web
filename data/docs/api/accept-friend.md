---
description: | 
  Fync is a platform for finding yourself and others like you. It provides a public open-source API for letting other applications connect to your friends' network. Fync also offers a web interface for managing your friends' network and a mobile app to sync with your friends.
---

### Accept Friend Request

**Endpoint:** `POST /v1/users/:id/accept-friend`

**Authentication:**

- Requires authentication with `friend.write` scope.
- The user making the request must be authenticated.

**Parameters:**

- `id` (path parameter): ID of the user whose friend request is being accepted.

**Request:**

- No request body.

**Response:**

- **Success (200 OK):**
  ```json
  {
    "success": true,
    "message": "Friend request accepted"
  }
  ```

**Example:**

```bash
curl -X POST -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://api.fync.in/v1/users/123/accept-friend
```
