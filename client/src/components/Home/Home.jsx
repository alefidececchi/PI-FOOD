import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getRecipesApi } from '../../redux/actions.js'

function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getRecipesApi())
    }, [dispatch])

    return (
        <div>
            <button onClick={() => navigate('/main')} > Let's coock! </button>
        </div>
    )
}

export default Home