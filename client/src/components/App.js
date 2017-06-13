import React from 'react'
import { BrowserRouter, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Login'
import Secret from './Secret'
import Signup from './Signup'
import Logout from './Logout'
import Token from './Token'

const App = props => {
  let userMenu = null
  if (props.authenticated) {
    userMenu = (
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/secret">Secret</NavLink></li>
        <li><NavLink to="/logout">Logout</NavLink></li>
      </ul>
    )
  } else {
    userMenu = (
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/signup">Signup</NavLink></li>
      </ul>
    )
  }

  return (
    <BrowserRouter>
      <div>
        <h1>React Auth (passport local+jwt)</h1>
        {userMenu}
        <hr />

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/logout" component={Logout} />
        <Route path="/secret" component={Secret} />
        <Route path="/token" component={Token} />
      </div>
    </BrowserRouter>
  )
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(App)
