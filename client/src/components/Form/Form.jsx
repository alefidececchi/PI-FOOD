import React, { useState, InputHTMLAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createRecipe } from '../../redux/actions.js'


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

    return (
        <div>
            <div>
                <img alt='no-name' />
            </div>
            <div className="wrapper">
                <form onSubmit={handleSubmit} >
                    <div>
                        <label> Title </label>
                        <input
                            name="title"
                            onChange={handleInputChanges}
                            onSelect={handleSelect}
                            value={input.title}
                        />
                        {errors.title && (<p>{errors.title}</p>)}
                    </div>
                    <div>
                        <label> Summary </label>
                        <textarea
                            name="summary"
                            onChange={handleInputChanges}
                            onSelect={handleSelect}
                            value={input.summary}
                        />
                        {errors.summary && (<p>{errors.summary}</p>)}
                    </div>
                    <div>
                        <label> Health score </label>
                        <input
                            max={100}
                            min={0}
                            name="healthScore"
                            onChange={handleInputChanges}
                            type={"range"}
                            value={input.healthScore}
                        />
                        <span> {input.healthScore} </span>
                    </div>
                    <div>
                        <label> Steps </label>
                        <input
                            name="steps"
                            onChange={handleInputChanges}
                            onSelect={handleSelect}
                            value={input.steps}
                        />
                        {errors.steps && (<p>{errors.steps}</p>)}
                    </div>
                    <div>
                        <label> Diet types </label>
                        <div>
                            {
                                diets.map((d, i) => {
                                    return (
                                        <div key={`${d}-${i}`}>
                                            <input
                                                className="inputDiet"
                                                name="dietTypes"
                                                onChange={handleInputChanges}
                                                onMouseOver={handleSelect}
                                                onSelect={handleSelect}
                                                type={"checkbox"}
                                                value={d}></input>
                                            <label>{d}</label>
                                        </div>
                                    )
                                })
                            }
                            {errors.dietTypes && (<p>{errors.dietTypes}</p>)}
                        </div>
                    </div>
                    <div>
                        <label> Image (link) </label>
                        <input
                            onSelect={handleSelect}
                            name="image"
                            onChange={handleInputChanges}
                            type={"text"}
                            value={input.image}
                        />
                        {errors.image && (<p>{errors.image}</p>)}
                    </div>
                    <div>
                        {
                            Object.values(errors).length !== 0
                                || Object.values(click).find(value => !value) !== undefined
                                || input.dietTypes.length === 0
                                || input.image.length === 0
                                || input.steps.length === 0
                                || input.summary.length === 0
                                || input.title.length === 0
                                ? (<p type="submit"></p>)
                                : (<button type="submit"> Create </button>)
                        }
                    </div>
                </form>
            </div>
            {
                message !== ''
                    ? (<div><p>{message}</p></div>)
                    : (<></>)
            }
        </div>
    )
}

export default Form
// {/* diets.map((d, i) => <input type={"checkbox"} key={`${d}-${i}`} name="dietTypes" value={d}>{d}</input>) */}
// {
//     arr.map((c, i) => <input type='checkbox' key={`${c}-${i}`} name="dietTypes" value={c.nombre}>{c.nombre}</input>)
// }