import React, { useState } from 'react'
import QRCode from "react-qr-code";
import { useDetectOutsideClick } from '../../../middleWare/detectOutsideClick';
import css from './setting.module.css'
import coverImage from '../../../assets/bia.jpg'
import avatarImage from '../../../assets/avatar.jpg'
export const RenderSettingUi = ({
    getLogout,
    imgChange

}) => {
    const [editName, set_editName] = useState(false)
    const [editdesc, set_editdesc] = useState(false)
    const [changePass, set_changePass] = useState(false)
    const { visiable: ChangeCover, setvisiable: set_ChangeCover, ref: ref_ChangeCover } = useDetectOutsideClick(false)
    const { visiable: ChangeAvatar, setvisiable: set_ChangeAvatar, ref: ref_ChangeAvatar } = useDetectOutsideClick(false)
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
    return (
        <>
            <div style={{ margin: '80px 0' }}>
                <div className={css.container} >
                    <div className={css.header} >
                        <div style={cover}>
                            <div className={css.edit_cover}
                                onClick={() => { set_ChangeCover(!ChangeCover) }}
                            >
                                <box-icon name='camera-plus' type='solid' ></box-icon>
                                <p>chỉnh sửa</p>
                            </div>
                            <div className={`${css.img_option} ${css.option_cover}`} style={!ChangeCover ? { display: 'none' } : {}} ref={ref_ChangeCover}>
                                <ul className={css.option_content} >
                                    <li><button className={`${css.custom_btn} ${css.delete}`} >xoá</button></li>
                                    <li>
                                        <label htmlFor="coverImg" className={`${css.custom_btn} ${css.upload}`}>tải lên</label>
                                        <input style={{ display: 'none' }} id="coverImg" type="file" name="imgCover" accept="image/png, image/jpeg" onChange={e => {

                                            imgChange(e)
                                        }} />
                                    </li>
                                </ul>
                            </div>
                            <div className={css.img_option} style={!ChangeAvatar ? { display: 'none' } : {}} ref={ref_ChangeAvatar}>
                                <ul className={css.option_content}>
                                    <li><button className={`${css.custom_btn} ${css.delete}`} >xoá</button></li>
                                    <li>
                                        <label htmlFor="avatar" className={`${css.custom_btn} ${css.upload}`}>tải lên</label>
                                        <input style={{ display: 'none' }} id="avatar" type="file" name="imgAvatar" accept="image/png, image/jpeg" onChange={e => {

                                            imgChange(e)
                                        }} />

                                    </li>
                                </ul>
                            </div>



                            <div className={css.avatar} >
                                <img className={css.avatarImg} src={avatarImage} alt="" />
                                <div className={css.edit_image}
                                    onClick={() => { set_ChangeAvatar(!ChangeAvatar) }}>
                                    <box-icon name='camera-plus' type='solid' ></box-icon>
                                </div>

                            </div>

                        </div>
                        <div className={css.Name} >
                            <div className={`${css.edit_name} ${css.fade_in}`} style={editName ? { display: 'none' } : {}}>
                                <h1 >Lê Thành Đạt</h1>
                                <div className={css.icon_edit} onClick={() => { set_editName(true) }}>
                                    <box-icon name='edit'></box-icon>
                                </div>
                            </div>
                            <div className={`${css.form} ${css.fade_in}`} style={!editName ? { display: 'none' } : { margin: '0 20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
                                    <div className={`${css.inputContainer} ${Error.User ? css.inputError : ''}`}>
                                        <input type="text" placeholder="Lê Thành Đạt" className={css.formInput}
                                            required
                                            name='name'

                                        />
                                    </div>
                                    <div style={{ marginTop: '10px' }} >
                                        <button type='button' className={`${css.formLogInBtn} ${css.cancel}`} onClick={() => { set_editName(false) }}>huỷ</button>
                                        <button type='button' className={`${css.formLogInBtn} ${css.save}`}>Lưu</button>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <hr />
                        <div className={css.description} >
                            <div className={`${css.edit_name} ${css.fade_in}`} style={editdesc ? { display: 'none' } : {}}>
                                <p >Cập nhật mô tả</p>
                                <div className={css.icon_edit} onClick={() => { set_editdesc(true) }}>
                                    <box-icon name='edit'></box-icon>
                                </div>
                            </div>
                            <div className={`${css.form} ${css.fade_in}`} style={!editdesc ? { display: 'none' } : { margin: '0 20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
                                    <div className={`${css.inputContainer} ${Error.User ? css.inputError : ''}`}>
                                        <textarea type="text" placeholder="Lê Thành Đạt" className={css.formInput}
                                            name='desc'
                                            rows="4" cols="50"
                                        />
                                    </div>
                                    <div style={{ marginTop: '10px' }} >
                                        <button type='button' className={`${css.formLogInBtn} ${css.cancel}`} onClick={() => { set_editdesc(false) }}>huỷ</button>
                                        <button type='button' className={`${css.formLogInBtn} ${css.save}`}>Lưu</button>
                                    </div>
                                </div>


                            </div>
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
                                <div className={`${css.form} ${css.fade_in}`} style={!changePass ? { display: 'none' } : {}} >
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
                    <button type='button' className={`${css.formLogInBtn} ${css.logout}`} onClick={() => { getLogout() }}>Đăng Xuất</button>
                </div>
            </div>
        </>
    )
}

export default RenderSettingUi
