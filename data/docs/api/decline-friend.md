---
description: | 
  Fync is a platform for finding yourself and others like you. It provides a public open-source API for letting other applications connect to your friends' network. Fync also offers a web interface for managing your friends' network and a mobile app to sync with your friends.
---

# Decline Friend Request

**Endpoint:** `POST /v1/users/:id/decline-friend`

**Authentication:**

- Requires authentication with `scopes.write.friends` scope.
- The user making the request must be authenticated.

**Parameters:**

- `id` (path parameter): ID of the user whose friend request is declined.

**Request:**

- No request body.

**Response:**

- **Success (200 OK):**
  ```json
  {
    "success": true,
    "message": "Friend request declined"
  }
  ```

- **Error (400 Bad Request):**
  ```json
  {
    "message": "Invalid user ID"
  }
  ```
- **Error (404 Not Found):**
  ```json
  {
    "message": "User not found"
  }
  ```

**Example:**

```bash
curl -X POST -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://api.fync.in/v1/users/123/decline-friend
```

**Implementation Details:**

1. **Authorization:**
   - Validates the user's authentication token and checks for the necessary
     scope.
   - Retrieves the user's ID from the authentication token.

2. **User and Friend Lookup:**
   - Retrieves the user and friend information based on the provided IDs.
   - Returns a 400 Bad Request response with a generic error message if the user
     or friend ID is invalid.
   - Returns a 404 Not Found response if the user or friend does not exist.

3. **Decline Friend Request:**
   - Removes the friend from the user's inward friend requests.
   - Adds the user to the friend's declined friend requests.
   - Removes the user from the friend's outward friend requests.

4. **Response:**
   - Returns a success message if the friend request is declined successfully.
   - Handles validation errors, user or friend not found, and unexpected errors
     appropriately.

5. **Error Handling:**
   - Catches unexpected errors during execution and logs them.
   - Returns a 400 Bad Request response with a generic error message if the user
     or friend ID is invalid.
   - Returns a 404 Not Found response with a user not found message if the user
     or friend does not exist.
