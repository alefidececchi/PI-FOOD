import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecipesAll } from "../../redux/actions.js";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Options from '../Options/Options.jsx'
import Pagination from "../Pagination/Pagination.jsx";
import Recipe from "../Recipe/Recipe.jsx";
import style from './Main.module.css';

function Main() {

    const currentPage = useSelector(state => state.currentPage)
    const dispatch = useDispatch()
    const filterType = useSelector(state => state.filterType)
    const recipesPerPage = useSelector(state => state.recipesPerPage)
    const [indexRecipe, setIndexRecipe] = useState({
        indexLastRecipe: (currentPage * recipesPerPage),
        indexFirstRecipe: (currentPage * recipesPerPage) - recipesPerPage,
    })
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
            <header>let's take a look to some niiice food... may be to cook, why not?</header>
            <Options></Options>
            <Pagination></Pagination>
            <div className={style.container__recipes}>
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
            </div>
            <Pagination></Pagination>
            <Footer></Footer>
        </div>
    )
}

export default Main