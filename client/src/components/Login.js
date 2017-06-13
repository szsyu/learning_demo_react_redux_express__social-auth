import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Login extends Component {
  constructor(props) {
    console.log('Login -> constructor')
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillUpdate(nextProps) {
    console.log('Login -> componentWillUpdate')
    if (nextProps.authenticated) {
      this.props.history.push('/secret')
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.login(this.username.value, this.password.value)
  }

  render() {
    const errorMessage = this.props.errorMessage
      ? <div>{this.props.errorMessage}</div>
      : null
    return (
      <div>
        <h3>Login</h3>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            placeholder="username"
            ref={ref => (this.username = ref)}
          />
          <input
            name="password"
            placeholder="password"
            ref={ref => (this.password = ref)}
          />
          <input type="submit" value="Login" />
        </form>
        <br />
        <a href="http://127.0.0.1:3000/api/auth/twitter">Login via Twitter</a>
        <hr />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  }
}

export default connect(mapStateToProps, actions)(Login)
