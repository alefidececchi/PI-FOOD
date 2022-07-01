import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentPage } from "../../redux/actions";


function Pagination() {

    const currentPage = useSelector(state => state.currentPage)
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)
    const [recipesPerPage] = useState(9)
    const totalRecipes = 50
    // recipes.lengt

    let indexLastRecipe = (currentPage * recipesPerPage) // NO SE INCLUYE EL ULTIMO INDICE
    let indexFirstRecipe = indexLastRecipe - recipesPerPage;

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
                pageNumbers.map((p, i) => <button key={`${p}-${i}`} onClick={handleClick} value={p}>{p}</button>)
            }
        </div>
    )

}

export default Pagination