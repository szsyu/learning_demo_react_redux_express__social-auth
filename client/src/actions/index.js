import axios from 'axios'
import { AUTH_OK, AUTH_ERROR, FETCH_SECRET, LOGOUT } from './types'

const ROOT_URL = 'http://localhost:3000'

export function signup(username, password) {
  console.log('actions -> signup')
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/signup`, { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token) // first set token, it's important!!!
        dispatch({ type: AUTH_OK })
      })
      .catch(error =>
        dispatch({ type: AUTH_ERROR, payload: error.response.data.error }),
      )
  }
}

// for twitter auth
export function setToken(token) {
  console.log('actions -> setToken')
  localStorage.setItem('token', token)
  return { type: AUTH_OK }
}

export function login(username, password) {
  console.log('actions -> login')
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/login`, { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        dispatch({ type: AUTH_OK })
      })
      .catch(error =>
        dispatch({ type: AUTH_ERROR, payload: error.response.data.error }),
      )
  }
}

export function fetchSecret() {
  console.log('fetchSecret -> fetchSecret')
  return dispatch => {
    axios
      .get(`${ROOT_URL}/api/secret`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response =>
        dispatch({ type: FETCH_SECRET, payload: response.data }),
      )
      .catch(error => {
        console.log(error)
        if (error.response.status) {
          // need LOGOUT
          dispatch({ type: AUTH_ERROR })
        }
      })
  }
}

export function logout() {
  console.log('actions -> logout')
  localStorage.removeItem('token')
  return { type: LOGOUT }
}
