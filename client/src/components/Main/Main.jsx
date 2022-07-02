import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { getRecipesAll } from "../../redux/actions.js";
import Navbar from "../Navbar/Navbar.jsx";
import Options from '../Options/Options.jsx'
import Pagination from "../Pagination/Pagination.jsx";
import Recipe from "../Recipe/Recipe.jsx";

function Main() {

    const currentPage = useSelector(state => state.currentPage)
    const dispatch = useDispatch()
    const filterType = useSelector(state => state.filterType)
    const recipesPerPage = useSelector(state => state.recipesPerPage)
    const [indexRecipe, setIndexRecipe] = useState({
        indexLastRecipe: (currentPage * recipesPerPage),
        indexFirstRecipe: (currentPage * recipesPerPage) - recipesPerPage,
    })
    const navigate = useNavigate()
    const recipes = useSelector(state => state.recipes)

    useEffect(() => {
        if (!recipes.length && filterType === 'none') {
            dispatch(getRecipesAll('none'))
        }
        setIndexRecipe({
            indexFirstRecipe: (currentPage * recipesPerPage) - recipesPerPage,
            indexLastRecipe: (currentPage * recipesPerPage),
        })
    }, [currentPage, dispatch, filterType, recipes, recipesPerPage])

    return (
        <div>
            <Navbar></Navbar>
            <h1>Hey! i'm Main</h1>
            <button onClick={(e) => navigate('/main/create')} >CREATE</button>
            <Options></Options>
            <Pagination></Pagination>
            {
                recipes.length !== 0
                    ? recipes
                        .slice(indexRecipe.indexFirstRecipe, indexRecipe.indexLastRecipe)
                        .map((r, i) => (<Recipe
                            dietTypes={r.dietTypes}
                            id={r.id}
                            image={r.image}
                            key={`${r.title}-${i}`}
                            title={r.title}
                        />))
                    : (<h3>Ups! It seems there is not recipes with it!</h3>)
            }
            <Pagination></Pagination>
        </div>
    )
}

export default Main