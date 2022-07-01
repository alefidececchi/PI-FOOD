import React from "react";

import Searchbar from '../Searchbar/Searchbar.jsx'
import SelecDiet from "../SelectDiet/SelectDiet.jsx"
import SelectOrder from "../SelectOrder/SelectOrder.jsx";


function Options() {

    return (
        <div>
            <SelectOrder></SelectOrder>
            <SelecDiet></SelecDiet>
            <Searchbar></Searchbar>
        </div>
    )
}

export default Options