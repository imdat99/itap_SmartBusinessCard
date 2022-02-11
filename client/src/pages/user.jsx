import React, { useState, useEffect } from 'react'
import { apiUrl } from '../store/constantsValue'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import IsUser from '../components/user/isUser'
import Loader from '../components/common/loader'
import IsErr from '../components/common/isErr'

const User = (props) => {
    const id = props.match?.params?.code
    const [UserData, setUserData] = useState({})
    const [isFound, setFound] = useState(true)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`${apiUrl}/page/${id}`).then(response => {
            setUserData(response.data)
        }).catch(err => {
            setFound(false)
        }).finally(() => setLoading(false))
    }, [])
    return (
        // <IsUser />
        isLoading ? (<Loader />) :
            isFound ? <IsUser data={UserData} /> : <IsErr errData={{ isError: true, code: 404, message: 'Not found' }} />
    )
}

export default withRouter(User)
