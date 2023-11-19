### Get Friends for the Authenticated User

#### Request

- **Method**: GET
- **Endpoint**: `/v1/friends/@me`
- **Authorization**: Bearer Token (OAuth2)
- **Scope**: `read.friends`

#### Response

- **Status Code**: 200 OK
- **Body**: JSON object containing an array of friends.

#### Example

```json
GET /v1/friends/@me

Response:
{
  "success": true,
  "data": [
    {
      "user": {
        "_id": "friend_user_id",
        "username": "friend_username",
        "name": "Friend Name",
        // Other friend user fields
      },
      "friendship": {
        "_id": "friendship_id",
        // Other friendship fields
      }
    },
    // Additional friends...
  ]
}
```

#### Notes

- The endpoint retrieves friends for the authenticated user.
- Friends are presented as an array of objects, each containing information
  about the friend user and the friendship details.
- This endpoint requires the `read.friends` scope for authorization.

#### Error Response

- **Status Code**: 400 Bad Request
- **Body**: JSON object containing an error message.

#### Example Error Response

```json
{
  "error": "invalid user id"
}
```
