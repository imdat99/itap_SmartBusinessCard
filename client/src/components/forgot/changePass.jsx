import React, { useState } from 'react'
import css from '../Auth/common/css/styles2.module.css'
import { useHistory } from 'react-router-dom'
import './forgot.css'
import axios from 'axios';
import { apiUrl } from '../../store/constantsValue';

function ChangePass({ data }) {
    const history = useHistory();
    const [showPass, setshowPass] = useState(false);
    // document.title = 'Register'
    const [Param, setParam] = useState('Đặt lại mật khẩu của bạn.');
    const [passData, setPass] = useState({
        password: '',
        confirmPass: ''
    })
    const { password, confirmPass } = passData
    const [Error, setError] = useState({
        Pass: false,
        done: false
    });

    const clearState = () => {
        let done = false
        const thisTimeout = setTimeout(() => {
            resetState()
        }, 5000);
        function resetState() {
            clearTimeout(thisTimeout);
            done = true;
            setParam('Đặt lại mật khẩu của bạn.')
            setError(prevState => ({ ...prevState, Pass: false, done: false }))
        }
        if ((Error.Pass || Error.User) && !done) {
            resetState()
        }
    }
    const onChangeRegForm = (e) => {
        setPass({ ...passData, [e.target.name]: e.target.value })
    }
    const submit = async (e) => {
        e.preventDefault();
        setParam('Đang thực hiện...')
        if (passData.password !== passData.confirmPass) {
            setError(prevState => ({ ...prevState, Pass: true }))
            setParam('Mật khẩu không khớp.')
        }
        else {
            await axios.put(`${apiUrl}/auth/reset`, { pwd: passData.password }, { headers: { Authorization: `Bearer ${data.token}` } }).then(res => {
                console.log(res);
                setParam('Cập nhật mật khẩu thành công, tự động chuyển hướng sang login')
                setError(prevState => ({ ...prevState, done: true }))
                setTimeout(() => {
                    history.push('/login');
                }, 3000)
            }).catch(err => {
                console.log(err);
                setParam('Đã quá thời gian hoặc có lỗi!')
                setError(prevState => ({ ...prevState, Pass: true }))
            }).finally(() => {

            })
        }
        clearState()
    }
    return (
        <main className={css.container}>
            <div className={`${css.formContainer} ${css.fade_in}`}>
                <form onSubmit={submit} className={css.form} style={{ padding: '0' }} >
                    <div className={css.formTitle} style={{ padding: '16px 16px 0px 16px' }}>
                        <h1>Xin chào: {data.username}</h1>
                        <p className={Error.Pass ? css.paramError : ''} style={Error.done ? { color: 'green' } : {}}>{Param}</p>

                    </div>

                    <div style={{ margin: '10px 0 20px 0' }} className={css.divider}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 24px 16px' }}>

                        <div className={`${css.inputContainer} ${css.inputContainerPassword} ${Error.Pass ? css.inputError : ''}`}>
                            <input id="ip1" type={showPass ? "text" : "password"} placeholder="Mật khẩu mới"
                                className={`${css.formInput} ${css.formInputPassword}`}
                                required
                                name='password'
                                value={password}
                                onChange={onChangeRegForm}
                            />

                        </div>
                        <div style={{ margin: '0 0 20px 0' }} className={` ${Error.Pass ? css.inputError : ''} ${css.inputContainer} ${css.inputContainerPassword}`}>
                            <input id="ip2" type={showPass ? "text" : "password"} placeholder="Nhập lại mật khẩu mới"
                                className={`${css.formInput} ${css.formInputPassword}`}
                                required
                                name='confirmPass'
                                value={confirmPass}
                                onChange={onChangeRegForm}
                            />

                        </div>
                        <div className="show_pass">
                            <label class="container">Hiển thị mật khẩu
                                <input type="checkbox" onChange={() => setshowPass(!showPass)} />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <button className={`${css.formLogInBtn} ${css.reg}`}>Đăng Ký</button>
                    </div>


                </form>
            </div >


        </main >
    )
};

export default ChangePass;
