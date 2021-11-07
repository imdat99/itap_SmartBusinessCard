import React from 'react'
import css from '../../home/css/styles.module.css'
import customcss from './theme.module.css'
import { templateImg } from '../../../assets'
const RenderUi = props => {
    const { set_warn } = props
    return (
        < section className={` ${css.section} ${css.bd_container} ${customcss.custom_height}`}>
            <h2 className={css.section_title}> Kho chủ đề</h2>
            <div className={`${css.accessory__container} ${css.bd_grid}`}>
                {templateImg.map((item, index) => <div key={index} className={customcss.accessory__content}>
                    <img src={item} alt="" />
                    <div className={`${css.button} ${css.accessory__button}`} onClick={() => { set_warn(true) }}>
                        <h4 className={css.accessory__title}>Sử Dụng</h4>
                    </div>
                </div >)}

            </div >
        </section >
    )
}


export default RenderUi
