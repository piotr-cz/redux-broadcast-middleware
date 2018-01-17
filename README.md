# Redux state channel middleware

Lightweight Redux middleware to sync state across tabs using [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel).

When BroadcastChannel [is not available](https://caniuse.com/#search=BroadcastChannel) (not Chrome or Firefox) middleware is opaque (does nothing).
For polyfills see [this article](https://developers.google.com/web/updates/2016/09/broadcastchannel#feature_detection_and_browser_support)

Doesn't sync [Redux-persist](https://www.npmjs.com/package/redux-persist) actions (starting with `persist/` prefix)

## Install

```sh
npm install --save @piotr-cz/redux-state-channel
```

## How to use

```js
import reduxStateChannelMiddleware from '@piotr-cz/redux-state-channel'

const store = createStore(
  reducer,
  applyMiddleware(
    reduxStateChannelMiddleware(
      'state-channel'
      ['DO_NOT_SYNC_THIS_ACTION']
    )
  )
)
```

### Options

- {string} Channel name - Messages with this channel will be broadcasted to all browser tabs
- {array} Blacklist - Array of actions that should be ignored

### Similar projects

- [cross-tab-middleware](https://github.com/stutrek/cross-tab-middleware) - redux middleware, uses localStorage to sync
- [Redux-State-Sync](https://github.com/AOHUA/redux-state-sync) - redux middlware, uses localStorage to sync
- [Redux Persist Crosstab](https://github.com/rt2zz/redux-persist-crosstab) - redux persist rehdration, uses localsStorage to sync
