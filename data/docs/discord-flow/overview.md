---
description: |
  Integrate Discord Oauth2 to Fync
---

# Discord OAuth2 Integration with Fync

## Overview

This guide provides instructions on integrating Discord OAuth2 with Fync,
allowing users to authenticate using their Discord accounts and register their
profiles in Fync.

### Why

Let user register with familiar platform like discord while using fync. Also
discord can't redirect directly to deeplink, so fync can be used as a bridge.

### Flow

1. app redirects to discord authorization page
2. user authorizes app
3. discord callback to fync
4. fync get profile info from discord
5. fync register/login user
6. fync redirect to app with auth code
7. app exchange auth code for access token
8. app use access token to access fync api
