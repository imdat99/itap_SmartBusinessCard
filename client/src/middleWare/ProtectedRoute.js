import { Router, Redirect, Route } from "react-router-dom"
import { connect } from 'react-redux'
import Navbar from "../components/navbar"

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    console.log(auth)
    return (
        <Route {...rest} render={props => auth.isAuthenticated ? (
            <> <Navbar />
                <Component {...props} />
            </>) : <Redirect to='/login' />} />
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(ProtectedRoute)