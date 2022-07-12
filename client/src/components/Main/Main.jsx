import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDiets, getRecipesAll } from "../../redux/actions.js";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Options from '../Options/Options.jsx'
import Pagination from "../Pagination/Pagination.jsx";
import Recipe from "../Recipe/Recipe.jsx";
import style from './Main.module.css';

function Main() {

    const currentPage = useSelector(state => state.currentPage)
    const dispatch = useDispatch()
    const filterType = useSelector(state => state.filterType)
    const orderType = useSelector(state => state.orderType)
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
        dispatch(getDiets())
        setIndexRecipe({
            indexFirstRecipe: (currentPage * recipesPerPage) - recipesPerPage,
            indexLastRecipe: (currentPage * recipesPerPage),
        })
    }, [currentPage, dispatch, filterType, orderType, recipes, recipesPerPage])

    return (
        <div className={style.container}>
            <Navbar></Navbar>
            <Header></Header>
            <Options></Options>
            <Pagination></Pagination>
            <div className={style.container__recipes}>
                {
                    typeof recipes === 'string' ?
                        <h3>{recipes}</h3> :
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
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}

export default Main