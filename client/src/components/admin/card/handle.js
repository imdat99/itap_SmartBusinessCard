import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { apiUrl } from '../../../store/constantsValue'
import CardUi from './renderui'
import Popup from './popup'
import { useDetectOutsideClick } from '../../../middleWare/detectOutsideClick'
import { updateProfile } from '../../../store/actions/profileAction'

export const Card = (props) => {
    const { profile, updateProfile } = props
    const [_haveCard, set_haveCard] = useState({ visiable: false, data: '' })
    // console.log(profile)
    useEffect(() => {
        async function card_Data() {
            if (profile?.card !== 'null') {
                const res = await axios.get(`${apiUrl}/card/${profile?.card}`)
                set_haveCard({ ..._haveCard, visiable: true, data: res.data })
            }
        }
        card_Data()
    }, [profile])
    const { visiable: popup, setvisiable: set_popup, ref: ref_popup } = useDetectOutsideClick(false)
    return (
        <>
            <CardUi
                set_popup={set_popup}
                haveCard={_haveCard}
            />
            <Popup
                trigger={popup}
                setTrigger={set_popup}
                reff={ref_popup}
                updateProfile={updateProfile}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

const mapDispatchToProps = {
    updateProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
