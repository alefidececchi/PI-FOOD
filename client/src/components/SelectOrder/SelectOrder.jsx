import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipesAll, order, setCurrentPage, setOrder } from "../../redux/actions.js";




function SelectOrder() {

    const dispatch = useDispatch()
    const orderType = useSelector(state => state.orderType)
    const filterType = useSelector(state => state.filterType)

    const orderFn = (e) => {
        const value = e.target.value
        if (value === "default" && filterType !== 'none') {
            dispatch(getRecipesAll(filterType))
        } else if (value === "default" && filterType === 'none') {
            dispatch(getRecipesAll('none'))
        } else {
            dispatch(order(value))
        }
        dispatch(setOrder(value))
        dispatch(setCurrentPage(1))
    }
    return (
        <div>
            <label htmlFor="selectOrder"> sort by: </label>
            <select name="selectOrder" onChange={orderFn} value={orderType} >
                <option value="default" > - Default - </option>
                <option value="AZ" > A - Z </option>
                <option value="ZA" > Z - A </option>
                <option value="+HS" > Major Healt Score </option>
                <option value="-HS" > Minor Healt Score </option>
            </select>
        </div>
    )
}


export default SelectOrder


