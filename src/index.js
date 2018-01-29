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

    if (process.env.NODE_ENV === 'development') {
      console.warn('BroadcastChannel API is not available')
    }

    return store => next => action => next(action)
  }

  const broadcastChannel = new BroadcastChannel(channelName)

  // Note: using methods available in browsers which support BroadcastChannel
  return store => {
    // Listener
    broadcastChannel.addEventListener('message', messageEvent => store.dispatch({
      ...messageEvent.data,
      isBroadcastReceive: true
    }))

    // Not adding `messageerror` listener to handle data which cannot be deserialized as such should be catched at serialization

    // Emitter
    return next => action => {

      // When action is a thunk, wait until it's resolved
      if (action instanceof Function) {
        return next(action)
      }

      const { isBroadcastReceive, ...newAction } = action

      // Don't repost if it's an action received from channel
      if (!isBroadcastReceive
        && !action.type.startsWith('persist/')
        && !blacklist.includes(action.type)
      ) {
        try {
          /** @throws {DOMException} - Cannot serialize (DataCloneError) */
          broadcastChannel.postMessage(action)
        } catch (error) {
          console.error('reduxStateChannelMiddleware post message error:', error)
        }
      }

      return next(newAction)
    }
  }
}
