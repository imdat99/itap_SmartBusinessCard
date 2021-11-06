import React, { useState } from 'react'
import QRCode from "react-qr-code";
import { Redirect, Link } from 'react-router-dom';
import { useDetectOutsideClick } from '../../../middleWare/detectOutsideClick';
import css from './setting.module.css'
import coverImage from '../../../assets/cover.png'
import avatarImage from '../../../assets/avatar.jpg'
export const RenderSettingUi = ({
    getLogout,
    imgChange,
    data,
    passwordData,
    set_passwordData,
    handleChangePass,
    changePassStatus,
    onChangePass,
    onChangeNameDesc,
    handleChangeNameDesc,
    info,
    set_info,
    username
}) => {
    const [editName, set_editName] = useState(false)
    const [editdesc, set_editdesc] = useState(false)
    const [changePass, set_changePass] = useState(false)
    const [disableBtn, set_disableBtn] = useState(false)
    const { visiable: ChangeCover, setvisiable: set_ChangeCover, ref: ref_ChangeCover } = useDetectOutsideClick(false)
    const { visiable: ChangeAvatar, setvisiable: set_ChangeAvatar, ref: ref_ChangeAvatar } = useDetectOutsideClick(false)
    const cover = {
        position: 'relative',
        width: '100%',
        height: '200px',
        backgroundImage: `url(${data.cover === 'default' ? coverImage : data.cover})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
    }
    const { fullName, decription } = info
    const { oldpass, newpass, confirmPass } = passwordData
    return (
        <>
            <div style={{ margin: '80px 0' }}>
                <div className={css.container} >
                    <div className={css.header} >
                        <div style={cover}>
                            <div className={css.edit_cover}
                                onClick={() => { set_ChangeCover(!ChangeCover) }}
                            >
                                <i className='bx bxs-camera-plus bx-md' ></i>

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
                                <img className={css.avatarImg} src={data.avatar === 'default' ? avatarImage : data.avatar} alt="" />
                                <div className={css.edit_image}
                                    onClick={() => { set_ChangeAvatar(!ChangeAvatar) }}>
                                    <i className='bx bxs-camera-plus bx-md' ></i>
                                </div>

                            </div>

                        </div>
                        <div className={css.Name} >
                            <div className={`${css.edit_name} ${css.fade_in}`} style={editName ? { display: 'none' } : {}}>
                                <h1 >{data.fullName === '' ? 'Thêm tên của bạn' : data.fullName}</h1>
                                <div className={css.icon_edit} onClick={() => { set_editName(true) }}>
                                    <i className='bx bxs-edit bx-md' ></i>
                                </div>
                            </div>
                            <div className={`${css.form} ${css.fade_in}`} style={!editName ? { display: 'none' } : { margin: '0 20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
                                    <div className={`${css.inputContainer} ${Error.User ? css.inputError : ''}`}>
                                        <label htmlFor="changeName"></label>
                                        <input type="text" id='changeName' placeholder={data.fullName === '' ? 'Thêm tên của bạn' : data.fullName} className={css.formInput}
                                            required
                                            name='fullName'
                                            value={fullName}
                                            onChange={e => { onChangeNameDesc(e) }}
                                        />
                                    </div>
                                    <div style={{ marginTop: '10px' }} >
                                        <button type='button' className={`${css.formLogInBtn} ${css.cancel}`} onClick={() => { set_editName(false); set_info({ fullName: '', decription: '' }) }}>huỷ</button>
                                        <button type='button' className={`${css.formLogInBtn} ${css.save}`}
                                            disabled={disableBtn}
                                            onClick={async () => {
                                                set_disableBtn(true)
                                                const { success } = await handleChangeNameDesc()
                                                if (success) {
                                                    set_editName(false);
                                                    set_disableBtn(false)
                                                }

                                            }}
                                        >{!disableBtn ? 'Thay đổi' : '...'}</button>

                                    </div>
                                </div>


                            </div>
                        </div>
                        <hr />
                        <div className={css.description} >
                            <div className={`${css.edit_name} ${css.fade_in}`} style={editdesc ? { display: 'none' } : {}}>
                                <p >{data.decription === '' ? 'Cập nhật mô tả' : data.decription}</p>
                                <div className={css.icon_edit} onClick={() => { set_editdesc(true) }}>
                                    <i className='bx bxs-edit bx-md' ></i>
                                </div>
                            </div>
                            <div className={`${css.form} ${css.fade_in}`} style={!editdesc ? { display: 'none' } : { margin: '0 20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
                                    <div className={`${css.inputContainer} ${Error.User ? css.inputError : ''}`}>
                                        <textarea type="text" placeholder="Cập nhật mô tả" className={css.formInput}
                                            name='decription'
                                            rows="4" cols="60"
                                            value={decription}
                                            onChange={e => { onChangeNameDesc(e) }}


                                        />
                                    </div>
                                    <div style={{ marginTop: '10px' }} >
                                        <button type='button' className={`${css.formLogInBtn} ${css.cancel}`} onClick={() => { set_editdesc(false); set_info({ fullName: '', decription: '' }) }}>huỷ</button>
                                        <button type='button' className={`${css.formLogInBtn} ${css.save}`}
                                            disabled={disableBtn}
                                            onClick={async () => {
                                                set_disableBtn(true)
                                                const { success } = await handleChangeNameDesc()
                                                if (success) {
                                                    set_editdesc(false);
                                                    set_disableBtn(false)
                                                }

                                            }}
                                        >{!disableBtn ? 'Thay đổi' : '...'}</button>
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
                                    {!(changePassStatus === 3) ? <p> Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu khác</p> : <p style={{ color: 'var(--green1)' }}>Thay đổi thành công</p>}

                                </div>
                                <div className={`${css.form} ${css.fade_in}`} style={!changePass ? { display: 'none' } : {}} >
                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
                                        <div className={`${css.inputContainer} ${changePassStatus === 1 ? css.inputError : ''}`}>
                                            <input type="password" placeholder="Mật khẩu cũ" className={css.formInput}
                                                required
                                                value={oldpass}
                                                name='oldpass'
                                                onChange={e => onChangePass(e)}
                                            />
                                        </div>
                                        <div className={`${css.inputContainer} ${css.inputContainerPassword} ${changePassStatus === 2 ? css.inputError : ''}`}>
                                            <input id="ip1" type="password" placeholder="Mật khẩu mới"
                                                className={`${css.formInput} ${css.formInputPassword}`}
                                                required
                                                value={newpass}
                                                name='newpass'
                                                onChange={e => onChangePass(e)}
                                            />

                                        </div>
                                        <div style={{ margin: '0 0 20px 0' }} className={` ${changePassStatus === 2 ? css.inputError : ''} ${css.inputContainer} ${css.inputContainerPassword}`}>
                                            <input id="ip2" type="password" placeholder="Nhập lại mật khẩu mới"
                                                className={`${css.formInput} ${css.formInputPassword}`}
                                                required
                                                value={confirmPass}
                                                name='confirmPass'
                                                onChange={e => onChangePass(e)}
                                            />

                                        </div>
                                        <div style={{ marginLeft: 'auto' }} >
                                            <button type='button' className={`${css.formLogInBtn} ${css.cancel}`} onClick={() => {
                                                set_changePass(false)
                                                set_passwordData({
                                                    oldpass: '',
                                                    newpass: '',
                                                    confirmPass: ''
                                                })
                                            }}>huỷ</button>
                                            <button type='button' className={`${css.formLogInBtn} ${css.save}`}
                                                disabled={disableBtn}
                                                onClick={async () => {
                                                    const { success } = await handleChangePass()
                                                    if (success) {
                                                        set_disableBtn(false)
                                                    }
                                                }}
                                            >{!disableBtn ? 'Thay đổi' : '...'}</button>

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
                                        <QRCode size={256} value={`http://localhost:3000/${username}`} />
                                        <h5 style={{ marginTop: '15px' }} onClick={(e) => { window.open(`http://localhost:3000/${username}`, '_blank'); }}>
                                            {`http://localhost:3000/${username}`}</h5>
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
