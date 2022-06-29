import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRecipesAll, filterSelected } from '../../redux/actions.js'


function SelectDiet() {

    const diets = useSelector(state => state.diets)
    const dispatch = useDispatch()
    const filterType = useSelector(state => state.filterType)
    // const orderType = useSelector(state => state.orderType)
    // const recipes = useSelector(state => state.recipes)
    const selectDiet = (e) => {
        // console.log(filterType)
        // console.log(typeof e.target.value, e.target.value)
        let value = e.target.value
        dispatch(filterSelected(value))
        const filter = e.target.value.split(' ').join('_')
        e.target.value !== 'none'
            ? dispatch(getRecipesAll(filter))
            : dispatch(getRecipesAll())
    }

    // useEffect(() => {
    //     dispatch(order(orderType))
    // }, [dispatch, orderType])


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