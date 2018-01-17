/* global window BroadcastChannel true */

/**
 * Redux state channel middleware
 * @param {string} [channelName]
 * @param {array} [blacklist]
 * @return {function}
 */
export default function reduxStateChannelMiddleware(channelName = 'state-channel', blacklist = []) {

  // When BroadcastChannel is not available, return opaque middleware
  if (!window.BroadcastChannel) {
    return store => next => action => next(action)
  }

  const broadcastChannel = new BroadcastChannel(channelName)

  // Note: using methods available in browsers which support BroadcastChannel
  return store => {
    // Listener (not flux-standard-action)
    broadcastChannel.addEventListener('message', messageEvent => store.dispatch({
      ...messageEvent.data,
      isBroadcastReceive: true
    }))

    // Emitter
    return next => action => {

      // When action is a thunk, proceed
      if (!action.type) {
        return next(action)
      }

      const {isBroadcastReceive, ...newAction} = action

      // Don't repost if it's an action received from channel
      if (!isBroadcastReceive
        && !action.type.startsWith('persist/')
        && !blacklist.includes(action.type)
      ) {
        broadcastChannel.postMessage(action)
      }

      return next(newAction)
    }
  }
}
