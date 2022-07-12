import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createRecipe, getDiets, getRecipesAll } from '../../redux/actions.js'
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import style from './Form.module.css';



function Form() {

    const [click, setClick] = useState({
        dietTypes: false,
        image: false,
        steps: false,
        summary: false,
        title: false,
    })
    const diets = useSelector(state => state.diets)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        dietTypes: [],
        healthScore: 50,
        image: "",
        steps: "",
        summary: "",
        title: "",
    })
    const message = useSelector(state => state.message)

    const handleInputChanges = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        //SET INPUT
        name === "dietTypes"
            ? input.dietTypes.indexOf(value) === -1
                ? setInput({
                    ...input,
                    dietTypes: input.dietTypes.concat(value)
                })
                : setInput({
                    ...input,
                    dietTypes: input.dietTypes.filter(d => d !== e.target.value)
                })
            : setInput({
                ...input,
                [name]: value
            });

        //SET ERRORS
        setAllErrors(name, value)
    }

    const handleSelect = (e) => {
        let name = e.target.name
        let value = e.target.value
        setClick({
            ...click,
            [name]: true
        })
        setAllErrors(name, value)
    }

    const setAllErrors = (name, value) => {
        if (name === "dietTypes") {
            let newInput = { ...input }
            if (newInput.dietTypes.indexOf(value) !== -1) {
                newInput.dietTypes = newInput.dietTypes.filter(d => d !== value)
                setErrors(validate(newInput))
            } else {
                newInput.dietTypes = newInput.dietTypes.concat(value)
                setErrors(validate(newInput))
            }
        } else {
            setErrors(validate({
                ...input,
                [name]: value
            }))
        }
    }

    const validate = (input) => {
        let errors = {}
        if (input.dietTypes.length === 0 && click.dietTypes) {
            errors.dietTypes = 'please, choose a diet'
        }
        if (input.image === "" && click.image) {
            errors.image = 'image required'
        }
        if (input.summary.length < 20 && click.summary) {
            errors.summary = 'at least must have 20 characters'
        }
        if (input.steps.length < 40 && click.steps) {
            errors.steps = 'describe the recipes steps (at least 40 characters)'
        }
        if (input.title.length < 2 && click.title) {
            errors.title = 'the recipe must have a title'
        }
        return errors;
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createRecipe(input))
        setInput({
            dietTypes: [],
            healthScore: 50,
            image: "",
            steps: "",
            summary: "",
            title: "",
        })
        const inputs = document.querySelectorAll('.inputDiet')
        inputs.forEach(i => i.checked = false)
    }

    useEffect(() => {
        dispatch(getDiets())
        dispatch(getRecipesAll('none'))
    }, [dispatch])

    return (
        <div className={style.container}>
            <Navbar></Navbar>
            <div className={style.container__wrapper}>
                <div className={style.container__img}>
                    {/* <img className={style.__img} src="https://i1.adis.ws/i/canon/pro-inside-professional-food-photography-1_46a998f373b44dc583ee52d9448ece04?$media-collection-full-dt-jpg$" alt='no-name' /> */}
                </div>
                <div className={style.wrapper__form}>
                    <form className={style.container__form} onSubmit={handleSubmit} >
                        <div className={style.container__divForm}>
                            <label> Title: </label>
                            <input
                                name="title"
                                onChange={handleInputChanges}
                                onSelect={handleSelect}
                                value={input.title}
                            />
                            {errors.title && (<p className={style.div__error} >{errors.title}</p>)}
                        </div>
                        <div className={style.container__divForm}>
                            <label> Summary: </label>
                            <textarea
                                name="summary"
                                onChange={handleInputChanges}
                                onSelect={handleSelect}
                                value={input.summary}
                            />
                            {errors.summary && (<p className={style.div__error}>{errors.summary}</p>)}
                        </div>
                        <div className={style.container__divForm}>
                            <label> Health score: </label>
                            <input
                                max={100}
                                min={0}
                                name="healthScore"
                                onChange={handleInputChanges}
                                type={"range"}
                                value={input.healthScore}
                            />
                            <span className={style.divForm__span} > {input.healthScore} </span>
                        </div>
                        <div className={style.container__divForm}>
                            <label> Steps: </label>
                            <input
                                name="steps"
                                onChange={handleInputChanges}
                                onSelect={handleSelect}
                                value={input.steps}
                            />
                            {errors.steps && (<p className={style.div__error}>{errors.steps}</p>)}
                        </div>
                        <div className={style.container__divDietTypes}>
                            <label> Diet types: </label>
                            <div className={style.container__divTypes}>
                                {
                                    diets.map((d, i) => {
                                        return (
                                            <div className={style.divTypes} key={`${d}-${i}`}>
                                                <input
                                                    className="inputDiet"
                                                    name="dietTypes"
                                                    onChange={handleInputChanges}
                                                    onMouseOver={handleSelect}
                                                    onSelect={handleSelect}
                                                    type={"checkbox"}
                                                    value={d}></input>
                                                <label htmlFor="dietTypes" >{d}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {errors.dietTypes && (<p className={style.div__error}>{errors.dietTypes}</p>)}
                        </div>
                        <div className={style.container__divForm}>
                            <label> Image (link): </label>
                            <input
                                onSelect={handleSelect}
                                name="image"
                                onChange={handleInputChanges}
                                type={"text"}
                                value={input.image}
                            />
                            {errors.image && (<p className={style.div__error}>{errors.image}</p>)}
                        </div>
                        <div className={style.container__divForm}>
                            {
                                Object.values(errors).length !== 0
                                    || Object.values(click).find(value => !value) !== undefined
                                    || input.dietTypes.length === 0
                                    || input.image.length === 0
                                    || input.steps.length === 0
                                    || input.summary.length === 0
                                    || input.title.length === 0
                                    ? (<div className={style.container__divForm}>
                                        {
                                            message !== ''
                                                ? (<h3>{message}</h3>)
                                                : (<></>)
                                        }
                                    </div>)
                                    : (<button className={style.divForm__button} type="submit"> Create </button>)
                            }
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Form
// {/* diets.map((d, i) => <input type={"checkbox"} key={`${d}-${i}`} name="dietTypes" value={d}>{d}</input>) */}
// {
//     arr.map((c, i) => <input type='checkbox' key={`${c}-${i}`} name="dietTypes" value={c.nombre}>{c.nombre}</input>)
// }