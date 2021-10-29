import React, { useState, useEffect } from 'react'
import { apiUrl } from '../store/constantsValue'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import IsUser from '../components/user/isUser'
import Notfound404 from '../components/common/Notfound404'
import Loadding from '../components/common/loadding'


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
        isLoading ? (<IsUser><Loadding /></IsUser>) :
            isFound ? <IsUser data={UserData} /> : <Notfound404 />
    )
}

export default withRouter(User)
