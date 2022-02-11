import React, { useState, useEffect } from 'react'
import { apiUrl } from '../store/constantsValue'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import IsErr from '../components/common/isErr'
import Loader from '../components/common/loader'
import ChangePass from '../components/forgot/changePass'

const ForGot = (props) => {
    const token = props.match?.params?.token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const [info, set_info] = useState({ username: '', token: '' });
    const [error, set_error] = useState({
        isError: false,
        code: 200,
        message: ''
    });
    const [isLoading, set_load] = useState(true)
    useEffect(() => {
        axios.get(`${apiUrl}/auth/`, config).then(response => {
            set_info({ username: response.data?.user?.username, token });
        }).catch(err => {
            if (err.response.status == 403) set_error({ isError: true, code: 403, message: 'Đường Link đã hết hạn' })
            if (err.response.status == 401) set_error({ isError: true, code: 401, message: 'Đường Link không tồn tại' })
        }).finally(() => set_load(false))
    }, []);
    return (
        isLoading ? (<Loader />) :
            error.isError ? <IsErr errData={error} /> : <ChangePass data={info} />
    )
}

export default withRouter(ForGot)