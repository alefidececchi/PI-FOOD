import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getRecipeDetails } from '../../redux/actions.js'


function Recipe({ id, image, dietTypes, title, }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = () => {
        dispatch(getRecipeDetails(id))
        navigate(`/main/${id}`)
    }

    return (
        <div onClick={handleClick}>
            <h3>{title}</h3>
            <img src={image} alt={title} />
            <div>
                {dietTypes.map((d, i) => <span key={`${d}-${i}`}> {d} </span>)}
            </div>
        </div>
    )
}

export default Recipe