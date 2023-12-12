---
description: |
  Fync is a platform for finding yourself, and others like you. It provides a public opensouce API for letting other applications connect your friends network to their own. It also provides a web interface for managing your friends network, and a mobile app to Fync(sync) with your friends.
---

# OAuth 2.0 Access Token Guide

## Introduction

OAuth 2.0 is an open standard for authorization. It allows users to grant
applications access to their data without sharing their credentials. It also
allows applications to obtain limited access to an HTTP service, either on
behalf of a resource owner by orchestrating an approval interaction between the
resource owner and the HTTP service, or by allowing the third-party application
to obtain access on its own behalf.

## Access Token

example: `$2a$10$mC/d78GNF39.CJDvukCimu5mXVJ7RtGhMTsB3raebHO1ft7zltKAy`

### 1. Get an access token

To get an access token, see the
[OAuth 2.0 Authorization Code Flow](/docs/oauth2/auth-code-flow).

### 2. Use the access token

Once you have an access token, you can use it to access the API. You can do this
by adding the access token to the `Authorization` header of your HTTP request.

see the [API Reference](/docs/api) for more information.
