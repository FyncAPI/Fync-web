---
description: |
  Fync is a platform for finding yourself, and others like you. It provides a public opensouce API for letting other applications connect your friends network to their own. It also provides a web interface for managing your friends network, and a mobile app to Fync(sync) with your friends.
---

# OAuth 2.0 Scopes Guide

## Introduction

OAuth 2.0 scopes define the access levels and permissions granted by users to
applications. Scopes help control the actions and data that an application can
access on behalf of the user. In your backend system, it's essential to update
and manage these scopes securely.

## Scopes Definitions

### 1. Profile

- **Read**: `profile.read`
  - Description: Grants read access to user profile information.

### 2. Posts

- **Read**: `posts.read`
  - Description: Allows reading user posts.

### 3. Apps

- **Read**: `apps.read`
  - Description: Provides read access to information about connected apps.

### 4. Friend

- **Read**: `friend.read`
  - Description: Enables reading friend-related information.
- **Write**: `friend.write`
  - Description: Allows the application to write or modify friend-related data.

### 5. Friendship

- **Read**: `friendship.read`
  - Description: Grants read access to friendship details.
- **Write**: `friendship.write`
  - Description: Allows the application to write or modify friendship data.

### 6. Interaction

- **Read**: `interaction.read`
  - Description: Provides read access to user interactions.
- **Write**: `interaction.write`
  - Description: Allows the application to write or modify user interactions.
