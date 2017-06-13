import { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import * as actions from '../actions'

class Token extends Component {
  componentWillMount() {
    const parsed = queryString.parse(this.props.location.search)
    console.log(parsed)
    actions.setToken(parsed.token)
    this.props.history.push('/secret')
  }

  render() {
    return false
  }
}

export default connect(null, actions)(Token)
