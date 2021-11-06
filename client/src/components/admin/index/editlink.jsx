import React from 'react'
import closebtn from '../../Auth/common/images/close.png'
import css from '../../Auth/common/css/styles2.module.css'

function Editlink({ updatePost, trigger, setTrigger, reff, bind_titleUrl, titleurl }) {


    const { title, url, type } = titleurl
    const onChangePostForm = (e) => {
        bind_titleUrl({ ...titleurl, [e.target.name]: e.target.value })
    }
    const submit = async (e) => {
        e.preventDefault();
        // console.log({ ...titleurl })
        const { success } = await updatePost({ ...titleurl })
        setTrigger(false)
    }
    return (trigger) ?
        <main className={css.container} style={{ zIndex: '2' }}>
            <div className={css.formContainer}>
                <form onSubmit={submit} className={css.form} style={{ padding: '0' }} ref={reff} >
                    <div className={css.formTitle} style={{ padding: '16px 16px 0px 16px' }}>
                        <h1>Sửa liên kết</h1>

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
                            <input className={css.radio__input} type="radio" value="default" name="type" id="myRadio1" defaultChecked={type === 'default'} />
                            <label className={css.radio__lable} htmlFor="myRadio1">Mặc định</label>
                            <input className={css.radio__input} type="radio" value="tel" name="type" id="myRadio2" defaultChecked={type === 'tel'} />
                            <label className={css.radio__lable} htmlFor="myRadio2">Số điện thoại</label>
                            <input className={css.radio__input} type="radio" value="mail" name="type" id="myRadio3" defaultChecked={type === 'mail'} />
                            <label className={css.radio__lable} htmlFor="myRadio3">Email</label>
                        </div>
                        <button className={`${css.formLogInBtn} `}>Sửa</button>
                    </div>


                </form>
            </div >


        </main >
        : ''
}

export default React.memo(Editlink)

