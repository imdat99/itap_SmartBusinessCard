import React, { useCallback } from 'react'
import { connect } from 'react-redux';
import { getLogout } from '../../../store/actions/authAction'
import RenderSettingUi from './renderUi'
import Crop_Cover_avatar from './cropavatar_cover';
import { useDetectOutsideClick } from '../../../middleWare/detectOutsideClick';

const HandleSetting = ({ getLogout }) => {
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
                imgChange={imgChange}
                getLogout={getLogout}
            ></RenderSettingUi>
            <Crop_Cover_avatar
                trigger={ImgToCrop.visiable}
                isAvatar={ImgToCrop.isAvatar}
                pickFile={ImgToCrop.file}
                setTrigger={handle_set_ImgToCrop}
                abcd={ref_ImgToCrop}
                idPost={123}
            ></Crop_Cover_avatar>
        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    getLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(HandleSetting)
