import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getRecipeDetails, getRecipesAll, resetRecipesDetails } from '../../redux/actions.js'
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import style from './RecipeDetail.module.css';


function RecipeDetail() {

    const recipeDetails = useSelector(state => state.recipeDetails)
    const { dietTypes, dishTypes, healthScore, image, steps, summary, title } = recipeDetails
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getRecipeDetails(id))
        dispatch(getRecipesAll('none'))
        return dispatch(resetRecipesDetails())
    }, [dispatch, id])

    return (
        <div>
            <Navbar></Navbar>
            {
                !title ?
                    <h3>Loading ...</h3> :
                    <div className={style.container}>
                        <div>
                            <img src={image} alt={title}></img>
                        </div>
                        <div>
                            <div>
                                <h1>{title}</h1>
                            </div>
                            <div>
                                <p dangerouslySetInnerHTML={{__html: summary}} ></p>
                            </div>
                            <div>
                                {
                                    !!dishTypes.length ?
                                        dishTypes.map((dish, i) => <span key={`${dish}-${i}`}> {dish} </span>) :
                                        <span>no dish types</span>
                                }
                            </div>
                            <div>
                                {
                                    !!dietTypes.length ?
                                        dietTypes.map((d, i) => <span key={`${d}-${i}`}> {d} </span>) :
                                        <span>no diet types</span>
                                }
                            </div>
                            <div>
                                <h3>{healthScore}</h3>
                            </div>
                            <div>
                                {
                                    typeof steps === 'string' ?
                                        <div>
                                            <h4>1</h4>
                                            <p>{steps}</p>
                                        </div> :
                                        !!steps.length ?
                                            steps.map(({ number, step }, i) => {
                                                return (
                                                    <div key={i}>
                                                        <h4>{number}</h4>
                                                        <p>{step}</p>
                                                    </div>)
                                            }) :
                                            <p>There isn't steps for this</p>
                                }
                            </div>
                        </div>
                    </div>
            }
            <Footer></Footer>
        </div>
    )
}

export default RecipeDetail