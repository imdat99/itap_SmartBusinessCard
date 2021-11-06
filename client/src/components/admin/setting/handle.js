import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { apiUrl } from '../../../store/constantsValue';
import { connect } from 'react-redux';
import { getLogout } from '../../../store/actions/authAction'
import { updateProfile } from '../../../store/actions/profileAction';
import RenderSettingUi from './renderUi'
import Crop_Cover_avatar from './cropavatar_cover';
import { useDetectOutsideClick } from '../../../middleWare/detectOutsideClick';

const HandleSetting = ({ getLogout, updateProfile, profile, username }) => {
    //Change pass
    const initChangePass = {
        oldpass: '',
        newpass: '',
        confirmPass: ''
    }
    const [passwordData, set_passwordData] = useState(initChangePass)
    const [changePassStatus, set_changePassStatus] = useState(0)
    const onChangePass = (e) => {
        set_passwordData({ ...passwordData, [e.target.name]: e.target.value })
    }

    // change pass - clear toast
    const clearState = () => {
        let done = false
        const thisTimeout = setTimeout(() => {
            resetState()

        }, 5000);
        function resetState() {
            clearTimeout(thisTimeout);
            done = true;
            set_changePassStatus(0)
        }
        if ((Error.Pass || Error.User) && !done) {
            resetState()
        }
    }
    // change pass - handle event
    const handleChangePass = async () => {
        if (passwordData.newpass !== passwordData.confirmPass) {
            set_changePassStatus(2)
        }
        else try {
            const { oldpass, newpass } = passwordData
            const mess = await axios.put(`${apiUrl}/auth`, { oldpass, newpass })
            if (mess.data.success) {
                set_changePassStatus(3)
                set_passwordData(initChangePass)
            }
            return mess.data
        } catch (err) {
            if (!err.response.success) {
                set_changePassStatus(1)
            }
        }

        clearState()
    }
    // change name/desc
    const [info, set_info] = useState({ fullName: '', decription: '' })
    const onChangeNameDesc = (e) => {
        set_info({ ...info, [e.target.name]: e.target.value })
    }
    const handleChangeNameDesc = async () => {
        const { fullName, decription } = info
        const response = await updateProfile(fullName === '' ? { decription } : { fullName })
        return response
    }



    //Change avatar or cover
    const { visiable: ImgToCrop, setvisiable: set_ImgToCrop, ref: ref_ImgToCrop } = useDetectOutsideClick({
        visiable: false,
        isAvatar: false,
        file: null
    })
    const handle_set_ImgToCrop = useCallback(() => {
        set_ImgToCrop({
            visiable: false,
            isAvatar: false,
            file: null
        })
    }, [])
    const imgChange = (e) => {
        const file = e.target.files[0];

        e.target.value = null;

        if (file) {
            const { type } = file;
            if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
            } else if (e.target.name === 'imgAvatar') {
                set_ImgToCrop({ isAvatar: true, visiable: true, file: file })
            } else {
                set_ImgToCrop({ isAvatar: false, visiable: true, file: file })
            }
        }
    }
    return (
        <>
            <RenderSettingUi
                data={profile}
                imgChange={imgChange}
                getLogout={getLogout}
                passwordData={passwordData}
                set_passwordData={set_passwordData}
                changePassStatus={changePassStatus}
                handleChangePass={handleChangePass}
                onChangePass={onChangePass}
                onChangeNameDesc={onChangeNameDesc}
                handleChangeNameDesc={handleChangeNameDesc}
                info={info}
                set_info={set_info}
                username={username}
            />
            <Crop_Cover_avatar
                trigger={ImgToCrop.visiable}
                isAvatar={ImgToCrop.isAvatar}
                pickFile={ImgToCrop.file}
                setTrigger={handle_set_ImgToCrop}
                updateProfile={updateProfile}
                abcd={ref_ImgToCrop}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    username: state.auth.user.username
})

const mapDispatchToProps = {
    getLogout, updateProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(HandleSetting)
