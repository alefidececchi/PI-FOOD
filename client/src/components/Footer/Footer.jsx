import React from "react";

import style from './Footer.module.css';




function Footer() {
    return (
        <div>
            <div className={style.container} >
                <span>Project for Henry bootcamp</span>
                <hr />
                <span>Done with &#10084; by ale.fidececchi</span>
            </div>
        </div>
    )
}

export default Footer