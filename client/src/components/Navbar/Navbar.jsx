import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import { getRecipesAll } from '../../redux/actions.js'

function Navbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = () => {
        dispatch(getRecipesAll('none'))
        navigate(`/main`)
    }
    return (
        <div>
            <nav>
                <ul>
                    <li onClick={handleClick} >Home</li>
                    <li onClick={() => navigate(`/main/create`)}>Create</li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar