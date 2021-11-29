import React, { useState } from 'react'
import css2 from '../setting/setting.module.css'
import { Link } from 'react-router-dom'
import css from '../../home/css/styles.module.css'
import { image } from '../../../assets'
const CardUi = props => {
    const { set_popup, haveCard } = props
    const { demoImg, demo1Img, demo2Img, demo3Img, demo4Img } = image
    const ingArr = [demoImg, demo1Img, demo2Img, demo3Img, demo4Img]
    const type = ['Thẻ trắng 1', 'Thẻ trắng 2', 'Thẻ đen 1', 'Thẻ đen 2', ' Thẻ wibu']
    console.log(haveCard)
    return (
        <>
            <div style={{ margin: '80px 0' }} className={` ${css.custom_card_theme}`}>
                < div className={`${css.send} ${css.section}`} >
                    <div className={`${css.send__container} ${css.demo_container} grid`}>
                        <div className="row" style={{ display: haveCard.visiable ? 'none' : '' }}>
                            <div className="col l-12" style={{ textAlign: 'center', padding: '2rem', margin: 'auto' }}>
                                <h1>Bạn chưa có thẻ, mua thẻ hoặc nhập mã thẻ để tiếp tục</h1>
                                <div style={{ marginTop: '10px' }}>
                                    <Link to='/#accessory' style={{ marginRight: '1rem' }} className={` ${css.button} ${css.green}`}>Mua thẻ</Link>
                                    <div className={` ${css.button}`} onClick={() => { set_popup(true) }}>Nhập mã</div>
                                </div>
                            </div>
                        </div>


                        {/* start the */}
                        <div className="row" style={{ padding: '10px', display: haveCard.visiable ? '' : 'none' }}>
                            <div className="col l-6 m-12">
                                <div className={css.send__img}>
                                    <img src={ingArr[haveCard?.data?.findCardId?.type]} alt="" />
                                    <h1 className={css.custom_card} style={{ color: 'white' }} >{haveCard?.data?.findCardId?.title}</h1>
                                </div >
                            </div>
                            <div className="col l-6 m-12" style={{ margin: 'auto' }}>
                                <div className={css.send__content} style={{ padding: '10px' }}>
                                    < h2 className={`${css.section_title_center} ${css.send__title}`}>Loại thẻ: {type[haveCard?.data?.findCardId?.type]}</h2>
                                    <p className={css.send__description}>Ngày phát hành: {haveCard?.data?.findCardId?.createdAt.split('T')[0]}</p>
                                    <p className={css.send__description}>Mã thẻ: {haveCard?.data?.findCardId?._id}</p>
                                    <div className={` ${css.button}`} onClick={() => { set_popup(true) }}>Đổi thẻ</div>
                                </div >
                            </div>
                        </div>
                        {/* the */}
                    </div >
                </div >
            </div>
        </>
    )
}



export default CardUi
