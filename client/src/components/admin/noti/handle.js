import React from 'react'
import NotiUi from './renderui'
import { connect } from 'react-redux'

export const Noti = (props) => {
    console.log('noti')
    return (
        <>
            <NotiUi />
        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Noti)
