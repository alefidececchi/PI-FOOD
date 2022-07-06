import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getDiets, getRecipesAll } from '../../redux/actions.js'
import style from './Home.module.css';

function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipesAll('none'))
        dispatch(getDiets())
    }, [dispatch])

    return (
        <div className={style.container__home}>
            <h1 className={style.home__h1}>Hey! let's take a look to some nice recipes!... may be to cook, why not?</h1>
            <button className={style.home__button} onClick={() => navigate('/main')} > Let's cook! </button>
        </div>
    )
}

export default Home