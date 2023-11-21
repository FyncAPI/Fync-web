---
description: |
  Document for the GET /v1/friends/@me endpoint's API.
---

## Get User Friends

### Endpoint

`GET /v1/friends/@me`

### Description

Retrieve a list of friends for the authenticated user.

### Authentication

Requires authentication with the appropriate scope: `read.friends`.

### Query Parameters

- `friendRequests` (optional): If set to "true", includes friend requests in the
  response.

### Request

#### Example

```http
GET /v1/friends/@me?friendRequests=true
```

### Response

#### Success

```json
{
  "success": true,
  "data": [
    {
      "friendship": {
        // Details of the friendship document
      },
      "user": {
        // Details of the friend user
      }
      // Include any other fields from the users document you need in your final output
    }
    // Additional friends...
  ]
}
```

#### Error

```json
{
  "error": "invalid user id"
}
```

### Example Usage (cURL)

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" "https://your-api-base-url/v1/friends/@me?friendRequests=true"
```

Replace `YOUR_ACCESS_TOKEN` with the actual access token obtained during
authentication.

### Notes

- Make sure to include the proper authentication headers with the API request.
- The endpoint requires the `read.friends` scope for authorization.
- If `friendRequests` is set to "true", friend requests will be included in the
  response.
- If the user ID is invalid, the API will respond with a `400 Bad Request` and
  an error message.
