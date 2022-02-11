import React, { useState, useEffect } from 'react'
import axios from "axios"
import closebtn from '../common/images/close.png'
import css from '../common/css/styles2.module.css'
import { apiUrl } from '../../../store/constantsValue'
function Findpass(props) {
    const [FindUser, setFindUser] = useState('');
    const [isError, setisError] = useState(false);
    const [mess, setmess] = useState('');
    const onChangeForm = event => {
        setFindUser(event.target.value)
        setmess('')
        setisError(false)
    }
    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${apiUrl}/auth/forgotpw`, { username: FindUser })
            if (res?.data.success) {
                setmess(res?.data.message)
                setFindUser('')
            }
        }
        catch (err) {
            console.log(err.message);
            setisError(true)
            setFindUser('')
        }
        // if (!res?.data.success) {
        //     setisError(true)
        // }
    }
    useEffect(() => {
        setFindUser('')
        setmess('')
        setisError(false)
    }, [props.trigger]);
    return (props.trigger) ?
        <main className={css.container}>
            < div style={{ margin: 'auto' }}>
                <div className={`${css.formContainer} ${css.fade_in}`}>
                    < form className={css.form} style={{ padding: '0' }} ref={props.reff} onSubmit={submit}>
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
                            <p style={{ marginBottom: '5px', textAlign: 'left', lineHeight: '22px', color: isError ? 'red' : 'green' }}>
                                {isError ? 'Tài khoản không tồn tại!' : mess}
                            </p>
                            <div className={`${css.inputContainer}`} style={{ margin: '0 0 16px 0' }}>
                                < input type="text" placeholder="Username or Email" className={css.formInput}
                                    required
                                    autoComplete='off'
                                    name='FindUser'
                                    value={FindUser}
                                    onChange={onChangeForm}
                                />
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
        : null
}

export default Findpass

