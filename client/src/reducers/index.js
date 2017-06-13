import { combineReducers } from 'redux'
import auth from './auth'
import secret from './secret'

const reducers = { auth, secret }

export default combineReducers(reducers)
