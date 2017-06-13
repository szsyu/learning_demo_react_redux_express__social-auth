import { FETCH_SECRET, AUTH_ERROR, LOGOUT } from '../actions/types'

export default function(state = { data: {} }, action) {
  switch (action.type) {
    case AUTH_ERROR:
      return { ...state, data: {} }
    case LOGOUT:
      return { ...state, data: {} }
    case FETCH_SECRET:
      return { ...state, data: action.payload }
    default:
      return state
  }
}
