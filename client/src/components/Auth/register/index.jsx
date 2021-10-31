import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getRegister } from '../../../store/actions/authAction'

import closebtn from '../common/images/close.png'
import css from '../common/css/styles2.module.css'

function Register({ getRegister, trigger, setTrigger, reff }) {
    // document.title = 'Register'
    const [Param, setParam] = useState('Nhanh chóng và dễ dàng.');
    const [regData, setReg] = useState({
        username: '',
        password: '',
        confirmPass: ''
    })
    const { username, password, confirmPass } = regData
    const [Error, setError] = useState({
        Pass: false,
        User: false
    });

    const clearState = () => {
        let done = false
        const thisTimeout = setTimeout(() => {
            resetState()

        }, 5000);
        function resetState() {
            clearTimeout(thisTimeout);
            done = true;
            setParam('Nhanh chóng và dễ dàng.')
            setError(prevState => ({ ...prevState, Pass: false, User: false }))
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
        if (regData.password !== regData.confirmPass) {
            setError(prevState => ({ ...prevState, Pass: true }))
            setParam('Mật khẩu không khớp.')
        }
        else try {
            const mess = await getRegister({ username, password })
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
                        <div className={`${css.inputContainer} ${Error.User ? css.inputError : ''}`}>
                            <input type="text" placeholder="Tên tài khoản" className={css.formInput}
                                required
                                name='username'
                                value={username}
                                onChange={onChangeRegForm}
                            />
                        </div>
                        <div className={`${css.inputContainer} ${css.inputContainerPassword} ${Error.Pass ? css.inputError : ''}`}>
                            <input id="ip1" type="password" placeholder="Mật khẩu mới"
                                className={`${css.formInput} ${css.formInputPassword}`}
                                required
                                name='password'
                                value={password}
                                onChange={onChangeRegForm}
                            />

                        </div>
                        <div style={{ margin: '0 0 20px 0' }} className={` ${Error.Pass ? css.inputError : ''} ${css.inputContainer} ${css.inputContainerPassword}`}>
                            <input id="ip2" type="password" placeholder="Nhập lại mật khẩu mới"
                                className={`${css.formInput} ${css.formInputPassword}`}
                                required
                                name='confirmPass'
                                value={confirmPass}
                                onChange={onChangeRegForm}
                            />

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

