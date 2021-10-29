import React from 'react'
import { connect } from 'react-redux'

export const Theme = (props) => {
    console.log('theme')
    return (
        <div>
            <h1 style={{ fontSize: '40px' }}>Theme</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Theme)
