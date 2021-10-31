import React, { useState } from 'react'

import closebtn from '../common/images/close.png'
import css from '../common/css/styles2.module.css'

function Findpass(props) {
    // document.title = 'Findpass'
    const [userName, setuserName] = useState('')
    const [passWord, setpassWord] = useState('')
    const submit = (e) => {
        e.preventDefault();
        const data = {
            ...userName,
            ...passWord
        }
        console.log(data)
        // getLogin(data)
    }
    return (props.trigger) ?
        <main className={css.container}>
            < div style={{ margin: 'auto' }}>
                <div className={`${css.formContainer} ${css.fade_in}`}>
                    < form className={css.form} style={{ padding: '0' }} ref={props.reff}>
                        <div className={css.formTitle} style={{ padding: '16px 16px 16px 16px' }}>
                            <h2>Đặt lại mật khẩu</h2>
                            <div onClick={() => { props.setTrigger(false) }} className={css.formExit}>
                                < img src={closebtn} alt="" />
                            </div >
                        </div >

                        <div style={{ margin: '0px 0 20px 0' }} className={css.divider}></div>
                        < div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 24px 16px' }} >
                            <p style={{ marginBottom: '16px', textAlign: 'left', lineHeight: '22px' }}>
                                Vui lòng nhập tên đăng nhập để
                                tìm
                                kiếm tài khoản
                                của bạn.</p>
                            <div className={`${css.inputContainer}`} style={{ margin: '0 0 16px 0' }}>
                                < input type="text" placeholder="Username" className={css.formInput} />
                            </div >

                        </div >
                        <div style={{ margin: '-10px 0 20px 0' }} className={css.divider}></div>
                        < div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }} >
                            <button className={`${css.formLogInBtn} ${css.recover}`}>Tìm kiếm</button>
                        </div >


                    </form >
                </div >
            </div >


        </main >
        : ''
}

export default Findpass

