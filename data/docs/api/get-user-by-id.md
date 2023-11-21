---
description: |
  Document for the GET /v1/users/:id endpoint's API.
---

### Get User by ID

#### Request

- **Method**: GET
- **Endpoint**: `/v1/users/:id`
- **Parameters**:
  - `id` (path parameter): User ID.

#### Response

- **Status Code**: 200 OK
- **Body**: JSON array containing user information.

#### Example

```json
GET /v1/users/123456789

Response:
[
  {
    "_id": "123456789",
    "username": "example_user",
    "name": "John Doe",
    // Other user fields
  }
]
```

#### Query Parameters

- **filter** (optional): Comma-separated list of fields to filter and populate.
  - Example: `filter=friends,apps`
  - Supported fields: "friends", "apps", "appUsers"
