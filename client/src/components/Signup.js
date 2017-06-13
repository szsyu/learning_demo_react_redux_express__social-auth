import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      this.props.history.push('/secret')
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.signup(this.username.value, this.password.value)
  }

  render() {
    const errorMessage = this.props.errorMessage
      ? <div>{this.props.errorMessage}</div>
      : null
    return (
      <div>
        <h3>Sign Up</h3>
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
          <input type="submit" value="Sign Up" />
        </form>
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

export default connect(mapStateToProps, actions)(Signup)
