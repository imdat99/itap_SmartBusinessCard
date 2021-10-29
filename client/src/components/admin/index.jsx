import React, { useEffect, useState } from 'react'
import css from './index.module.css'
import { connect } from 'react-redux';
import OnDelete from './index/delete';
import Cropthumb from './index/cropthumb';
import 'boxicons';
import { useDetectOutsideClick } from '../../middleWare/detectOutsideClick';
import { updatePost } from '../../store/actions/postsAction';
import Editlink from './index/editlink';

function Index({ data, updatePost }) {
    const [IsActive, setIsActive] = useState(data.activated);
    const [pick_image, setpick_image] = useState(false);
    const [title_url, settitle_url] = useState({
        title: data.title,
        url: data.url,
        type: data.type
    });

    const { title, url } = title_url
    const [pickFile, set_pickFile] = useState(null);
    const { visiable: deleteVisiable, setvisiable: set_deleteVisiable, ref: ref_delete } = useDetectOutsideClick(false)
    const { visiable: edit_visiable, setvisiable: set_edit_visiable, ref: refEdit } = useDetectOutsideClick(false)
    const { visiable: thumbnail, setvisiable: set_thumbnail, ref: ref_thumbnail } = useDetectOutsideClick({
        visiable: false,
        file: null
    })
    // const { visiable, setvisiable, ref } = useDetectOutsideClick(false)
    useEffect(() => {
        settitle_url({
            ...title_url,
            title: data.title,
            url: data.url
        })
    }, [edit_visiable])
    const setactive = async () => {
        const res = await updatePost({ _id: data._id, activated: !IsActive })
        // console.log(res)
        setIsActive(!IsActive)
    }

    const thumbnailChange = (e) => {
        const file = e.target.files[0];
        const { type } = file;
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
        } else {
            set_thumbnail({ visiable: true, file: file })
        }
    };
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
                                {/* <div className={css.icon}>
                                <img src={linkImg} alt="" />
                            </div> */}
                                <div className={css.details}>
                                    <p><strong>Title:&nbsp; </strong> {title}</p>
                                    <p> <strong>{data.type == 'default' ? 'Link: ' : `${data.type}: `} &nbsp; </strong> {url}
                                    </p>
                                </div>
                            </div>
                            <div className={css.mytoggle} >
                                <label className={css.toggle} htmlFor={data.key} >
                                    <input className={css.toggle__input} name="" type="checkbox" id={data.key} defaultChecked={IsActive} onClick={setactive} />
                                    <div className={css.toggle__fill}></div>
                                </label>
                            </div>
                        </div>
                        <div className={css.flexComponet} style={{ marginTop: '10px' }}>
                            <div className={css.ContentComponet}>

                                <div className={css.icon} >
                                    <label htmlFor="pickImg"><box-icon name='image-alt' color={data.thumbnailImage == 'default' ? '#dddfe2' : '#42b72a'} ></box-icon></label>

                                    <input style={{ display: 'none' }} id="pickImg" type="file" name="profilePicBtn" accept="image/png, image/jpeg" onChange={e => { thumbnailChange(e) }} />
                                    <div className={css.tooltiptext}>Ảnh thu nhỏ</div>
                                </div>
                                <div className={css.icon}>
                                    <box-icon name='lock' type='solid' color="#ff9933"></box-icon>
                                    <div className={css.tooltiptext}>bảo vệ</div>
                                </div>
                                <div className={css.icon} onClick={() => { set_edit_visiable(!edit_visiable) }}>
                                    <box-icon name='edit-alt' type='solid' color="#dddfe2"></box-icon>
                                    <div className={css.tooltiptext}>sửa</div>

                                </div>

                                <div className={css.icon}>
                                    {/* <box-icon name='loader-circle' color="#dddfe2" animation='spin'></box-icon> */}
                                    {/* <box-icon name='check' color="#42b72a" ></box-icon> */}
                                </div>

                            </div>
                            <div className={css.mytoggle}>
                                <div className={css.icon} style={{ margin: '0' }} onClick={() => { set_deleteVisiable(!deleteVisiable) }}>
                                    <box-icon name='trash' type='solid' color="red" animation={deleteVisiable ? 'flashing' : ''}></box-icon>
                                    <div className={css.tooltiptext}>Xoá</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <OnDelete trigger={deleteVisiable} message={data.title} setTrigger={set_deleteVisiable} abcd={ref_delete} idPost={data._id}>

            </OnDelete>
            <Editlink trigger={edit_visiable} idPost={data._id} setTrigger={set_edit_visiable} reff={refEdit} bind_titleUrl={settitle_url} titleurl={title_url}>

            </Editlink>
            <Cropthumb
                trigger={thumbnail.visiable}
                message={data.title}
                pickFile={thumbnail.file}
                setTrigger={set_thumbnail}
                abcd={ref_thumbnail}
                idPost={data._id}

            ></Cropthumb>
        </>
    )
}
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    updatePost
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)