import React from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";


import Options from '../Options/Options.jsx'
import Recipe from "../Recipe/Recipe.jsx";

function Main() {

    // const dispatch = useDispatch()
    // const filterType = useSelector(state => state.filterType)
    // const orderType = useSelector(state => state.orderType)
    let recipes = useSelector(state => state.recipes)
    const navigate = useNavigate()

    return (
        <div>
            <h1>Hey! i'm Main</h1>
            <button onClick={(e) => navigate('/main/create')} >CREATE</button>
            <Options></Options>
            {
                recipes.length !== 0
                    ? recipes.map((r, i) => (<Recipe key={`${r.title}-${i}`} dietTypes={r.dietTypes} i={i} image={r.image} title={r.title} />))
                    : (<h3>Ups! It seems there is not recipes with it!</h3>)
            }
        </div>
    )
}

export default Main