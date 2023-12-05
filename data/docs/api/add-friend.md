---
description: |
  Fync is a platform for finding yourself, and others like you. It provides a public opensouce API for letting other applications connect your friends network to their own. It also provides a web interface for managing your friends network, and a mobile app to Fync(sync) with your friends.
---

### Add Friend

**Endpoint:** `POST /v1/users/:id/add-friend`

**Authentication:**

- Requires authentication with `scopes.write.friends` scope.
- The user making the request must be authenticated.

**Parameters:**

- `id` (path parameter): ID of the user to whom the friend request is sent.

**Request:**

- No request body.

**Response:**

- **Success (200 OK):**
  ```json
  {
    "success": true,
    "message": "Friend request sent"
  }
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
    "message": "Friend not found"
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
curl -X POST -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://api.fync.in/v1/users/123/add-friend
```

### Implementation Details

1. **Authorization:**
   - Validates the user's authentication token and checks for the necessary
     scope.
   - Retrieves the user's ID from the authentication token.

2. **Validation:**
   - Checks if the friend request is valid.
   - Returns a 400 Bad Request response with a validation error message if
     unsuccessful.

3. **User and Friend Lookup:**
   - Retrieves the user and friend information based on the provided IDs.
   - Returns a 404 Not Found response if the friend does not exist.

4. **Update Friend Requests:**
   - Adds the friend's ID to the user's outward friend requests.
   - Adds the user's ID to the friend's inward friend requests.

5. **Response:**
   - Returns a success message if the friend request is sent successfully.
   - Handles validation errors, friend not found, and unexpected errors
     appropriately.

6. **Error Handling:**
   - Catches unexpected errors during execution and logs them.
   - Returns a 500 Internal Server Error response with a generic error message.

**Notes:**

- Ensure the `validateAddFriendRequest` function provides detailed validation
  messages.
- Customize the documentation based on your specific implementation.

Feel free to replace placeholders like `YOUR_ACCESS_TOKEN` and adjust the
content to fit your actual implementation.
