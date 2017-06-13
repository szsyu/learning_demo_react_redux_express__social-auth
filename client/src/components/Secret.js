import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Secret extends Component {
  componentDidMount() {
    console.log('Secrect -> componentDidMount')
    if (this.props.authenticated) {
      this.props.fetchSecret()
    } else {
      this.props.history.push('/')
    }
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.authenticated) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div>
        <h3>Secret</h3>
        <hr />
        <pre>{JSON.stringify(this.props.data, null, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  data: state.secret.data,
})

export default connect(mapStateToProps, actions)(Secret)
