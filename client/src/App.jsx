import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { useEffect, useState } from "react";

import ProtectedRoute from "./middleWare/ProtectedRoute";
import { loadUser } from "./store/actions/authAction";
import Login from "./components/Auth/login/login";
import Home from "./pages/home";
import User from "./pages/user";
import Admin from "./pages/admin";
import './app.css'
import './boxicons-2.0.7/css/boxicons.css'

function App({ loadUser, auth }) {
  const [isAuth, set_isAuth] = useState(false)
  useEffect(() => {
    async function fetchData() {
      await loadUser();
      set_isAuth(true)
    }
    fetchData()
  }
    , [])
  return (
    <>
      {isAuth ?
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              {(!auth.authLoading && auth.isAuthenticated) ? <Redirect to="/dash" /> : <Home />}
            </Route>
            <Route exact path='/login' component={Login} />
            <ProtectedRoute
              exact
              path='/dash'
              component={Admin}
              customProps='dash'
            />
            <ProtectedRoute
              exact
              path='/dash/theme'
              component={Admin}
              customProps='theme'
            />
            <ProtectedRoute
              exact
              path='/dash/setting'
              component={Admin}
              customProps='setting'
            />
            <ProtectedRoute
              exact
              path='/dash/card'
              component={Admin}
              customProps='card'
            />
            <ProtectedRoute
              exact
              path='/dash/noti'
              component={Admin}
              customProps='noti'
            />
            <Route path='/:code' component={User} />
          </Switch>

        </BrowserRouter> : ''}
    </>


  )
}
const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  loadUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
