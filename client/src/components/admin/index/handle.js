
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import RenderIndexUi from './renderUi';
import { useDetectOutsideClick } from '../../../middleWare/detectOutsideClick';
import css from './index.module.css'
import { addPost, updatePost, deletePost } from '../../../store/actions/postsAction';
import Loader from '../../common/loader';
import Addlink from './addlink';
import OnDelete from './delete';
import Editlink from './editlink';
import Cropthumb from './cropthumb';
import Analysis from './analysis';
const AdminIndex = ({ Posts, updatePost, isLoading, addPost, deletePost }) => {
    document.title = 'itap - dashboard'
    // add link
    const { visiable, setvisiable, ref } = useDetectOutsideClick(false)


    // delete link
    const { visiable: deleteVisiable, setvisiable: set_deleteVisiable, ref: ref_delete } = useDetectOutsideClick(false)
    const [DatadeletePost, set_DatadeletePost] = useState(null)
    useEffect(() => {
        if (!deleteVisiable) set_DatadeletePost(null)
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
    const handle_set_thumbnail = () => {
        set_thumbnail({
            visiable: false,
            file: null,
            _id: null
        })
    }

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
        await updatePost({ _id, thumbnailImage: 'default' })
    }


    // set activate
    const setactive = async (_id, activated) => {
        await updatePost({ _id, activated })
    }

    const QuickCss = {
        textAlign: 'center',
        margin: '0 15px'
    }
    let body
    if (Posts.posts.length === 0) {
        body = <h1 style={QuickCss}>Tài khoản của bạn chưa có liên kết nào, vui lòng thêm liên kết bằng cách nhấn vào nút
            &nbsp; <strong style={{ color: '#42b72a', cursor: 'pointer' }} onClick={() => { setvisiable(!visiable) }}>thêm liên kết (+) </strong> &nbsp;  ở góc dưới bên phải</h1>
    }
    else {
        body =
            <>
                <Analysis data={Posts.posts} />
                {Posts.posts.map(index =>
                    <RenderIndexUi
                        key={index._id}
                        data={index}
                        // edit
                        set_dataEdit={set_dataEdit}
                        edit_visiable={edit_visiable}
                        set_edit_visiable={set_edit_visiable}
                        updatePost={updatePost}

                        // delete
                        data_delete={set_DatadeletePost}
                        set_delete={set_deleteVisiable}
                        isDelete={deleteVisiable}

                        // set thumb
                        thumbnailChange={thumbnailChange}
                        set_thumbnail={set_thumbnail}
                        thumbnail={thumbnail}
                        deletethumb={deletethumb}
                        // set activate
                        setactive={setactive}
                    />)}
            </>
    }
    return (
        <>
            <div className={css.gapp_body}>
                <button className={`${css.floating_btn}`} onClick={() => { setvisiable(!visiable) }}>+</button>
                {isLoading ? <Loader /> : body}
            </div>
            <Addlink
                trigger={visiable}
                setTrigger={setvisiable}
                addPost={addPost}
                reff={ref}
            />

            <OnDelete
                trigger={deleteVisiable}
                message={DatadeletePost?.title}
                setTrigger={set_deleteVisiable}
                deletePost={deletePost}
                abcd={ref_delete}
                idPost={DatadeletePost?._id}
            />

            <Editlink
                trigger={edit_visiable}
                idPost={dataEdit?._id}
                setTrigger={set_edit_visiable}
                reff={ref_edit}
                bind_titleUrl={set_dataEdit}
                titleurl={dataEdit}
                updatePost={updatePost}
            />

            <Cropthumb
                trigger={thumbnail.visiable}
                pickFile={thumbnail.file}
                setTrigger={handle_set_thumbnail}
                abcd={ref_thumbnail}
                idPost={thumbnail._id}
                updatePost={updatePost}
            />
        </>
    )
}
const mapStateToProps = (state) => ({
    Posts: state.posts
})

const mapDispatchToProps = {
    updatePost, addPost, deletePost
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminIndex)
