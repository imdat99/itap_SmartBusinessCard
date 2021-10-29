import React from 'react'
import { connect } from 'react-redux'
import { getLogout } from '../../store/actions/authAction'
export const Setting = ({ getLogout, auth }) => {
    console.log('setting')
    return (
        <div>
            <h1 style={{ fontSize: '40px' }}>ADMIM</h1>
            <button onClick={() => { getLogout() }}>logout</button>
        </div>

    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    getLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
