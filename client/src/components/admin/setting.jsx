import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getLogout } from '../../store/actions/authAction'
import QRCode from "react-qr-code";
import css from './setting/setting.module.css'
import coverImage from '../../assets/bia.jpg'
import avatarImage from '../../assets/avatar.jpg'
export const Setting = ({ getLogout, auth }) => {
    const [changePass, set_changePass] = useState(false)
    const cover = {
        position: 'relative',
        width: '100%',
        height: '200px',
        backgroundImage: `url(${coverImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
    }
    console.log('setting')
    return (
        // <h1 style={{ fontSize: '40px' }}>ADMIM</h1>
        // 
        <div style={{ margin: '80px 0' }}>
            <div className={css.container} >
                <div className={css.header} >
                    <div style={cover}>
                        <div className={css.avatar} >
                            <img className={css.avatarImg} src={avatarImage} alt="" />
                        </div>
                    </div>
                    <div className={css.Name} >
                        <h1><input style={{ border: '1px solid #333' }} type="text" /></h1>
                    </div>
                    <hr />
                    <div className={css.description} >
                        <p>ahihi</p>
                    </div>
                </div>
                <div className={css.content} >
                    <div className={css.contentItem} >
                        <div style={{ margin: '15px 0', width: '100%' }}>
                            <div className={css.changepassHeader} style={!changePass ? { cursor: 'pointer' } : {}} onClick={() => { set_changePass(true) }}>
                                <h1>Đổi mật khẩu</h1>
                                <p> Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu khác
                                    Chỉnh sửa
                                </p>
                            </div>
                            <div className={css.form} style={!changePass ? { display: 'none' } : {}} >
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
                                    <div className={`${css.inputContainer} ${Error.User ? css.inputError : ''}`}>
                                        <input type="text" placeholder="Tên tài khoản" className={css.formInput}
                                            required
                                            name='username'

                                        />
                                    </div>
                                    <div className={`${css.inputContainer} ${css.inputContainerPassword} ${Error.Pass ? css.inputError : ''}`}>
                                        <input id="ip1" type="password" placeholder="Mật khẩu mới"
                                            className={`${css.formInput} ${css.formInputPassword}`}
                                            required
                                            name='password'

                                        />

                                    </div>
                                    <div style={{ margin: '0 0 20px 0' }} className={` ${Error.Pass ? css.inputError : ''} ${css.inputContainer} ${css.inputContainerPassword}`}>
                                        <input id="ip2" type="password" placeholder="Nhập lại mật khẩu mới"
                                            className={`${css.formInput} ${css.formInputPassword}`}
                                            required
                                            name='confirmPass'
                                        />

                                    </div>
                                    <div style={{ marginLeft: 'auto' }} >
                                        <button type='button' className={`${css.formLogInBtn} ${css.cancel}`} onClick={() => { set_changePass(false) }}>huỷ</button>
                                        <button type='button' className={`${css.formLogInBtn} ${css.save}`}>Lưu</button>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
                <div className={css.content} >
                    <div className={css.contentItem} >
                        <div style={{ margin: '15px 0', width: '100%' }}>
                            <div className={css.changepassHeader}  >
                                <h1>Đường dẫn và mã QR của bạn</h1>
                                <div style={{ textAlign: 'center', margin: '15px 0' }}>
                                    <QRCode size={256} value="ahihi" />
                                    <h5 style={{ marginTop: '15px' }} onClick={(e) => { console.log(e.target.outerText) }}>
                                        http://192.168.1.160:3000/dash/setting</h5>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <button onClick={() => { getLogout() }}>logout</button>
            </div>
        </div>


    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    getLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
