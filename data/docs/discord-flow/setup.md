---
description: |
  Integrate Discord Oauth2 to Fync
---

# Discord OAuth2 Integration with Fync

## 1. Turn on discord Auth Mode

## 2. Add the redirect url to discord

## 3. Add your redirect url to fync

## 4. Add discord login button to your app

### Flow

1. app redirects to discord authorization page
2. user authorizes app
3. discord callback to fync
4. fync get profile info from discord
5. fync register/login user
6. fync redirect to app with auth code
7. app exchange auth code for access token
8. app use access token to access fync api
