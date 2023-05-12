---
description: |
  Fync is a platform for finding yourself, and others like you. It provides a public opensouce API for letting other applications connect your friends network to their own. It also provides a web interface for managing your friends network, and a mobile app to Fync(sync) with your friends.
---

Fync is a platform for finding yourself, and others like you. It provides a
public open source API for letting other applications connect your friends
network to their own. It also provides a web interface for managing your friends
network, and a mobile app to Fync(sync) with your friends.

Fync has 3 open source platforms:

- [Fync API](https://fync-api.deno.dev) - The public API for Fync
  - built with [Deno][deno] and [Deno Deploy][deno-deploy]
  - [source code](https://github.com/fyncAPI/fync-api)
- [Fync Web](https://fync.deno.dev) - The web interface for Fync
  - built with [Fresh][fresh] and [Deno Deploy][deno-deploy]
  - [source code](https://github.com/fyncAPI/fync-web)

- [Fync App](https://fync.deno.dev/app) - The mobile app for Fync
  - built with [React Native](https://reactnative.dev) and
    [Expo](https://expo.io)
  - [source code](https://github.com/fyncAPI/fyncApp)

Some stand out features:

- No build step
- Zero config necessary
- JIT rendering on the edge
- Tiny & fast (no client JS is required by the framework)
- Optional client side hydration of individual components
- Highly resilient because of progressive enhancement and use of native browser
  features
- TypeScript out of the box
- File-system routing à la Next.js

[deno]: https://deno.land
[fresh]: https://fresh.deno.dev
[deno-deploy]: https://deno.com/deploy
