import React from 'react'
import { connect } from 'react-redux'

export const Card = (props) => {
    console.log('theme')
    return (
        <div>
            <h1 style={{ fontSize: '40px' }}>card</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
