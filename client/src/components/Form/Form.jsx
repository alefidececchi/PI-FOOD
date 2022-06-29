import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";



function Form() {

    const [click, setClick] = useState({
        dietTypes: false,
        image: false,
        steps: false,
        summary: false,
        title: false,
    })
    const diets = useSelector(state => state.diets)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        dietTypes: [],
        healthScore: 50,
        image: "",
        steps: "",
        summary: "",
        title: "",
    })

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
        if (name === "dietTypes") {
            let newInput = { ...input }
            if (newInput.dietTypes.indexOf(value) !== -1) {
                newInput.dietTypes = newInput.dietTypes.filter(d => d !== e.target.value)
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
        if (!input.title.length && click.title) {
            errors.title = 'must have a title'
        }
        if (input.dietTypes === [] && click.dietTypes) {
            errors.dietTypes = 'please, choose a diet'
        }
        if (input.summary === "" && click.summary) {
            errors.summary = 'must have a summary'
        }
        if (input.steps === "" && click.steps) {
            errors.steps = 'describe the recipes steps'
        }
        return errors;
    }

    const handleSelect = (e) => {
        let value = e.target.value
        let name = e.target.name
        setClick({
            ...click,
            [name]: true
        })
        setErrors(validate({
            ...input,
            [name]: value
        }))
    }

    return (
        <div>
            <div>
                <img alt='no-name' />
            </div>
            <div className="wrapper">
                <form>
                    <div>
                        <label>Title</label>
                        <input name="title" onSelect={handleSelect} onChange={handleInputChanges} value={input.title} />
                        {errors.title && (<p>{errors.title}</p>)}
                    </div>
                    <div>
                        <label>Summary</label>
                        <textarea name="summary" onSelect={handleSelect} onChange={handleInputChanges} value={input.summary} />
                        {errors.summary && (<p>{errors.summary}</p>)}
                    </div>
                    <div>
                        <label>Health score</label>
                        <input min={0} max={100} name="healthScore" onChange={handleInputChanges} value={input.healthScore} type={"range"} />
                    </div>
                    <div>
                        <label>Steps</label>
                        <input name="steps" onSelect={handleSelect} onChange={handleInputChanges} value={input.steps} />
                        {errors.steps && (<p>{errors.steps}</p>)}
                    </div>
                    <div>
                        <label>Diet types</label>
                        <div>
                            {
                                diets.map((d, i) => {
                                    return (
                                        <div key={`${d}-${i}`}>
                                            <input name="dietTypes" onSelect={handleSelect} onChange={handleInputChanges} type={"checkbox"} value={d}></input>
                                            <label>{d}</label>
                                        </div>
                                    )
                                })
                            }
                            {errors.dietTypes && (<p>{errors.dietTypes}</p>)}
                        </div>
                    </div>
                    <div>
                        <label>Image</label>
                        <input name="image" onChange={handleInputChanges} type={"text"} value={input.image} ></input>
                    </div>
                    <div>
                        <button type={"submit"} >create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form
// {/* diets.map((d, i) => <input type={"checkbox"} key={`${d}-${i}`} name="dietTypes" value={d}>{d}</input>) */}
// {
//     arr.map((c, i) => <input type='checkbox' key={`${c}-${i}`} name="dietTypes" value={c.nombre}>{c.nombre}</input>)
// }