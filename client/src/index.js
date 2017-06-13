import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import reducers from './reducers'
import App from './components/App'
import { AUTH_OK } from './actions/types'

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk, reduxLogger)),
)

const token = localStorage.getItem('token')
if (token) {
  store.dispatch({ type: AUTH_OK })
}

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
)
