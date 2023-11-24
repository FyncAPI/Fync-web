---
description: |
  Integrate Discord Oauth2 to Fync
---

# Discord OAuth2 Integration with Fync

## 1. Turn on discord Auth Mode

## 2. Add the Client Id and secret to fync

## 3. Add the redirect url to discord

## 4. Get URL to discord authorization page in fync

## 5. Add discord login button to your app with the url

### Flow

1. app redirects to discord authorization page
2. user authorizes app
3. discord callback to fync //TODO: generate callback url. or just get the
   client id and secret?
4. fync get profile info from discord
5. fync register/login user
6. fync redirect to app with auth code
7. app exchange auth code for access token
8. app use access token to access fync api
