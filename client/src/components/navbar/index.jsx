import React from 'react'
import 'boxicons';
import styles from './styless.module.css'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className={styles.body}>
            <header className={`${styles.header} ${styles.scroll_header}`} id="header">
                <nav className={`${styles.nav} ${styles.container}`}>
                    <a href="#" className={styles.nav__logo}>
                        <h3 data-text="itap" >&nbsp;</h3>
                    </a>

                    <div className={styles.nav__menu} id="nav-menu" >
                        <ul className={styles.nav__list}>
                            <li className={styles.nav__item}>
                                <NavLink to='/dash' exact className={`${styles.nav__link}`} activeClassName={styles.active_link}>
                                    <div className={styles.nav__icon}>

                                        <box-icon name='home' type='solid' ></box-icon>
                                    </div>
                                    <span className={styles.nav__name}>Home</span>
                                </NavLink>
                            </li>

                            <li className={styles.nav__item}>
                                <NavLink to='/dash/theme' exact className={`${styles.nav__link}`} activeClassName={styles.active_link}>

                                    <div className={styles.nav__icon}>
                                        <box-icon name='color-fill' type='solid' ></box-icon>
                                    </div>
                                    <span className={styles.nav__name}>Hiển thị</span>
                                </NavLink>
                            </li>

                            <li className={styles.nav__item}>
                                <NavLink to='/dash/setting' exact className={`${styles.nav__link}`} activeClassName={styles.active_link}>
                                    <div className={styles.nav__icon}>

                                        <box-icon name='spreadsheet' type='solid' ></box-icon>
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
