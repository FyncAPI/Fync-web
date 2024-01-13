---
description: |
  Document for the GET /v1/users/@me endpoint's API.
---

### Get current user

#### Request

- **Method**: GET
- **Endpoint**: `/v1/users/@me`

#### Response

- **Status Code**: 200 OK
- **Body**: JSON array containing user information.

#### Example

```json
GET /v1/users/@me

Response:
  {
    "_id": "123456789",
    "username": "example_user",
    "name": "John Doe",
    // Other user fields
  }
```

#### Query Parameters

- **filter** (optional): Comma-separated list of fields to filter and populate.
  - Example: `filter=friends,apps`
  - Supported fields: "friends", "apps", "appUsers"
