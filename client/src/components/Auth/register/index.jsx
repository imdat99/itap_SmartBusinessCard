import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getRegister } from '../../../store/actions/authAction'

import closebtn from '../common/images/close.png'
import css from '../common/css/styles2.module.css'
import stl from '../common/css/styles.module.css'
import eye from '../common/images/eye.png'
import eyeOff from '../common/images/eye-off.png'

function Register({ getRegister, trigger, setTrigger, reff }) {
    // document.title = 'Register'
    const [Param, setParam] = useState('Nhanh chóng và dễ dàng.');
    const [Eye, setEye] = useState({
        isShow: false,
        isOn: false
    })
    const [regData, setReg] = useState({
        email: '',
        username: '',
        password: ''
    })
    const { email, username, password } = regData
    const [Error, setError] = useState({
        email: false,
        Pass: false,
        User: false
    });
    useEffect(() => {
        setReg({
            email: '',
            username: '',
            password: ''
        })
    }, [trigger]);
    const clearState = () => {
        let done = false
        const thisTimeout = setTimeout(() => {
            resetState()
        }, 5000);
        function resetState() {
            clearTimeout(thisTimeout);
            done = true;
            setParam('Nhanh chóng và dễ dàng.')
            setError(prevState => ({ ...prevState, Pass: false, User: false, email: false }))
        }
        if ((Error.Pass || Error.User) && !done) {
            resetState()
        }
    }
    const onChangeRegForm = (e) => {
        setReg({ ...regData, [e.target.name]: e.target.value })
    }
    const submit = async (e) => {
        e.preventDefault();
        setParam('Đang thực hiện...')
        try {
            const mess = await getRegister({ email, username, password })
            if (!mess.data.success) {
                setParam(mess.data.message)
                setError(prevState => ({ ...prevState, User: true }))
            }
        } catch (err) {
            console.log(err)
        }
        clearState()
    }
    return (trigger) ?
        <main className={css.container}>
            <div className={`${css.formContainer} ${css.fade_in}`}>
                <form onSubmit={submit} className={css.form} style={{ padding: '0' }} ref={reff}>
                    <div className={css.formTitle} style={{ padding: '16px 16px 0px 16px' }}>
                        <h1>Đăng ký</h1>
                        <p className={Error.Pass || Error.User ? css.paramError : ''}>{Param}</p>
                        <div onClick={() => { setTrigger(false) }} className={css.formExit}>
                            <img src={closebtn} alt="" />
                        </div>
                    </div>

                    <div style={{ margin: '10px 0 20px 0' }} className={css.divider}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 24px 16px' }}>

                        <div className={`${css.inputContainer} ${Error.User ? css.inputError : ''}`} style={{ marginBottom: '1rem' }}>
                            <input type="email" autoComplete="off" placeholder="Email" className={css.formInput}
                                required
                                name='email'
                                value={email}
                                onChange={onChangeRegForm}
                            />
                        </div>

                        <div className={`${css.inputContainer} ${Error.User ? css.inputError : ''}`}>
                            <input type="text" autoComplete="off" placeholder="Tên tài khoản" className={css.formInput}
                                required
                                name='username'
                                value={username}
                                onChange={onChangeRegForm}
                            />
                        </div>
                        <div className={`${css.inputContainer} ${css.inputContainerPassword} ${Error.Pass ? css.inputError : ''}`}>
                            <input id="ip1" type={Eye.isShow ? 'text' : 'password'} placeholder="Mật khẩu mới"
                                className={`${css.formInput} ${css.formInputPassword}`}
                                required
                                name='password'
                                value={password}
                                onChange={(e) => {
                                    onChangeRegForm(e)
                                    e.target.value !== '' ? setEye({ ...Eye, isOn: true }) : setEye({ ...Eye, isOn: false })
                                }}
                            />
                            <div className={`${stl.passwordEyeContainer} ${Eye.isOn ? '' : stl.hidden}`}>
                                <img onClick={() => { setEye({ ...Eye, isShow: !Eye.isShow }) }} src={Eye.isShow ? eyeOff : eye} className={stl.passwordEye} alt='' />
                            </div>
                        </div>
                        <button className={`${css.formLogInBtn} ${css.reg}`}>Đăng Ký</button>
                    </div>
                </form>
            </div >
        </main >
        : ''
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    getRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

