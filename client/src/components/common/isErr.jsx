import React from 'react';
import pepecry from '../../assets/pepecry.png'
import './forgotStyle.css'
const IsErr = ({ errData }) => {
    console.log(errData);
    return (
        <>
            <div className='err__' >
                <div className="bg-image" style={{ backgroundImage: `url(${pepecry})` }}></div>
                <div className="err__container" >
                    <div className="err__content">
                        <div className="err__message">
                            <h1>{errData.message}!</h1>
                        </div>
                        <div className="err__code">
                            <h2>Code: {errData.code}</h2>
                        </div>
                    </div>
                    <a className='a_home_btn' href="https://itap.netlify.app/">
                        <div className="home_btn">
                            Home
                        </div>
                    </a>
                    <a className='a_home_btn' href="https://itap.netlify.app/">
                        <div className="home_btn">
                            Report
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
};

export default IsErr;
