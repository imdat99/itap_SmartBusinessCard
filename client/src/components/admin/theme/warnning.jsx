import React from 'react'
import closebtn from '../../Auth/common/images/close.png'
import css from '../../Auth/common/css/styles2.module.css'

const Warnning = (props) => {
    return (props.trigger) ?
        <main className={css.container} style={{ zIndex: '1000' }} >
            < div style={{ margin: 'auto' }} >
                <div className={`${css.formContainer} ${css.fade_in}`} ref={props.abcd}>
                    < form className={css.form} style={{ padding: '0' }} >
                        <div className={css.formTitle} style={{ padding: '16px 16px 16px 16px' }}>
                            <h2>Cảnh báo</h2>
                            <div onClick={() => { props.setTrigger(false) }} className={css.formExit}>
                                < img src={closebtn} alt="" />
                            </div >
                        </div >

                        <div style={{ margin: '0px 0 20px 0' }} className={css.divider}></div>
                        < div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 16px 16px' }} >
                            <p style={{ marginBottom: '16px', lineHeight: '22px' }}>
                                Bạn phải là <strong>VIP</strong> mới được sử dụng chủ đề này</p>

                        </div >
                        <div style={{ margin: '-10px 0 20px 0' }} className={css.divider}></div>
                        < div style={{ padding: '0 16px' }} >
                            <button type='button' onClick={() => { props.setTrigger(false) }} className={`${css.formLogInBtn} ${css.cancel}`}>Huỷ</button>
                            <button type='button' className={`${css.formLogInBtn} ${css.save}`}>nâng cấp</button>
                        </div >


                    </form >
                </div >
            </div >


        </main >
        : ''
}

export default Warnning
