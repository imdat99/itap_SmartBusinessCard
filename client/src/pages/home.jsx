import Todolist from '../components/home/todolist'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { addTodo, deleteTodo, getTodos } from '../store/actions/todosAction'
import { loadUser } from '../store/actions/authAction'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import 'boxicons';
import css from '../components/home/css/styles.module.css'


import introImg from '../components/home/img/intro.35f07489.png'
import intro2Img from '../components/home/img/two_banner_right_xx.png'
import use1Img from '../components/home/img/f_night_img_2.png'
import use2Img from '../components/home/img/f_night_img_1.png'
import use3Img from '../components/home/img/f_night_img_3.png'
import product1Img from '../components/home/img/black_fullname_back_copy_8ecfd5443ccb4c4899ed1a60c89807cd_grande.png'
import product2Img from '../components/home/img/po_black_14a4812d9bd1437bb39fe1b5abf1715f_1024x1024.png'
import product3Img from '../components/home/img/po_white_b8a9ff68c9364aa69a76319862b6781a_1024x1024.png'
import demoImg from '../components/home/img/4.857c1fba.jpg'
import demo1Img from '../components/home/img/card1.png'
import demo2Img from '../components/home/img/card2.png'
import demo3Img from '../components/home/img/card3.jpeg'
import theme from '../components/admin/theme'





