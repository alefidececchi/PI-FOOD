import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";


import Options from '../Options/Options.jsx'
import Recipe from "../Recipe/Recipe.jsx";
import Pagination from "../Pagination/Pagination.jsx";

function Main() {

    let recipes = useSelector(state => state.recipes)
    const navigate = useNavigate()
    const indexFirstRecipe = useSelector(state => state.indexFirstRecipe)
    const indexLastRecipe = useSelector(state => state.indexLastRecipe)
    // const dispatch = useDispatch()

    useEffect(() => {

    }, [recipes])
    return (
        <div>
            <h1>Hey! i'm Main</h1>
            <button onClick={(e) => navigate('/main/create')} >CREATE</button>
            <Options></Options>
            <Pagination></Pagination>
            {
                recipes.length !== 0
                    ? recipes.slice(3).map((r, i) => (<Recipe
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