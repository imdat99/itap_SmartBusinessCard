import React from 'react'
import css from './index.module.css'

const Analysis = props => {
    const { data } = props
    const activateLink = data.filter(item => item.activated)
    return (
        <>
            <div className={css.component_1}>
                <div style={{
                    display: 'flex',
                    margin: '20px auto',
                    maxWidth: '608px',
                    justifyContent: 'center'
                }} >
                    <p ><strong>Tổng:</strong>&nbsp;{data.length}</p>
                    <span style={{ margin: '0 15px' }}>-</span>
                    <p><strong style={{ color: 'var(--green2)' }}>Hoạt động:</strong>&nbsp;{activateLink.length}</p>

                </div>
            </div>
        </>
    )
}


export default Analysis
