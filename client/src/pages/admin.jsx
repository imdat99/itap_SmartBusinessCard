import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../store/actions/postsAction'
import { getProfile } from '../store/actions/profileAction';

import Card from '../components/admin/card/handle';
import Noti from '../components/admin/noti/handle';
import Theme from '../components/admin/theme/handle';
import HandleSetting from "../components/admin/setting/handle";
import AdminIndex from "../components/admin/index/handle";
export const Admin = (props) => {
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        async function loadData() {
            const { success } = await props.getPosts()
            await props.getProfile();
            if (success) {
                setisLoading(false)
            }
        }
        loadData()
    }, [])
    switch (props.customProps) {
        case 'dash': {
            return <AdminIndex isLoading={isLoading} />
        }
        case 'theme': {
            return <Theme />
        }
        case 'setting': {
            return <HandleSetting />
        }
        case 'card': {
            return <Card />
        }
        case 'noti': {
            return <Noti />
        }
        default:
            return <> </>
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    getPosts, getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
