
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Index from '../components/admin';
import { useDetectOutsideClick } from '../middleWare/detectOutsideClick';
import css from './admin.module.css'
import { getPosts } from '../store/actions/postsAction';
import Loader from '../components/common/loader';
import Addlink from '../components/admin/index/addlink';
import CropImg from '../components/common/cropImg';
const Admin = ({ getPosts, Posts }) => {
    document.title = 'itap - dashboard'
    const { visiable, setvisiable, ref } = useDetectOutsideClick(false)
    useEffect(
        () => {
            getPosts()
            // console.log(Posts)
        }, []
    )

    const QuickCss = {
        justifyContent: 'center',
        width: '100%',
        display: 'flex'
    }

    return (
        // <CropImg />
        <div className={css.gapp_body}>
            {/* <div style={QuickCss}> */}
            <button className={`${css.floating_btn}`} onClick={() => { setvisiable(!visiable) }}>+</button>
            {/* </div> */}
            <Addlink trigger={visiable} setTrigger={setvisiable} reff={ref}></Addlink>
            {Posts.postsLoading ? <Loader /> : Posts.posts.length == 0 ?
                <h1 style={QuickCss}>Tài khoản của bạn chưa có liên kết nào, vui lòng thêm liên kết bằng cách nhấn vào nút
                    &nbsp; <strong style={{ color: '#42b72a', cursor: 'pointer' }} onClick={() => { setvisiable(!visiable) }}>thêm liên kết (+) </strong> &nbsp;  ở góc dưới bên phải</h1>
                : Posts.posts.map(index => <Index key={index._id} data={index}></Index>)}
        </div>

    )
}
const mapStateToProps = (state) => ({
    Posts: state.posts
})

const mapDispatchToProps = {
    getPosts
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
