import React from 'react'
import './style1.scss'

const Notfound404 = () => {
    document.title = 'Not Found!'
    return (
        <div className="pagess">
            <div id="error-page">
                <div className="content1">
                    <h2 className="header1" data-text="404">
                        404
                    </h2>
                    <h4 data-text="Opps! Page not found">
                        Opps! Page not found
                    </h4>
                    <p>
                        Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                    </p>
                    <div className="btns">
                        <a href="https://www.facebook.com/imdat99/">return home</a>
                        <a href="https://www.facebook.com/imdat99/">report problem</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notfound404
