import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

import { throttle } from 'lodash'
import { loadState, saveState } from './local-storage'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

export const history = createBrowserHistory()

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  composedEnhancers
)

store.subscribe(() => {
  debugger
  saveState({
    app: store.getState()
  });
});

export default store
