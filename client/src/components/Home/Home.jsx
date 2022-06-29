import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getDiets, getRecipesAll } from '../../redux/actions.js'

function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipesAll())
        dispatch(getDiets())
    }, [dispatch])

    return (
        <div>
            <button onClick={() => navigate('/main')} > Let's cook! </button>
        </div>
    )
}

export default Home