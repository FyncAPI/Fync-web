---
description: |
  Fync is a platform for finding yourself, and others like you. It provides a public opensouce API for letting other applications connect your friends network to their own. It also provides a web interface for managing your friends network, and a mobile app to Fync(sync) with your friends.
---

# Friendship Object Reference

| Field          | Type                        | Description                                          |
| -------------- | --------------------------- | ---------------------------------------------------- |
| `_id`          | ObjectId or String          | Unique identifier for the friendship.                |
| `adder`        | String or ObjectId          | User or entity adding the friend.                    |
| `accepter`     | String or ObjectId          | User or entity accepting the friend request.         |
| `removed`      | Boolean - Optional          | Indicates whether the friendship has been removed.   |
| `friendship`   | Number                      | Friendship status or type.                           |
| `interactions` | Array of ObjectId or String | List of interactions associated with the friendship. |
| `images`       | Array of String             | List of image references related to the friendship.  |
| `videos`       | Array of String             | List of video references related to the friendship.  |
| `createdAt`    | Date                        | Date when the friendship was created.                |

---
