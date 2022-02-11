import React, { useState, useEffect, memo } from 'react'

import closebtn from '../../Auth/common/images/close.png'
import css from '../../Auth/common/css/styles2.module.css'
import Loader from '../../common/loader'

function Popup({ updateProfile, trigger, setTrigger, reff }) {
    const [onLoad, setonLoad] = useState(false);
    const [_CardId, set_CardId] = useState('')
    const [_notice, set_notice] = useState('')
    // 

    const onChangePostForm = (e) => {
        set_CardId(e.target.value)
    }
    const submit = async (e) => {
        e.preventDefault();
        setonLoad(true)
        const response = await updateProfile({ card: _CardId })
        if (response.success) {
            setonLoad(false);
            setTrigger(false)
        }
    }
    return (trigger) ?
        <main className={css.container} style={{ zIndex: '1000' }}>
            <div className={`${css.formContainer} ${css.fade_in}`}>
                <form onSubmit={submit} className={css.form} style={{ padding: '0' }} ref={reff} >
                    <div className={css.onLoad} style={!onLoad ? { display: 'none' } : {}}>
                        <Loader></Loader>
                    </div>
                    <div className={css.formTitle} style={{ padding: '16px 16px 0px 16px' }}>
                        <h1>Nhập mã thẻ</h1>

                        <div onClick={() => { setTrigger(false) }} className={css.formExit}>
                            <img src={closebtn} alt="" />
                        </div>
                    </div>

                    <div style={{ margin: '10px 0 20px 0' }} className={css.divider}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 24px 16px' }}>
                        <p style={{ marginBottom: '1rem', textAlign: 'left' }}>
                            Mã thẻ được in trên hoá đơn khi mua thẻ.</p>
                        <div className={`${css.inputContainer} ${Error.User ? css.inputError : ''}`} style={{ marginBottom: '1rem' }}>
                            <input type="text" autoComplete="off" placeholder="Nhập mã thẻ" className={css.formInput}
                                required
                                name='card'
                                onChange={onChangePostForm}
                            />
                        </div>


                        <button className={`${css.formLogInBtn} `}>Nhập mã</button>
                    </div>


                </form>
            </div >


        </main >
        : ''
}


export default memo(Popup)

