---
description: |
  Fync is a platform for finding yourself, and others like you. It provides a public opensouce API for letting other applications connect your friends network to their own. It also provides a web interface for managing your friends network, and a mobile app to Fync(sync) with your friends.
---

# Fync OAuth 2.0 Authorization Code Flow

## Setup

### 1. Register your application

To register your application, you will need to create a new application in the
[developer portal](https://fync.in/dev).

### 2. Configure your application

Once you have created your application, you will need to configure it. You can
do this by clicking on the application in the developer portal, and then
clicking on the "Edit" button.

You will need to configure the following fields:

- `Name`: The name of your application.

- `Description`: A description of your application.

- `Redirect URI`: The URI that the user will be redirected to after
  authorization. This must be a valid URI, and must be registered with the
  application.

### 3. Get your client ID and secret

Once you have configured your application, you will need to get your client ID
and secret. You can do this by clicking on the application in the developer
portal, and then clicking on the "Credentials" tab.

### 4. Get your Authorization URL

Once you have your client ID and secret, you will need to get your Authorization
URL. You can do this by choosing the redirect URI you prefer, and scopes you
want to use, and then copy the generated URL.

## Authorization

### 1. Redirect the user to the Authorization URL

Once you have your Authorization URL, you will need to redirect the user to it.
You can do this by using the `window.location.href` property.

### 2. Handle the redirect

Once the user has been redirected to the Authorization URL, they will be
prompted to authorize your application. If they authorize your application, they
will be redirected to the redirect URI you specified in the application
configuration.

### 3. Get the authorization code

Once the user has been redirected to the redirect URI, you will need to get the
authorization code. You can do this by using the `window.location.href`
property.

### 4. Exchange the authorization code for an access token

Once you have the authorization code, you will need to exchange it for an access
token. You can do this by making a `POST` request to the `/oauth2/token`
endpoint.

### 5. Use the access token to make requests

Once you have the access token, you can use it to make requests to the API. You
can do this by including the access token in the `Authorization` header of your
requests.
