import { AUTH_ERROR, AUTH_OK, LOGOUT } from '../actions/types'

const initialState = { authenticated: false, error: '' }

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_OK:
      return { ...state, authenticated: true, error: '' }
    case LOGOUT:
      return { ...state, authenticated: false, error: '' }
    case AUTH_ERROR:
      return { ...state, authenticated: false, error: action.payload }
    default:
      return state
  }
}
