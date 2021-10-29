import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../../../store/actions/postsAction'

import closebtn from '../../Auth/common/images/close.png'
import css from '../../Auth/common/css/styles2.module.css'

function Addlink({ addPost, trigger, setTrigger, reff }) {
    // document.title = 'Register'
    // newpost data
    const [NewPostData, setNewPostData] = useState({
        title: '',
        url: '',
        type: 'default'
    });

    const { title, url } = NewPostData
    // 
    useEffect(() => {
        if (!trigger) {
            setNewPostData({
                title: '',
                url: '',
                type: 'default'
            })
        }
    }, [trigger])

    const onChangePostForm = (e) => {
        setNewPostData({ ...NewPostData, [e.target.name]: e.target.value })
    }
    const submit = async (e) => {
        e.preventDefault();
        const { success } = await addPost(NewPostData)
        setTrigger(false)
    }
    return (trigger) ?
        <main className={css.container} style={{ zIndex: '2' }}>
            <div className={css.formContainer}>
                <form onSubmit={submit} className={css.form} style={{ padding: '0' }} ref={reff} >
                    <div className={css.formTitle} style={{ padding: '16px 16px 0px 16px' }}>
                        <h1>Thêm liên kết</h1>

                        <div onClick={() => { setTrigger(false) }} className={css.formExit}>
                            <img src={closebtn} alt="" />
                        </div>
                    </div>

                    <div style={{ margin: '10px 0 20px 0' }} className={css.divider}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 24px 16px' }}>
                        <div className={`${css.inputContainer} ${Error.User ? css.inputError : ''}`}>
                            <input type="text" placeholder="Title" className={css.formInput}
                                required
                                name='title'
                                value={title}
                                onChange={onChangePostForm}
                            />
                        </div>
                        <div className={`${css.inputContainer} ${css.inputContainerPassword} ${Error.Pass ? css.inputError : ''}`}>
                            <input id="ip1" type="text" placeholder="Link"
                                className={`${css.formInput} ${css.formInputPassword}`}
                                required
                                name='url'
                                value={url}
                                onChange={onChangePostForm}
                            />

                        </div>
                        <p className={css.param_type} style={{ padding: '10px' }}>Loại liên kết </p>
                        <div className={css.type_radio} onChange={onChangePostForm}>
                            <input className={css.radio__input} type="radio" value="default" name="type" id="myRadio1" defaultChecked='true' />
                            <label className={css.radio__lable} htmlFor="myRadio1">Mặc định</label>
                            <input className={css.radio__input} type="radio" value="tel" name="type" id="myRadio2" />
                            <label className={css.radio__lable} htmlFor="myRadio2">Số điện thoại</label>
                            <input className={css.radio__input} type="radio" value="mail" name="type" id="myRadio3" />
                            <label className={css.radio__lable} htmlFor="myRadio3">Email</label>
                        </div>
                        <button className={`${css.formLogInBtn} ${css.reg}`}>Thêm</button>
                    </div>


                </form>
            </div >


        </main >
        : ''
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    addPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Addlink)

