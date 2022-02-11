import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLogin } from '../../../store/actions/authAction'
import { useDetectOutsideClick } from '../../../middleWare/detectOutsideClick'
import Register from '../register'
import Findpass from '../Findpass'

import stl from '../common/css/styles.module.css'
import eye from '../common/images/eye.png'
import eyeOff from '../common/images/eye-off.png'

export const Login = ({ getLogin, auth }) => {
    document.title = 'itap - Login'
    const [LoginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const [Dark, setDark] = useState(false);
    useEffect(() => {
        if (localStorage['selected_theme']) {
            const Theme = localStorage.getItem('selected_theme')
            if (Theme === 'Darkxxx') {
                setDark(true)
            } else { setDark(false) }
        }
    }, [])
    const { username, password } = LoginData
    const [Eye, setEye] = useState({
        isShow: false,
        isOn: false
    })
    const [isError, setisError] = useState(false);
    const { visiable: SignUp, setvisiable: setSignUp, ref: SignUpRef } = useDetectOutsideClick(false)
    const { visiable: FindPass, setvisiable: setFindPass, ref: FindPassRef } = useDetectOutsideClick(false)
    const onChangeLoginForm = event => {
        setisError(false)
        setLoginData({ ...LoginData, [event.target.name]: event.target.value })
    }
    const submit = async (e) => {
        e.preventDefault();
        try {
            const mess = await getLogin(LoginData)
            if (!mess?.data.success) {
                setisError(true)
            }
        } catch (err) {
            console.log(err)
        }
    }
    if (auth.isAuthenticated) {
        return <Redirect to='/dash' />
    }
    else
        return (
            <>
                <main className={`${stl.container} ${stl.body} ${Dark ? stl.normal_theme : stl.dark_theme}`}>
                    {/* <!-- TITLE --> */}
                    <div className={stl.titleContainer}>
                        {/* <!-- <img src="images/logo.svg" className={title-logo" /> --> */}
                        <Link to='/'>
                            <h2 className={` ${stl["header"]} ${stl["titleLogo"]} `} data-text="itap">
                                &nbsp;
                            </h2>
                        </Link>
                        <p className={stl.titleParagraph}>
                            1 chạm giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                        </p>
                    </div >
                    {/* <!-- FORM --> */}
                    < div className={`${stl.formContainer} `}>
                        < form onSubmit={submit} className={stl.form}>
                            <div className={`${stl.inputContainer} ${isError ? stl.inputError : ''}`}>
                                < input type="text" placeholder="Tên tài khoản hoặc Email" className={stl.formInput}
                                    required
                                    autoComplete='off'
                                    name='username'
                                    value={username}
                                    onChange={onChangeLoginForm}
                                />
                            </div >
                            <div className={`${stl.inputContainer} ${stl.inputContainerPassword} ${isError ? stl.inputError : ''}`}>
                                < input type={Eye.isShow ? 'text' : 'password'} placeholder="Mật khẩu" className={stl.formInput}
                                    required
                                    name='password'
                                    value={password}
                                    onChange={(e) => {
                                        onChangeLoginForm(e)
                                        e.target.value !== '' ? setEye({ ...Eye, isOn: true }) : setEye({ ...Eye, isOn: false })
                                    }}
                                />
                                <div className={`${stl.passwordEyeContainer} ${Eye.isOn ? '' : stl.hidden}`}>
                                    <img onClick={() => { setEye({ ...Eye, isShow: !Eye.isShow }) }} src={Eye.isShow ? eyeOff : eye} className={stl.passwordEye} alt='' />
                                </div>
                            </div >
                            <button className={stl.formLogInBtn}>Đăng nhập</button>
                            <div onClick={() => { setFindPass(true) }} className={stl.formForgotPassword}>Quên mật khẩu?</div>
                            < div className={stl.divider}></div>
                            <div onClick={() => { setSignUp(true) }} className={stl.formCreateAccountBtn}>Tạo tài khoản mớI</div>
                        </form >
                    </div >
                </main >
                <Register trigger={SignUp} setTrigger={setSignUp} reff={SignUpRef}></Register>
                <Findpass trigger={FindPass} setTrigger={setFindPass} reff={FindPassRef}></Findpass>
            </>
        )
}


const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    getLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
