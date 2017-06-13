import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Logout extends Component {
  componentWillMount() {
    this.props.logout()
    this.props.history.push('/')
  }

  render() {
    return null
  }
}

export default connect(null, actions)(Logout)
