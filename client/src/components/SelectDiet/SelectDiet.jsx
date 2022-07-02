import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { filterSelected, getRecipesAll, order, setCurrentPage, setOrder } from '../../redux/actions.js'


function SelectDiet() {

    const diets = useSelector(state => state.diets)
    const dispatch = useDispatch()
    const filterType = useSelector(state => state.filterType)
    // const orderType = useSelector(state => state.orderType)
    const selectDiet = (e) => {
        let value = e.target.value
        dispatch(getRecipesAll(value))
        dispatch(filterSelected(value))
        dispatch(setOrder('default'))
        dispatch(setCurrentPage(1))
    }

    return (
        <div>
            <select onChange={selectDiet} value={filterType}>
                <option value='none'> none </option>
                {
                    diets.map((d, i) => <option key={`${d}-${i}`} value={d} > {d} </option>)
                }
            </select>
        </div>
    )
}

export default SelectDiet;