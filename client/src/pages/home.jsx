import React, { useState, useEffect } from 'react'
import { apiUrl } from '../store/constantsValue'
import axios from 'axios'
import { Link } from 'react-router-dom'
import css from '../components/home/css/styles.module.css'
import { image } from '../assets'




export const Home = (props) => {
    document.title = 'itap - thẻ cá nhân thông minh'
    const { isAuth } = props
    const {
        introImg,
        intro2Img,
        use1Img,
        use2Img,
        use3Img,
        product1Img,
        product2Img,
        product3Img,
        demoImg,
        demo1Img,
        demo2Img,
        demo3Img,
        demo4Img,
        theden1,
        theden2 } = image

    const ingArr = [demoImg, demo1Img, demo2Img, demo3Img, demo4Img]
    const [Demo, setDemo] = useState(0);
    const [Mobile, setMobile] = useState(false);
    const [Dark, setDark] = useState(false);
    useEffect(() => {
        if (localStorage['selected_theme']) {
            const Theme = localStorage.getItem('selected_theme')
            if (Theme === 'Darkxxx') {
                setDark(true)
            } else { setDark(false) }
        }
    }, [])
    const [CustomCard, setCustomCard] = useState('Nhập tên bạn');
    const submit = async (e) => {
        e.preventDefault()
        const res = await axios.post(`${apiUrl}/card`, { title: CustomCard, type: Demo })
        alert(`Bạn đã mua thẻ thành công, mã thẻ của bạn là: ${res.data.newCard._id}`)
    }

    const setUpdark = () => {
        setDark(!Dark)
        localStorage.setItem('selected_theme', `${!Dark ? 'Darkxxx' : 'Light'}`)
    }
    return (
        <div style={{ height: '100%' }} className={`${css.body} ${Dark ? css.custom_dark_theme : css.custom_theme}`}>

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
                            <li className={css.nav__item}><Link to={isAuth ? '/dash' : '/login'} className={`${css.button} ${css.btn_mini}`}>{isAuth ? 'Admin' : 'Đăng nhập'}</Link></li>

                            <li className={css.nav__item}>
                                <input type="checkbox" className={css.checkbox} id="chk" onChange={setUpdark} />
                                <label className={css.label} htmlFor="chk" >
                                    <i className='bx bxs-moon bx-md' style={{ color: '#f1c40f' }}></i>
                                    <i className='bx bxs-sun bx-md' style={{ color: '#f39c12' }}></i>
                                    <div className={`${css.ball} ${Dark ? css.ball_checked : ''}`}></div>
                                </label>
                            </li>
                        </ul>
                    </div>

                    <div className={css.nav__toggle} id="nav-toggle">
                        <i className='bx bx-menu bx-md' onClick={() => { setMobile(!Mobile) }}></i>

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
                            <Link to='/login' className={css.button}>Get Started</Link>
                        </div >
                    </div >
                </section >

                {/* <!--========== SHARE ==========--> */}
                < section className={`${css.share} ${css.section} ${css.bd_container}`} id="share">
                    <div className={`${css.share__container} ${css.bd_grid}`}>
                        <div className={css.share__data}>
                            <h2 className={css.section_title_center}>Kết nối chuyên nghiệp hiện đại</h2>
                            <div className={css.home__description}>
                                <h3> <i className='bx bx-check bx-md' style={{ color: '#42b72a' }}></i>&nbsp;Không thu phí hàng tháng</h3 >
                                <h3><i className='bx bx-check bx-md' style={{ color: '#42b72a' }}></i>&nbsp;Đổi thông tin không giới hạn</h3>
                                <h3><i className='bx bx-check bx-md' style={{ color: '#42b72a' }}></i>&nbsp;Không giới hạn số lần chạm thẻ</h3>
                                <h3><i className='bx bx-check bx-md' style={{ color: '#42b72a' }}></i>&nbsp;An toàn, không yêu cầu quyền truy cập và mật khẩu
                                </h3>

                            </div >
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
                        </div >
                        <div className={css.decoration__data}>
                            <img src={use2Img} alt="" className={css.decoration__img} />
                            <h3 className={css.decoration__title}>B2: Thiết lập tài khoản</h3>
                            <p>Thêm thẻ vật lý, thêm thông tin</p>
                        </div >
                        <div className={css.decoration__data}>
                            <img src={use3Img} alt="" className={css.decoration__img} />
                            <h3 className={css.decoration__title}>B3: Sử dụng, chia sẻ</h3>
                            <p>Hoạt động ổn định trên cả Android, IOS và PC</p>
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
                            <h3 className={css.accessory__title}>Thẻ Trắng 1</h3>
                            <span className={css.accessory__category}>Accessory</span>
                            <span className={css.accessory__preci}>$9.45</span>
                            <Link to='/login' className={`${css.button} ${css.accessory__button}`}><i className='bx bxs-cart-add bx-lg' ></i></Link>
                        </div >
                        <div className={css.accessory__content}>
                            <img src={product2Img} alt=""
                                className={css.accessory__img} />
                            <h3 className={css.accessory__title}>Thẻ Trắng 2</h3>
                            <span className={css.accessory__category}>Accessory</span>
                            <span className={css.accessory__preci}>$9.45</span>
                            < Link to='/login' className={`${css.button} ${css.accessory__button}`}><i className='bx bxs-cart-add bx-lg' ></i></Link>
                        </div >
                        <div className={css.accessory__content}>
                            <img src={theden1} alt=""
                                className={css.accessory__img} />
                            <h3 className={css.accessory__title}>Thẻ Đen 1</h3>
                            <span className={css.accessory__category}>Accessory</span>
                            <span className={css.accessory__preci}>$9.45</span>
                            < Link to='/login' className={`${css.button} ${css.accessory__button}`}><i className='bx bxs-cart-add bx-lg' ></i></Link>
                        </div >
                        <div className={css.accessory__content}>
                            <img src={theden2} alt=""
                                className={css.accessory__img} />
                            <h3 className={css.accessory__title}>Thẻ Đen 2</h3>
                            <span className={css.accessory__category}>Accessory</span>
                            <span className={css.accessory__preci}>$9.45</span>
                            < Link to='/login' className={`${css.button} ${css.accessory__button}`}><i className='bx bxs-cart-add bx-lg' ></i></Link>
                        </div >
                        <div className={css.accessory__content}>
                            <img src={product3Img} alt=""
                                className={css.accessory__img} />
                            <h3 className={css.accessory__title}>Thẻ Wibu</h3>
                            <span className={css.accessory__category}>Accessory</span>
                            <span className={css.accessory__preci}>$9.45</span>
                            < Link to='/login' className={`${css.button} ${css.accessory__button}`}><i className='bx bxs-cart-add bx-lg' ></i></Link>
                        </div >
                    </div >
                </section >

                {/* <!--========== SEND GIFT ==========--> */}
                < section className={`${css.send} ${css.section}`} id='demo'>
                    <div className={`${css.send__container} ${css.demo_container} grid`}>
                        <div className="row" style={{ padding: '10px' }}>
                            <div className="col l-6 m-12">
                                <div className={css.send__img}>
                                    <img src={ingArr[Demo]} alt="" />
                                    <h1 className={css.custom_card} style={Demo === '2' || Demo === '3' || Demo === '4' ? { color: '#fff' } : { color: '#000000' }}>{CustomCard}</h1>
                                </div >
                            </div>
                            <div className="col l-6 m-12" style={{ margin: 'auto' }}>
                                <div className={css.send__content} style={{ padding: '10px' }}>
                                    < h2 className={`${css.section_title_center} ${css.send__title}`}>Loại thẻ: {Demo === '2' || Demo === '3' ? 'Thẻ đen' : Demo === '4' ? 'Thẻ wibu' : 'Thẻ trắng'}</h2>
                                    <p className={css.send__description}>Thẻ :</p>
                                    <form onSubmit={submit}>
                                        <div className={css.ahihi}>

                                            <img src={demoImg} alt="" name="0" className={css.icon_card} onClick={e => { setDemo(e.target.name) }} />
                                            <img src={demo1Img} alt="" name="1" className={css.icon_card} onClick={e => { setDemo(e.target.name) }} />
                                            <img src={demo2Img} alt="" name="2" className={css.icon_card} onClick={e => { setDemo(e.target.name) }} />
                                            <img src={demo3Img} alt="" name="3" className={css.icon_card} onClick={e => { setDemo(e.target.name) }} />
                                            <img src={demo4Img} alt="" name="4" className={css.icon_card} onClick={e => { setDemo(e.target.name) }} />

                                        </div>

                                        <div className={css.send__direction}>
                                            <input required type="text" placeholder="Tên của bạn" className={css.send__input} onChange={(e) => {
                                                setCustomCard(e.target.value)
                                            }} />
                                            <button className={`${css.button} ${css.btn}`}>Mua</button>
                                        </div >
                                    </form >
                                </div >
                            </div>
                        </div>




                    </div >
                </section >
            </main >

            {/* <!--========== FOOTER ==========--> */}
            < footer className={`${css.footer} ${css.section}`}>
                <div className={`${css.footer__container} ${css.bd_container} ${css.bd_grid}`} >
                    <div className={css.footer__content}>
                        <h3 className={css.footer__title}>
                            <Link to='/login' className={css.footer__logo}>itap</Link>
                        </h3>
                        <p className={css.footer__description}>Thẻ cá nhân thông minh <br /> itap - business card</p>
                    </div >

                    <div className={css.footer__content}>
                        < h3 className={
                            css.footer__title}>Dịch vụ</h3>
                        <ul>
                            < li > <Link to='/login' className={css.footer__link}>Đăng kí tài khoản</Link></li>
                            < li > <Link to='/login' className={css.footer__link}>Mua thẻ </Link></li>
                            < li > <Link to='/login' className={css.footer__link}>Mua miếng dán</Link></li>
                        </ul >
                    </div >

                    <div className={css.footer__content}>
                        < h3 className={
                            css.footer__title}>The fifth Group</h3>
                        <ul>
                            < li > <Link to='/login' className={css.footer__link}>Điều khoản</Link></li>
                            < li > <Link to='/login' className={css.footer__link}>About us</Link></li>
                        </ul >
                    </div >

                    <div className={css.footer__content}>
                        < h3 className={
                            css.footer__title}>Theo dõi <strong style={{ fontSize: '25px' }}>itap</strong></h3>
                        <Link to='/' className={css.footer__social} onClick={(e) => { window.open(`https://www.facebook.com/100011475782121`, '_blank'); }}><i className='bx bxl-facebook-circle bx-lg' ></i></Link>
                        <Link to='/' className={css.footer__social} onClick={(e) => { window.open(`https://www.instagram.com/dat.ltt/`, '_blank'); }}><i className='bx bxl-instagram bx-lg'></i></Link>
                        <Link to='/' className={css.footer__social} onClick={(e) => { window.open(`https://imdat99.github.io/`, '_blank'); }}><i className='bx bxl-github bx-lg' ></i></Link>
                    </div>
                </div >

                <p className={css.footer__copy}>&#169; 2021 itap, The fifth Group</p>
            </footer >
        </div >
    )
}


export default Home
