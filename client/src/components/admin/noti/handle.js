import React from 'react'
import { connect } from 'react-redux'

export const Noti = (props) => {
    console.log('noti')
    return (
        <div>
            <h1 style={{ fontSize: '50px' }}>noti</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Noti)
