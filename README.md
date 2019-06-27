# Redux crosstab broadcast channel middleware

Lightweight Redux middleware to sync state across browser tabs/ windows with same origin (browsing context) using [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel).

When BroadcastChannel interface [isn't available](https://caniuse.com/#search=BroadcastChannel) (at the moment only Chrome 54+ or Firefox 38+ are supported) middleware is opaque - does nothing.
For list of polyfills is see [this Web fundamentals article](https://developers.google.com/web/updates/2016/09/broadcastchannel#feature_detection_and_browser_support).


## Installation

```sh
npm install --save @piotr-cz/redux-broadcast-middleware
```
or

```
yarn add @piotr-cz/redux-broadcast-middleware
```


## Setup

Import the middleware and include it in `applyMiddleware` when creating Redux store:

```js
// configureStore.js

import reduxBroadcastMiddleware from '@piotr-cz/redux-broadcast-middleware'

//...

const store = createStore(
  rootReducer,
  applyMiddleware(
    reduxBroadcastMiddleware(
      'state-channel',
      ['DO_NOT_SYNC_THIS_ACTION']
    )
  )
)
```


### Options

- _{string}_ **Channel name** - Used for broadcasting and listening to
- _{Array}_ **Blacklist** - Array of additional actions that should be ignored


## Notes

- Middleware doesn't sync [Redux-persist](https://www.npmjs.com/package/redux-persist) actions (starting with `persist/` prefix) by puprose
- Errors, Functions and DOM nodes cannot be broadcasted. For more info read [MDN: The structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)


## Similar projects

- [cross-tab-middleware](https://github.com/stutrek/cross-tab-middleware) - redux middleware, uses localStorage to sync
- [Redux-State-Sync](https://github.com/AOHUA/redux-state-sync) - redux middlware, uses localStorage to sync
- [Redux Persist Crosstab](https://github.com/rt2zz/redux-persist-crosstab) - redux persist rehdration, uses localsStorage to sync
