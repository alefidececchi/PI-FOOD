import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getDiets, getRecipesAll } from '../../redux/actions.js'

function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipesAll('none'))
        dispatch(getDiets())
    }, [dispatch])

    return (
        <div>
            <img src="https://img.freepik.com/foto-gratis/ingredientes-italianos-apetitosos-frescos-sabrosos-comida-viejo-fondo-madera-rustico-listo-cocinar-inicio-italiano-comida-saludable-concepto-cocina_1220-1740.jpg?w=2000" alt="ingredients-background" ></img>
            <button onClick={() => navigate('/main')} > Let's cook! </button>
        </div>
    )
}

export default Home