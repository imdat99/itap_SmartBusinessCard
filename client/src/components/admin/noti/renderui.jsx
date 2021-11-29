import React from 'react'
import css from '../setting/setting.module.css'
import { Link } from 'react-router-dom'
const NotiUi = props => {
    return (
        <>
            <div style={{ margin: '80px 0' }}>
                <div className={css.container} >
                    <div className={css.content} >
                        <div className={css.contentItem} >
                            <div style={{ margin: '15px 0', width: '100%' }}>
                                <div className={css.changepassHeader} >
                                    <h1>itap - thẻ cá nhân thông minh</h1>
                                    <p>Chào mừng bạn đã tới với itap, hãy chọn cho mình một chủ đề tuyệt đẹp cùng với mẫu thẻ thật là ưng ý nhé</p>
                                    <h3><i className='bx bx-right-arrow-alt' ></i> &nbsp;Đặt mua thẻ: <Link to='/dash/card'><strong> Card</strong></Link></h3>
                                    <h3><i className='bx bx-right-arrow-alt' ></i> &nbsp;Chọn chủ đề:  <Link to='/dash/theme'><strong> Theme</strong></Link> </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default NotiUi
