import React, { useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import closebtn from '../../Auth/common/images/close.png'
import css from '../../Auth/common/css/styles2.module.css'
import Loader from '../../common/loader'



function CropCoveravatar(props) {
    const [onLoad, setonLoad] = useState(false);
    const [scale_value, setscale_value] = useState(1);
    const [editor, set_editor] = useState(null);
    const onScaleChange = (e) => {
        setscale_value((e.target.value / 10))
    }
    const setEditorRef = editor_ => set_editor(editor_);
    const onCrop = async () => {
        if (editor !== null) {
            setonLoad(true)
            // console.log(editor)
            const url = editor.getImageScaledToCanvas().toDataURL();
            const response = await props.updateProfile(props.isAvatar ? { avatar: url } : { cover: url })

            if (response.success) {
                setonLoad(false)
                props.setTrigger()
            }
        }
    };
    return (props.trigger) ?
        <>

            <main className={css.container} style={{ zIndex: '1000' }}>
                < div style={{ margin: 'auto' }}>
                    <div className={css.formContainer} style={{ maxWidth: 'unset' }} ref={props.abcd}>
                        < div className={css.form} style={{ padding: '0', width: 'unset' }} >
                            <div className={css.onLoad} style={!onLoad ? { display: 'none' } : {}}>
                                <Loader></Loader>
                            </div>
                            <div className={css.formTitle} style={{ padding: '16px 16px 16px 16px' }}>
                                <h3>{props.isAvatar ? 'Chọn ảnh đại diện' : 'Chọn ảnh bìa'}</h3>
                                <div onClick={() => {
                                    props.setTrigger()
                                }} className={css.formExit}>
                                    < img src={closebtn} alt="" />
                                </div >
                            </div >

                            <div style={{ margin: '0px 0 20px 0' }} className={css.divider}></div>
                            < div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0 16px 10px 16px' }} >

                                <AvatarEditor
                                    style={{ width: '100%', height: 'auto' }}
                                    image={props.pickFile}
                                    width={props.isAvatar ? 150 : 800}
                                    height={props.isAvatar ? 150 : 534}
                                    border={0}
                                    borderRadius={props.isAvatar ? 75 : 0}
                                    ref={setEditorRef}
                                    color={[255, 255, 255]} // RGBA
                                    scale={scale_value}
                                    rotate={0}
                                />

                                <input style={{ margin: '10px 0', width: '80%' }} type="range" defaultValue={scale_value * 10} name="points" min="10" max="50" onChange={e => { onScaleChange(e) }} />
                            </div >
                            <div style={{ margin: '-10px 0 20px 0' }} className={css.divider}></div>
                            < div style={{ padding: '0 16px' }} >
                                <button type='button' onClick={() => {
                                    document.removeEventListener("change", () => { })
                                    props.setTrigger()
                                }} className={`${css.formLogInBtn} ${css.cancel}`}>Huỷ</button>
                                <button type='button' className={`${css.formLogInBtn} ${css.save}`} onClick={onCrop}>Lưu</button>
                            </div >


                        </div >
                    </div >
                </div >


            </main >
        </>
        : ''
}


export default React.memo(CropCoveravatar)

