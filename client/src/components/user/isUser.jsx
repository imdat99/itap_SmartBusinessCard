import React from 'react'
import css from './style.module.css'
import PropTypes from 'prop-types'

import coverImage from '../../assets/cover.png'
import avatarImage from '../../assets/avatar.jpg'

const isUser = props => {
    const data = props.data
    document.title = data.Profile?.fullName || `@${data?.username}`
    const cover = {
        position: 'relative',
        width: '100%',
        height: '200px',
        backgroundImage: `url(${data?.Profile?.cover === 'default' ? coverImage : data?.Profile?.cover})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
    }
    return (
        <>
            <div className={css.container} >
                <div className={css.header} >
                    <div style={cover}>
                        <div className={css.avatar} >
                            <img className={css.avatarImg} src={data?.Profile?.avatar === 'default' ? avatarImage : data?.Profile?.avatar} alt="" />
                        </div>
                    </div>
                    <div className={css.Name} >
                        <h1>{data.Profile?.fullName || `@${data?.username}`}</h1>
                    </div>
                    <hr />
                    <div className={css.description} >
                        <p>{data.Profile?.decription}</p>
                    </div>
                </div>
                <div className={css.content} >
                    {data.allLinks?.length === 0 ?
                        <div className={css.noContent} >
                            <h1>No Content</h1>
                        </div> :
                        data.allLinks?.map(item =>
                            <a key={item._id} href={
                                item.type === 'mail' ? `mailto:${item.url}` :
                                    item.type === 'tel' ? `tel:${item.url}` :
                                        item.url
                            } target="blank" >
                                <div className={css.contentItem} >
                                    {item.thumbnailImage === 'default' ? '' : <img src={item.thumbnailImage} alt="" />}
                                    <h2>{item.title}</h2>
                                </div>
                            </a>

                        )
                    }
                </div>
            </div>
            <div className={css.footer} >
                <h5>© 2021 Dat.lt18</h5>
            </div>

            {props.children}</>
    )
}

isUser.propTypes = {
    data: PropTypes.object.isRequired
}
isUser.defaultProps = {
    data: {}
}

export default isUser
