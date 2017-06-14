import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import * as actions from '../actions'
import { store } from '../index'
import { AUTH_OK } from '../actions/types'

class Token extends Component {
  componentWillMount() {
    console.log('Token -> componentWillMount')
    const parsed = queryString.parse(this.props.location.search)
    console.log('get token', parsed.token)
    // actions.setToken(parsed.token) I don't understand why actions doesn't work :(
    localStorage.setItem('token', parsed.token)
    store.dispatch({ type: AUTH_OK })
    this.props.history.push('/secret')
  }

  componentWillUpdate(nextProps) {
    console.log('Token -> componentWillUpdate')
    if (nextProps.authenticated) {
      this.props.history.push('/secret')
    }
  }

  render() {
    return <div>Token...</div>
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  }
}

export default connect(mapStateToProps, actions)(Token)
