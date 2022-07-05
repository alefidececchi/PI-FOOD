import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import { getRecipesAll } from '../../redux/actions.js'
import style from './Navbar.module.css'

function Navbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = () => {
        dispatch(getRecipesAll('none'))
        navigate(`/main`)
    }
    return (
        <div className={style.menu}>
            <nav className={style.nav}>
            <h4 className={style.nav__title}>food Recipes</h4>
                <ul className={style.nav__item}>
                    <li onClick={handleClick} >Home</li>
                    <li onClick={() => navigate(`/main/create`)}>Create</li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar