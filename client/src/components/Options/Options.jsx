import React from "react";

import Searchbar from '../Searchbar/Searchbar.jsx'
import SelecDiet from "../SelectDiet/SelectDiet.jsx"
import SelectOrder from "../SelectOrder/SelectOrder.jsx";
import style from './Options.module.css'

function Options() {

    return (
        <div className={style.container}>
            <SelectOrder></SelectOrder>
            <SelecDiet></SelecDiet>
            <Searchbar></Searchbar>
        </div>
    )
}

export default Options