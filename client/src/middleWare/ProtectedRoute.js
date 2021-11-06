import { Redirect, Route } from "react-router-dom"
import { connect } from 'react-redux'
import Navbar from "../components/navbar"

const ProtectedRoute = ({ auth, CustomProps, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => auth.isAuthenticated ? (
            <>
                <Navbar />

                <Component {...rest} {...props} CustomProps={CustomProps} />
            </>) : <Redirect to='/login' />} />
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(ProtectedRoute)