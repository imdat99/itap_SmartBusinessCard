import React from 'react'

import styles from './styless.module.css'
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className={styles.body}>
            <header className={`${styles.header} ${styles.scroll_header}`} id="header">
                <nav className={`${styles.nav} ${styles.container}`}>
                    <Link to='/dash' className={styles.nav__logo}>
                        <h3 data-text="itap" >&nbsp;</h3>
                    </Link>

                    <div className={styles.nav__menu} id="nav-menu" >
                        <ul className={styles.nav__list}>
                            <li className={styles.nav__item}>
                                <NavLink to='/dash' exact className={`${styles.nav__link}`} activeClassName={styles.active_link}>
                                    <div className={styles.nav__icon}>
                                        <i className='bx bxs-dashboard bx-md' ></i>
                                    </div>
                                    <span className={styles.nav__name}>Home</span>
                                </NavLink>
                            </li>

                            <li className={styles.nav__item}>
                                <NavLink to='/dash/card' exact className={`${styles.nav__link}`} activeClassName={styles.active_link}>
                                    <div className={styles.nav__icon}>
                                        <i className='bx bxs-id-card bx-md' ></i>
                                    </div>
                                    <span className={styles.nav__name}>Thẻ</span>
                                </NavLink>
                            </li>

                            <li className={styles.nav__item}>
                                <NavLink to='/dash/theme' exact className={`${styles.nav__link}`} activeClassName={styles.active_link}>

                                    <div className={styles.nav__icon}>
                                        <i className='bx bxs-palette bx-md' ></i>
                                    </div>
                                    <span className={styles.nav__name}>Hiển thị</span>
                                </NavLink>
                            </li>

                            <li className={styles.nav__item}>
                                <NavLink to='/dash/noti' exact className={`${styles.nav__link}`} activeClassName={styles.active_link}>

                                    <div className={styles.nav__icon}>
                                        <i className='bx bxs-bell bx-md' ></i>
                                    </div>
                                    <span className={styles.nav__name}>Thông báo</span>
                                </NavLink>
                            </li>

                            <li className={styles.nav__item}>
                                <NavLink to='/dash/setting' exact className={`${styles.nav__link}`} activeClassName={styles.active_link}>
                                    <div className={styles.nav__icon}>

                                        <i className='bx bxs-user bx-md' ></i>
                                    </div>
                                    <span className={styles.nav__name}>Tài khoản</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
