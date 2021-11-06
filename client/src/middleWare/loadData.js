import React from 'react'
import { getPosts } from '../store/actions/postsAction'
import { connect } from 'react-redux'

export const LoadData = ({ getPosts }) => {
    React.useEffect(() => {
        getPosts()
    }, [])
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadData)
