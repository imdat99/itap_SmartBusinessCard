
import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux';
import Index from '../components/admin/index';
import { useDetectOutsideClick } from '../middleWare/detectOutsideClick';
import css from './admin.module.css'
import { getPosts, updatePost } from '../store/actions/postsAction';
import Loader from '../components/common/loader';
import Addlink from '../components/admin/index/addlink';
import OnDelete from '../components/admin/index/delete';
import Editlink from '../components/admin/index/editlink';
import Cropthumb from '../components/admin/index/cropthumb';
const Admin = ({ getPosts, Posts, updatePost }) => {
    document.title = 'itap - dashboard'
    // get list links
    const [isLoading, setisLoading] = useState(true)
    useEffect(
        async () => {
            const { success } = await getPosts()
            if (success) setisLoading(false)
        }, []
    )

    // add link
    const { visiable, setvisiable, ref } = useDetectOutsideClick(false)


    // delete link
    const { visiable: deleteVisiable, setvisiable: set_deleteVisiable, ref: ref_delete } = useDetectOutsideClick(false)
    const [deletePost, set_deletePost] = useState(null)
    useEffect(() => {
        if (!deleteVisiable) set_deletePost(null)
    }, [deleteVisiable])

    // edit link
    const { visiable: edit_visiable, setvisiable: set_edit_visiable, ref: ref_edit } = useDetectOutsideClick(false)
    const [dataEdit, set_dataEdit] = useState({
        title: '',
        url: '',
        type: '',
        _id: null
    })
    useEffect(() => {
        if (!edit_visiable) set_dataEdit({
            title: '',
            url: '',
            type: '',
            _id: null
        })
    }, [edit_visiable])

    // set thumbnail
    const { visiable: thumbnail, setvisiable: set_thumbnail, ref: ref_thumbnail } = useDetectOutsideClick({
        visiable: false,
        file: null,
        _id: null
    })
    const handle_set_thumbnail = useCallback(() => {
        set_thumbnail({
            visiable: false,
            file: null,
            _id: null
        })
    }, [])

    const thumbnailChange = (e) => {
        const file = e.target.files[0];

        e.target.value = null;

        if (file) {
            const { type } = file;
            if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
            } else {
                set_thumbnail({ ...thumbnail, visiable: true, file: file })
            }
        }

    };

    const deletethumb = async (_id) => {
        const res = await updatePost({ _id, thumbnailImage: 'default' })
    }


    // set activate
    const setactive = async (_id, activated) => {
        const res = await updatePost({ _id, activated })
    }


    const QuickCss = {
        textAlign: 'center',
        margin: '0 15px'
    }

    return (
        <>
            <div className={css.gapp_body}>
                {/* <div style={QuickCss}> */}
                <button className={`${css.floating_btn}`} onClick={() => { setvisiable(!visiable) }}>+</button>
                {/* </div> */}
                <Addlink trigger={visiable} setTrigger={setvisiable} reff={ref}></Addlink>
                {isLoading ? <Loader /> : Posts.posts.length == 0 ?
                    <h1 style={QuickCss}>Tài khoản của bạn chưa có liên kết nào, vui lòng thêm liên kết bằng cách nhấn vào nút
                        &nbsp; <strong style={{ color: '#42b72a', cursor: 'pointer' }} onClick={() => { setvisiable(!visiable) }}>thêm liên kết (+) </strong> &nbsp;  ở góc dưới bên phải</h1>
                    : Posts.posts.map(index =>
                        <Index
                            key={index._id}
                            data={index}
                            // edit
                            set_dataEdit={set_dataEdit}
                            edit_visiable={edit_visiable}
                            set_edit_visiable={set_edit_visiable}

                            // delete
                            data_delete={set_deletePost}
                            set_delete={set_deleteVisiable}
                            isDelete={deleteVisiable}

                            // set thumb
                            thumbnailChange={thumbnailChange}
                            set_thumbnail={set_thumbnail}
                            thumbnail={thumbnail}
                            deletethumb={deletethumb}
                            // set activate
                            setactive={setactive}
                        ></Index>)}
            </div>
            <OnDelete
                trigger={deleteVisiable}
                message={deletePost?.title}
                setTrigger={set_deleteVisiable}
                abcd={ref_delete}
                idPost={deletePost?._id}
            ></OnDelete>
            <Editlink
                trigger={edit_visiable}
                idPost={dataEdit?._id}
                setTrigger={set_edit_visiable}
                reff={ref_edit}
                bind_titleUrl={set_dataEdit}
                titleurl={dataEdit}
            ></Editlink>
            <Cropthumb
                trigger={thumbnail.visiable}
                pickFile={thumbnail.file}
                setTrigger={handle_set_thumbnail}
                abcd={ref_thumbnail}
                idPost={thumbnail._id}
            ></Cropthumb>
        </>
    )
}
const mapStateToProps = (state) => ({
    Posts: state.posts
})

const mapDispatchToProps = {
    getPosts, updatePost
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
