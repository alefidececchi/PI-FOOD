import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getRecipesByName, resetRecipes, setCurrentPage } from '../../redux/actions.js'


function Searchbar() {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = (e) => {
        dispatch(resetRecipes())
        navigate(`/main?name=${input}`)
        dispatch(getRecipesByName(input))
        dispatch(setCurrentPage(1))
        setInput('')
    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <div>
            <input name="inputSearch" onChange={handleChange} type={"text"} value={input} />
            <button onClick={handleClick} > search </button>
        </div>
    )
}

export default Searchbar