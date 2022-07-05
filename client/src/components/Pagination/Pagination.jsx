import React from "react";
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentPage } from "../../redux/actions";
import style from './Pagination.module.css';

function Pagination() {

    const currentPage = useSelector(state => state.currentPage)
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)
    const recipesPerPage = useSelector(state => state.recipesPerPage)
    const totalRecipes = recipes.length


    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i)
    }

    const handleClick = (e) => {
        const page = e.target.value
        dispatch(setCurrentPage((page)))
    }

    return (
        <div>
            {
                <h3>currentPage: {currentPage}</h3>
            }
            {
                pageNumbers.map((p, i) => <button className={style.button} key={`${p}-${i}`} onClick={handleClick} value={p}>{p}</button>)
            }
        </div>
    )

}

export default Pagination