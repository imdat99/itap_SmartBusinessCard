import { Router, Redirect, Route } from "react-router-dom"
import { connect } from 'react-redux'
import Navbar from "../components/navbar"

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => auth.isAuthenticated ? (
            <> <Navbar />
                <Component {...rest} {...props} />
            </>) : <Redirect to='/login' />} />
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)