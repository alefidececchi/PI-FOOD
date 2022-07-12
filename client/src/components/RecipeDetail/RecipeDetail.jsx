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
        <div className={style.wholeThing}>
            <Navbar></Navbar>
            {
                !title ?
                    <h3>Loading ...</h3> :
                    <div className={style.container}>
                        <div className={style.container__headerRecipe}>
                            <div className={style.container__details__column}>
                                <div className={style.container__div}>
                                    <h1>{title}</h1>
                                </div>
                                {/* <div className={style.container__details__row}> */}
                                <div className={style.container__div}>
                                    <p dangerouslySetInnerHTML={{ __html: summary }} ></p>
                                </div>
                                <div className={style.container__div__hs}>
                                    <h3>health score &#10084;</h3>
                                    <h3>{healthScore}</h3>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={style.container__details__row}>
                                <div className={style.container__details__row}>
                                    <div className={style.div__img}>
                                        <img className={style.__img} src={image} alt={title}></img>
                                        <div className={style.container__div}>
                                            <h4>dish types: </h4>
                                            {
                                                !!dishTypes.length ?
                                                    dishTypes.map((dish, i) => i === dishTypes.length - 1 ?
                                                        <span key={`${dish}-${i}`}> {dish}.</span> :
                                                        <span key={`${dish}-${i}`}>{dish}, </span>) :
                                                    <span>no dish types</span>
                                            }
                                        </div>
                                        <div className={style.container__div}>
                                            <h4>diet types: </h4>
                                            {
                                                !!dietTypes.length ?
                                                    dietTypes.map((d, i) => i === dietTypes.length - 1 ?
                                                        <span key={`${d}-${i}`}> {d}.</span> :
                                                        <span key={`${d}-${i}`}>{d}, </span>) :
                                                    <span>no diet types</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={style.container__div__steps}>
                                    {
                                        typeof steps === 'string' ?
                                            <div className={style.div__steps}>
                                                <div className={style.__steps}>
                                                    <h4>1</h4>
                                                    <p>{steps}</p>
                                                </div>
                                            </div> :
                                            !!steps.length ?
                                                <div className={style.div__steps}>
                                                    {steps.map(({ number, step }, i) => {
                                                        return (
                                                            <div className={style.__steps} key={i}>
                                                                <h4>{number}</h4>
                                                                <p>{step}</p>
                                                            </div>)
                                                    })}
                                                </div> :
                                                <div className={style.div__steps}>
                                                    <div className={style.__steps}>
                                                        <p >There isn't steps for this</p>
                                                    </div>
                                                </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <footer>
                <Footer></Footer>
            </footer>
        </div >
    )
}

export default RecipeDetail