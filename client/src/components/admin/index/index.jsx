import React, { useEffect } from 'react'
import css from './index.module.css'
import 'boxicons';
import { useDetectOutsideClick } from '../../../middleWare/detectOutsideClick';


function Index({
    data,
    data_delete,
    set_delete,
    isDelete,
    set_dataEdit,
    edit_visiable,
    set_edit_visiable,
    thumbnailChange,
    set_thumbnail,
    thumbnail,
    deletethumb,
    setactive
}) {
    const { visiable: changeImg, setvisiable: set_changeImg, ref: ref_changeImg } = useDetectOutsideClick(false)
    useEffect(() => {
        set_dataEdit({
            title: data.title,
            url: data.url,
            type: data.type,
            _id: data._id
        })
    }, [edit_visiable])
    return (
        <>

            <div className={css.component_1}>
                <div className={css.wrapper}>
                    <div className={css.aaa} style={{ fill: '#a7ebe2' }}>
                        <svg viewBox="0 0 16 16" color="palette.blueGrey5" enableBackground="new 0 0 24 24">
                            <path
                                d="M6 2C6 0.9 6.9 0 8 0C9.1 0 10 0.9 10 2C10 3.1 9.1 4 8 4C6.9 4 6 3.1 6 2M6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8M6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16C6.9 16 6 15.1 6 14">
                            </path>
                        </svg>
                    </div>
                    <div className={css.toast}>
                        <div className={css.flexComponet}>
                            <div className={css.ContentComponet}>
                                <div className={css.details}>
                                    <p><strong>Title:&nbsp; </strong> {data.title}</p>
                                    <p> <strong>{data.type == 'default' ? 'Link: ' : `${data.type}: `} &nbsp; </strong> {data.url}
                                    </p>
                                </div>
                            </div>
                            <div className={css.mytoggle} >
                                <label className={css.toggle} htmlFor={data.key} >
                                    <input className={css.toggle__input} name="" type="checkbox" id={data.key} defaultChecked={data.activated} onClick={() => setactive(data._id, !data.activated)} />
                                    <div className={css.toggle__fill}></div>
                                </label>
                            </div>
                        </div>
                        <div className={css.flexComponet} style={{ marginTop: '10px' }}>
                            <div className={css.ContentComponet}>

                                <div className={css.icon} >
                                    <box-icon name='image-alt' color={data.thumbnailImage == 'default' ? '#dddfe2' : '#42b72a'} animation={changeImg ? 'flashing' : ''}
                                        onClick={() => { set_changeImg(!changeImg) }}
                                    ></box-icon>

                                    <div className={css.tooltiptext}>Ảnh thu nhỏ</div>

                                </div>
                                <div className={css.img_option} style={!changeImg ? { display: 'none' } : {}} ref={ref_changeImg}>
                                    <ul className={css.option_content}>
                                        <li><button className={`${css.custom_btn} ${css.delete}`} onClick={() => { deletethumb(data._id); set_changeImg(!changeImg) }}>xoá</button></li>
                                        <li>
                                            <label htmlFor={`${data._id}pickimg`} className={`${css.custom_btn} ${css.upload}`} onClick={() => {
                                                set_changeImg(!changeImg);
                                                set_thumbnail({ ...thumbnail, _id: data._id })
                                            }}>tải lên</label>
                                            <input style={{ display: 'none' }} id={`${data._id}pickimg`} type="file" name="profilePicBtn" accept="image/png, image/jpeg"
                                                onChange={e => {
                                                    thumbnailChange(e)
                                                }} />

                                        </li>
                                    </ul>
                                </div>
                                <div className={css.icon}>
                                    <box-icon name='lock' type='solid' color="#ff9933"></box-icon>
                                    <div className={css.tooltiptext}>bảo vệ</div>
                                </div>
                                <div className={css.icon} onClick={() => { set_edit_visiable(!edit_visiable) }}>
                                    <box-icon name='edit-alt' type='solid' color="#dddfe2"></box-icon>
                                    <div className={css.tooltiptext}>sửa</div>

                                </div>

                            </div>
                            <div className={css.mytoggle}>
                                <div className={css.icon} style={{ margin: '0' }} onClick={() => {
                                    set_delete(!isDelete)
                                    data_delete({ title: data.title, _id: data._id })
                                }}>
                                    <box-icon name='trash' type='solid' color="red" ></box-icon>
                                    <div className={css.tooltiptext}>Xoá</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Index