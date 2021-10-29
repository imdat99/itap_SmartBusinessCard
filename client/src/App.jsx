import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { useEffect, useState } from "react";

import ProtectedRoute from "./middleWare/ProtectedRoute";
import { loadUser } from "./store/actions/authAction";
import Login from "./components/Auth/login/login";
import Home from "./pages/home";
import User from "./pages/user";
import Admin from "./pages/admin";
import Theme from "./components/admin/theme";
import Setting from "./components/admin/setting";


function App({ loadUser, auth }) {
  const [isAuth, set_isAuth] = useState(false)
  useEffect(async () => {
    await loadUser();
    set_isAuth(true)
  }, [])
  return (
    <>
      {isAuth ?
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              {(!auth.authLoading && auth.isAuthenticated) ? <Redirect to="/dash" /> : <Home />}
            </Route>
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/dash' component={Admin} />
            <ProtectedRoute exact path='/dash/theme' component={Theme} />
            <ProtectedRoute exact path='/dash/setting' component={Setting} />
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
