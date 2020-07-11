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

if(localStorage.getItem('state') === null){
  saveState({
    app: store.getState().app
  });
}

store.subscribe(throttle(() => {
  saveState({
    app: store.getState().app
  });
}));

export default store
