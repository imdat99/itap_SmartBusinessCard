import React from 'react'
import { connect } from 'react-redux'

import { deletePost } from '../../../store/actions/postsAction'
import closebtn from '../../Auth/common/images/close.png'
import css from '../../Auth/common/css/styles2.module.css'

function OnDelete(props) {

    const submit = (e) => {
        e.preventDefault();
        props.deletePost(props.idPost)
        // console.log(props.idPost)
    }
    return (props.trigger) ?
        <main className={css.container} style={{ zIndex: '1000' }} ref={props.ref}>
            < div style={{ margin: 'auto' }}>
                <div className={css.formContainer} ref={props.abcd}>
                    < form className={css.form} style={{ padding: '0' }} onSubmit={submit}>
                        <div className={css.formTitle} style={{ padding: '16px 16px 16px 16px' }}>
                            <h2>Xác nhận xoá</h2>
                            <div onClick={() => { props.setTrigger(false) }} className={css.formExit}>
                                < img src={closebtn} alt="" />
                            </div >
                        </div >

                        <div style={{ margin: '0px 0 20px 0' }} className={css.divider}></div>
                        < div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 16px 16px' }} >
                            <p style={{ marginBottom: '16px', lineHeight: '22px' }}>
                                Bạn muốn xoá <strong>{props.message}</strong> vĩnh viễn?</p>

                        </div >
                        <div style={{ margin: '-10px 0 20px 0' }} className={css.divider}></div>
                        < div style={{ padding: '0 16px' }} >
                            <button type='button' onClick={() => { props.setTrigger(false) }} className={`${css.formLogInBtn} ${css.cancel}`}>Huỷ</button>
                            <button type='submit' className={`${css.formLogInBtn} ${css.delete}`}>Xoá</button>
                        </div >


                    </form >
                </div >
            </div >


        </main >
        : ''
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(OnDelete)