export const Home = ({ auth }) => {
    document.title = 'itap - thẻ cá nhân thông minh'
    const ingArr = [demoImg, demo1Img, demo2Img, demo3Img]
    const [Demo, setDemo] = useState(demoImg);
    const [Mobile, setMobile] = useState(false);
    const [Dark, setDark] = useState(false);
    useEffect(() => {
        if (localStorage['selected_theme']) {
            const Theme = localStorage.getItem('selected_theme')
            if (Theme == 'Darkxxx') {
                setDark(true)
            } else { setDark(false) }
        }
    }, [])
    // console.log(auth)
    // console.log(Mobile)
    const [CustomCard, setCustomCard] = useState('Nhập tên bạn');
    let body
    const submit = (e) => {
        e.preventDefault()
        alert(`Cảm ơn ${CustomCard}. Bài tập lớn môn ktpm thôi, có phải hàng thật đâu mà mua =))`)
    }

    const setUpdark = () => {
        setDark(!Dark)
        localStorage.setItem('selected_theme', `${!Dark ? 'Darkxxx' : 'Light'}`)
    }
    return (
        <div style={{ height: '100%' }} className={`${css.body} ${Dark ? css.custom_dark_theme : css.custom_theme}`}>
            {/* <!--========== SCROLL TOP ==========--> */}
            <a href="#" className={css.scrolltop} id="scroll-top">
                {/* <i class='bx bx-up-arrow-alt scrolltop__icon'></i> */}
            </a>

            {/* <!--========== HEADER ==========--> */}
            <header className={`${css.l_header} ${css.scroll_header}`} id="header">
                <nav className={`${css.nav} ${css.bd_container}`}>
                    <Link to='/' className={css.nav__logo}>
                        <h3 data-text="itap">&nbsp;</h3>
                    </Link>

                    <div className={`${css.nav__menu} ${Mobile ? css.show_menu : ''}`} id="nav-menu">
                        <ul className={css.nav__list}>
                            <li className={css.nav__item}><a href="#home" className={`${css.nav__link}`} onClick={() => { setMobile(false) }} >Home</a></li>
                            <li className={css.nav__item}><a href="#share" className={css.nav__link} onClick={() => { setMobile(false) }} >Hướng dẫn</a></li>
                            <li className={css.nav__item}><a href="#accessory" className={css.nav__link} onClick={() => { setMobile(false) }}>Sản phẩm</a></li>
                            <li className={css.nav__item}><a href="#demo" className={css.nav__link} onClick={() => { setMobile(false) }}>Demo</a></li>
                            <li className={css.nav__item}><Link to='/login' href="#accessory" className={`${css.button} ${css.btn_mini}`}>Đăng nhập</Link></li>

                            <li className={css.nav__item}>
                                <input type="checkbox" className={css.checkbox} id="chk" onChange={setUpdark} />
                                <label className={css.label} htmlFor="chk" >
                                    <box-icon type='solid' name='moon' color='#f1c40f'></box-icon>
                                    <box-icon name='sun' type='solid' color='#f39c12'></box-icon>
                                    <div className={`${css.ball} ${Dark ? css.ball_checked : ''}`}></div>
                                </label>
                            </li>
                        </ul>
                    </div>

                    <div className={css.nav__toggle} id="nav-toggle">
                        <box-icon name='menu' onClick={() => { setMobile(!Mobile) }}></box-icon>
                    </div>
                </nav>
            </header >

            <main className={css.l_main}>
                {/* <!--========== HOME ==========--> */}
                <section className={css.home} id="home">
                    <div className={`${css.home__container} ${css.bd_container} ${css.bd_grid}`}>
                        <div className={css.home__img}>
                            <img src={introImg} alt="" />
                        </div>

                        <div className={css.home__data}>
                            <h1 className={css.home__title}>itap - Smart business card</h1>
                            <h2>Chia sẻ không giới hạn</h2>
                            <p className={css.home__description}>Chạm thẻ Metap vào điện thoại để chia sẻ thông tin, giảm thời gian trao
                                đổi các mạng xã hội như Facebook, Instagram, Zalo, Số điện thoại, Email và thông tin liên lạc
                            </p >
                            <a href="#" className={css.button}>Get Started</a>
                        </div >
                    </div >
                </section >

                {/* <!--========== SHARE ==========--> */}
                < section className={`${css.share} ${css.section} ${css.bd_container}`} id="share">
                    <div className={`${css.share__container} ${css.bd_grid}`}>
                        <div className={css.share__data}>
                            <h2 className={css.section_title_center}>Kết nối chuyên nghiệp hiện đại</h2>
                            <div className={css.home__description}>
                                <h3><box-icon name='check' color="#42b72a"></box-icon>&nbsp;Không thu phí hàng tháng</h3 >
                                <h3><box-icon name='check' color="#42b72a"></box-icon>&nbsp;Đổi thông tin không giới hạn</h3>
                                <h3><box-icon name='check' color="#42b72a"></box-icon>&nbsp;Không giới hạn số lần chạm thẻ</h3>
                                <h3><box-icon name='check' color="#42b72a"></box-icon>&nbsp;An toàn, không yêu cầu quyền truy cập và mật khẩu
                                </h3>

                            </div >

                            {/* <!-- <h4 className={css.share__description">Sharing these holidays is the best gift you can give, give a present
                        or share your love with the people you love the most and celebrate with great happiness.</h4> --> */}
                            {/* <!-- <a href="#" className={css.button">Send a Gift</a> --> */}
                        </div >

                        <div className={css.share__img}>
                            < img src={intro2Img} alt="" />
                        </div >
                    </div >
                </section >

                {/* <!--========== DECORATION ==========--> */}
                < section className={`${css.decoration} ${css.section} ${css.bd_container}`} id="decoration">
                    <h2 className={css.section_title}>Cách thức hoạt động?</h2>
                    <div className={`${css.decoration__container} ${css.bd_grid}`} >
                        <div className={css.decoration__data}>
                            <img src={use1Img} alt="" className={css.decoration__img} />
                            <h3 className={css.decoration__title}>B1: Đăng kí tài khoản</h3>
                            <p>đăng kí nhanh chóng, dễ dàng</p>
                            {/* <!-- <a href="#" className={css.button button-link">Go Shopping</a> --> */}
                        </div >
                        <div className={css.decoration__data}>
                            <img src={use2Img} alt="" className={css.decoration__img} />
                            <h3 className={css.decoration__title}>B1: Đăng kí tài khoản</h3>
                            <p>đăng kí nhanh chóng, dễ dàng</p>
                            {/* <!-- <a href="#" className={css.button button-link">Go Shopping</a> --> */}
                        </div >
                        <div className={css.decoration__data}>
                            <img src={use3Img} alt="" className={css.decoration__img} />
                            <h3 className={css.decoration__title}>B1: Đăng kí tài khoản</h3>
                            <p>Hoạt động ổn định trên cả Android, IOS và PC</p>
                            {/* <!-- <a href="#" className={css.button button-link">Go Shopping</a> --> */}
                        </div >
                    </div>
                </section>

                {/* <!--========== ACCESSORIES ==========--> */}
                < section className={`${css.accessory} ${css.section} ${css.bd_container}`} id="accessory">
                    <h2 className={css.section_title}>Sản phẩm <br /> Bán chạy 🔥</h2>
                    <div className={`${css.accessory__container} ${css.bd_grid}`}>
                        <div className={css.accessory__content}>
                            <img src={product1Img} alt=""
                                className={css.accessory__img} />
                            <h3 className={css.accessory__title}>Snow Globe</h3>
                            <span className={css.accessory__category}>Accessory</span>
                            <span className={css.accessory__preci}>$9.45</span>
                            < a href="#" className={`${css.button} ${css.accessory__button}`}><box-icon name='cart-download' type='solid' color='#fff'></box-icon></a>
                        </div >
                        <div className={css.accessory__content}>
                            <img src={product1Img} alt=""
                                className={css.accessory__img} />
                            <h3 className={css.accessory__title}>Snow Globe</h3>
                            <span className={css.accessory__category}>Accessory</span>
                            <span className={css.accessory__preci}>$9.45</span>
                            < a href="#" className={`${css.button} ${css.accessory__button}`}><box-icon name='cart-download' type='solid' color='#fff'></box-icon></a>
                        </div >
                        <div className={css.accessory__content}>
                            <img src={product1Img} alt=""
                                className={css.accessory__img} />
                            <h3 className={css.accessory__title}>Snow Globe</h3>
                            <span className={css.accessory__category}>Accessory</span>
                            <span className={css.accessory__preci}>$9.45</span>
                            < a href="#" className={`${css.button} ${css.accessory__button}`}><box-icon name='cart-download' type='solid' color='#fff'></box-icon></a>
                        </div >
                        <div className={css.accessory__content}>
                            <img src={product3Img} alt=""
                                className={css.accessory__img} />
                            <h3 className={css.accessory__title}>Snow Globe</h3>
                            <span className={css.accessory__category}>Accessory</span>
                            <span className={css.accessory__preci}>$9.45</span>
                            < a href="#" className={`${css.button} ${css.accessory__button}`}><box-icon name='cart-download' type='solid' color='#fff'></box-icon></a>
                        </div >
                        <div className={css.accessory__content}>
                            <img src={product2Img} alt=""
                                className={css.accessory__img} />
                            <h3 className={css.accessory__title}>Snow Globe</h3>
                            <span className={css.accessory__category}>Accessory</span>
                            <span className={css.accessory__preci}>$9.45</span>
                            < a href="#" className={`${css.button} ${css.accessory__button}`}><box-icon name='cart-download' type='solid' color='#fff'></box-icon></a>
                        </div >


                    </div >
                </section >

                {/* <!--========== SEND GIFT ==========--> */}
                < section className={`${css.send} ${css.section}`} id='demo'>
                    <div className={`${css.send__container} ${css.bd_container} ${css.bd_grid}`}>
                        <div className={css.send__img}>
                            <img src={Demo} alt="" />
                            <h1 className={css.custom_card} style={Demo == demo2Img || Demo == demo3Img ? { color: '#fff' } : { color: '#000000' }}>{CustomCard}</h1>
                        </div >
                        <div className={css.send__content}>
                            < h2 className={`${css.section_title_center} ${css.send__title}`}>Loại thẻ: Thẻ RGB đen</h2>
                            <p className={css.send__description}>Thẻ :</p>
                            <form onSubmit={submit}>
                                <div className={css.ahihi}>

                                    <img src={demoImg} alt="" name="0" className={css.icon_card} onClick={e => { setDemo(ingArr[e.target.name]) }} />
                                    <img src={demo1Img} alt="" name="1" className={css.icon_card} onClick={e => { setDemo(ingArr[e.target.name]) }} />
                                    <img src={demo2Img} alt="" name="2" className={css.icon_card} onClick={e => { setDemo(ingArr[e.target.name]) }} />
                                    <img src={demo3Img} alt="" name="3" className={css.icon_card} onClick={e => { setDemo(ingArr[e.target.name]) }} />

                                </div>

                                <div className={css.send__direction}>
                                    <input required type="text" placeholder="Tên của bạn" className={css.send__input} onChange={(e) => {
                                        setCustomCard(e.target.value)
                                    }} />
                                    <button className={`${css.button} ${css.btn}`}>Mua</button>
                                </div >
                            </form >
                        </div >


                    </div >
                </section >
            </main >

            {/* <!--========== FOOTER ==========--> */}
            < footer className={`${css.footer} ${css.section}`}>
                <div className={`${css.footer__container} ${css.bd_container} ${css.bd_grid}`} >
                    <div className={css.footer__content}>
                        <h3 className={css.footer__title}>
                            <a href="#" className={css.footer__logo}>itap</a>
                        </h3>
                        <p className={css.footer__description}>Thẻ cá nhân thông minh <br /> itap - business card</p>
                    </div >

                    <div className={css.footer__content}>
                        < h3 className={
                            css.footer__title}>Dịch vụ</h3>
                        <ul>
                            < li > <a href="#" className={css.footer__link}>Đăng kí tài khoản</a></li>
                            < li > <a href="#" className={css.footer__link}>Mua thẻ </a></li>
                            < li > <a href="#" className={css.footer__link}>Mua miếng dán</a></li>
                        </ul >
                    </div >

                    <div className={css.footer__content}>
                        < h3 className={
                            css.footer__title}>The fifth Group</h3>
                        <ul>
                            < li > <a href="#" className={css.footer__link}>Điều khoản</a></li>
                            < li > <a href="#" className={css.footer__link}>About us</a></li>
                            {/* <!-- <li><a href="#" className={css.footer__link}>Our mision</a></li> --> */}
                        </ul >
                    </div >

                    <div className={css.footer__content}>
                        < h3 className={
                            css.footer__title}>Theo dõi <strong style={{ fontSize: '25px' }}>itap</strong></h3>
                        <a href="#" className={css.footer__social}><box-icon name='facebook-circle' type='logo' ></box-icon></a>
                        <a href="#" className={css.footer__social}><box-icon name='youtube' type='logo' ></box-icon></a>
                        <a href="#" className={css.footer__social}><box-icon name='instagram-alt' type='logo' ></box-icon></a>
                    </div>
                </div >

                <p className={css.footer__copy}>&#169; 2021 itap, The fifth Group</p>
            </footer >
        </div >
    )
}



const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
